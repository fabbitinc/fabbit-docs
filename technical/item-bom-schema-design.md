# Item / Revision / BOM 스키마 설계

## 개요

제조업 PLM 시스템의 핵심 도메인인 Item(품번), Revision(리비전), BOM(자재명세서)의 데이터베이스 스키마를 정의한다.

**설계 원칙:**
- 하이브리드 방식: 핵심 필드는 컬럼, 커스텀 필드는 JSONB
- 고객사별 유연한 메타데이터 대응 (온톨로지 서비스 지향)
- PostgreSQL JSONB + GIN 인덱스 활용

---

## 엔티티 구조

### 1. Item (품번)

품번을 가진 관리 대상 (부품, 어셈블리).

```kotlin
data class Item(
    // PK
    val id: UUID,

    // 관계
    val folderId: UUID,                  // 소속 폴더

    // 핵심 필드 (컬럼) - 거의 모든 고객사 공통
    val itemNumber: String,              // 품번 (ENG-V6-001)
    val name: String,                    // 품명 (V6 엔진 ASS'Y)
    val itemType: ItemType,              // PART, ASSEMBLY
    val status: ItemStatus,              // ACTIVE, OBSOLETE

    // 동적 속성 (JSONB) - 고객사별 커스텀
    val attributes: Map<String, Any?>,   // {"manufacturer": "MICROCHIP", "material": "SUS304"}

    // Audit
    val createdAt: Instant,
    val updatedAt: Instant
)

enum class ItemType {
    PART,       // 단품
    ASSEMBLY    // 조립품
}

enum class ItemStatus {
    ACTIVE,     // 활성
    OBSOLETE    // 폐기
}
```

**테이블 DDL:**
```sql
CREATE TABLE items (
    id                UUID PRIMARY KEY,
    organization_id   UUID NOT NULL REFERENCES organizations(id),
    folder_id         UUID NOT NULL REFERENCES folders(id),

    -- 핵심 필드
    item_number       VARCHAR(100) NOT NULL,
    name              VARCHAR(255) NOT NULL,
    item_type         VARCHAR(20) NOT NULL,
    status            VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    -- 동적 속성
    attributes        JSONB DEFAULT '{}',

    -- Audit
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 인덱스
CREATE UNIQUE INDEX uk_items_org_item_number ON items(organization_id, item_number);
CREATE INDEX idx_items_org_folder ON items(organization_id, folder_id);
CREATE INDEX idx_items_org_status ON items(organization_id, status);
CREATE INDEX idx_items_org_type ON items(organization_id, item_type);
CREATE INDEX idx_items_attributes ON items USING GIN(attributes);
```

---

### 2. Revision (리비전)

같은 Item의 버전 관리.

```kotlin
data class Revision(
    // PK
    val id: UUID,

    // 관계
    val itemId: UUID,                    // 소속 Item

    // 핵심 필드 (컬럼)
    val revisionNumber: String,          // A, B, C 또는 1.0, 1.1, 2.0
    val status: RevisionStatus,          // DRAFT, RELEASED, OBSOLETE
    val releasedAt: Instant?,            // 릴리즈 일시

    // 도면 파일
    val drawingFileId: UUID?,            // 도면 파일 (File 테이블 참조)

    // 동적 속성 (JSONB)
    val attributes: Map<String, Any?>,   // {"description": "초기 릴리즈", "change_reason": "설계 변경"}

    // Audit
    val createdAt: Instant,
    val updatedAt: Instant
)

enum class RevisionStatus {
    DRAFT,      // 작성 중
    RELEASED,   // 릴리즈됨
    OBSOLETE    // 폐기
}
```

**테이블 DDL:**
```sql
CREATE TABLE revisions (
    id                UUID PRIMARY KEY,
    organization_id   UUID NOT NULL REFERENCES organizations(id),
    item_id           UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,

    -- 핵심 필드
    revision_number   VARCHAR(20) NOT NULL,
    status            VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    released_at       TIMESTAMPTZ,

    -- 도면 파일
    drawing_file_id   UUID REFERENCES files(id),

    -- 동적 속성
    attributes        JSONB DEFAULT '{}',

    -- Audit
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 인덱스
CREATE UNIQUE INDEX uk_revisions_item_number ON revisions(item_id, revision_number);
CREATE INDEX idx_revisions_org_item ON revisions(organization_id, item_id);
CREATE INDEX idx_revisions_org_status ON revisions(organization_id, status);
CREATE INDEX idx_revisions_attributes ON revisions USING GIN(attributes);
```

---

### 3. BomEntry (BOM 구성)

Item 간 부모-자식 관계 + 수량.

```kotlin
data class BomEntry(
    // PK
    val id: UUID,

    // 부모 관계
    val parentItemId: UUID,              // 부모 Item (Where-Used 최적화용)
    val parentRevisionId: UUID,          // 부모 Revision (실제 BOM 관계)

    // 자식 관계
    val childItemId: UUID,               // 자식 Item
    val childRevisionId: UUID?,          // 자식 Revision (null=최신, 값=고정)

    // 핵심 필드 (컬럼)
    val quantity: BigDecimal,            // 수량
    val unit: String,                    // 단위 (EA, SET, KG)

    // 동적 속성 (JSONB)
    val attributes: Map<String, Any?>,   // {"designator": "U3", "footprint": "QFN-32", "note": "..."}

    // Audit
    val createdAt: Instant,
    val updatedAt: Instant
)
```

**테이블 DDL:**
```sql
CREATE TABLE bom_entries (
    id                   UUID PRIMARY KEY,
    organization_id      UUID NOT NULL REFERENCES organizations(id),

    -- 부모 관계
    parent_item_id       UUID NOT NULL REFERENCES items(id),
    parent_revision_id   UUID NOT NULL REFERENCES revisions(id) ON DELETE CASCADE,

    -- 자식 관계
    child_item_id        UUID NOT NULL REFERENCES items(id),
    child_revision_id    UUID REFERENCES revisions(id),  -- NULL = 최신 리비전 사용

    -- 핵심 필드
    quantity             DECIMAL(18,4) NOT NULL,
    unit                 VARCHAR(20) NOT NULL DEFAULT 'EA',

    -- 동적 속성
    attributes           JSONB DEFAULT '{}',

    -- Audit
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 인덱스
CREATE UNIQUE INDEX uk_bom_entries_parent_child ON bom_entries(parent_revision_id, child_item_id);
CREATE INDEX idx_bom_org_parent_revision ON bom_entries(organization_id, parent_revision_id);
CREATE INDEX idx_bom_org_parent_item ON bom_entries(organization_id, parent_item_id);
CREATE INDEX idx_bom_org_child_item ON bom_entries(organization_id, child_item_id);
CREATE INDEX idx_bom_attributes ON bom_entries USING GIN(attributes);
```

---

### 4. AttributeDefinition (메타 스키마)

동적 속성의 스키마 정의 (UI 렌더링, 유효성 검증용).

```kotlin
data class AttributeDefinition(
    // PK
    val id: UUID,

    // 조직
    val organizationId: UUID,

    // 적용 대상
    val targetType: TargetType,          // ITEM, REVISION, BOM_ENTRY

    // 속성 정의
    val name: String,                    // JSONB key (예: "manufacturer")
    val displayName: String,             // UI 표시명 (예: "제조사")
    val dataType: DataType,              // STRING, NUMBER, DATE, BOOLEAN, ENUM
    val required: Boolean,               // 필수 여부
    val sortOrder: Int,                  // UI 정렬 순서

    // 유효성 검증
    val enumValues: List<String>?,       // ENUM일 때 선택지
    val regex: String?,                  // 정규식 패턴
    val minValue: BigDecimal?,           // NUMBER 최소값
    val maxValue: BigDecimal?,           // NUMBER 최대값

    // Audit
    val createdAt: Instant,
    val updatedAt: Instant
)

enum class TargetType {
    ITEM,
    REVISION,
    BOM_ENTRY
}

enum class DataType {
    STRING,
    NUMBER,
    DATE,
    BOOLEAN,
    ENUM,
    MULTI_ENUM   // 다중 선택
}
```

**테이블 DDL:**
```sql
CREATE TABLE attribute_definitions (
    id                UUID PRIMARY KEY,
    organization_id   UUID NOT NULL REFERENCES organizations(id),

    -- 적용 대상
    target_type       VARCHAR(20) NOT NULL,

    -- 속성 정의
    name              VARCHAR(100) NOT NULL,
    display_name      VARCHAR(255) NOT NULL,
    data_type         VARCHAR(20) NOT NULL,
    required          BOOLEAN NOT NULL DEFAULT false,
    sort_order        INT NOT NULL DEFAULT 0,

    -- 유효성 검증
    enum_values       JSONB,               -- ["SUS304", "AL6061", "SS400"]
    regex             VARCHAR(500),
    min_value         DECIMAL(18,4),
    max_value         DECIMAL(18,4),

    -- Audit
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 인덱스
CREATE UNIQUE INDEX uk_attr_def_org_target_name ON attribute_definitions(organization_id, target_type, name);
CREATE INDEX idx_attr_def_org_target ON attribute_definitions(organization_id, target_type);
```

---

## 관계 다이어그램

```
Organization (1)
    │
    ├── Project (N)
    │       │
    │       └── Folder (N) ──── 트리 구조 (parent_id)
    │               │
    │               └── Item (N)
    │                       │
    │                       └── Revision (N)
    │                               │
    │                               └── BomEntry (N)
    │                                       │
    │                                       └── childItemId → Item
    │
    └── AttributeDefinition (N)
            │
            └── Item/Revision/BomEntry.attributes (JSONB)
```

---

## JSONB 사용 패턴

### 저장 형태

```json
// Item.attributes
{
  "manufacturer": "MICROCHIP",
  "material": "SUS304",
  "weight": 150.5,
  "is_rohs": true
}

// BomEntry.attributes
{
  "designator": "U3",
  "footprint": "QFN-32_5X5X05P",
  "assembly_note": "수작업 납땜 필요"
}
```

### 조회 예시

```sql
-- 제조사가 MICROCHIP인 Item 검색
SELECT * FROM items
WHERE organization_id = :orgId
  AND attributes->>'manufacturer' = 'MICROCHIP';

-- 무게가 100 이상인 Item 검색
SELECT * FROM items
WHERE organization_id = :orgId
  AND (attributes->>'weight')::numeric >= 100;

-- 특정 속성 존재 여부 확인
SELECT * FROM items
WHERE organization_id = :orgId
  AND attributes ? 'material';
```

---

## BOM 조회 패턴

### 1. BOM 전개 (Top-Down)

> "이 어셈블리를 만들려면 뭐가 필요해?"

```sql
-- 1 depth만
SELECT
    be.*,
    ci.item_number as child_item_number,
    ci.name as child_name,
    ci.item_type as child_type
FROM bom_entries be
JOIN items ci ON be.child_item_id = ci.id
WHERE be.parent_revision_id = :revisionId;

-- 전체 depth (재귀 CTE)
WITH RECURSIVE bom_tree AS (
    -- Base: 최상위 어셈블리의 직속 하위
    SELECT
        be.id, be.parent_revision_id, be.child_item_id,
        be.quantity, be.unit, be.attributes,
        1 as level
    FROM bom_entries be
    WHERE be.parent_revision_id = :revisionId

    UNION ALL

    -- Recursive: 하위의 하위
    SELECT
        be.id, be.parent_revision_id, be.child_item_id,
        be.quantity, be.unit, be.attributes,
        bt.level + 1
    FROM bom_entries be
    JOIN bom_tree bt ON be.parent_item_id = bt.child_item_id
    JOIN revisions r ON be.parent_revision_id = r.id
    WHERE r.status = 'RELEASED'  -- 릴리즈된 리비전만
)
SELECT * FROM bom_tree;
```

### 2. BOM 역전개 (Bottom-Up, Where-Used)

> "이 부품이 어디에 쓰여?"

```sql
-- 1 depth만
SELECT
    be.*,
    pi.item_number as parent_item_number,
    pi.name as parent_name,
    pr.revision_number
FROM bom_entries be
JOIN items pi ON be.parent_item_id = pi.id
JOIN revisions pr ON be.parent_revision_id = pr.id
WHERE be.child_item_id = :itemId;

-- 전체 depth (재귀 CTE)
WITH RECURSIVE where_used AS (
    -- Base: 이 Item을 직접 사용하는 곳
    SELECT
        be.parent_item_id,
        be.parent_revision_id,
        be.quantity,
        1 as level
    FROM bom_entries be
    WHERE be.child_item_id = :itemId

    UNION ALL

    -- Recursive: 그 부모를 사용하는 곳
    SELECT
        be.parent_item_id,
        be.parent_revision_id,
        be.quantity,
        wu.level + 1
    FROM bom_entries be
    JOIN where_used wu ON be.child_item_id = wu.parent_item_id
)
SELECT * FROM where_used;
```

---

## DTO 구조

### ItemListDto (목록 조회)

```kotlin
data class ItemListDto(
    val id: UUID,
    val itemNumber: String,
    val name: String,
    val itemType: ItemType,
    val status: ItemStatus,

    // 최신 리비전 정보
    val latestRevisionNumber: String?,
    val latestRevisionStatus: RevisionStatus?,

    // 집계 정보
    val bomChildCount: Int?,             // 하위 부품 수 (Assembly)
    val whereUsedCount: Int?,            // 사용처 수

    val updatedAt: Instant
)
```

### BomTreeNodeDto (BOM 전개)

```kotlin
data class BomTreeNodeDto(
    val itemId: UUID,
    val itemNumber: String,
    val itemName: String,
    val itemType: ItemType,

    val revisionId: UUID?,
    val revisionNumber: String?,         // Pinned면 특정 값, Latest면 null

    val quantity: BigDecimal,
    val unit: String,
    val level: Int,

    // 동적 속성
    val attributes: Map<String, Any?>,   // designator, footprint 등

    val children: List<BomTreeNodeDto>?
)
```

### WhereUsedNodeDto (역전개)

```kotlin
data class WhereUsedNodeDto(
    val itemId: UUID,
    val itemNumber: String,
    val itemName: String,

    val revisionId: UUID,
    val revisionNumber: String,
    val revisionStatus: RevisionStatus,

    val quantity: BigDecimal,
    val unit: String,
    val level: Int,

    val parents: List<WhereUsedNodeDto>?
)
```

---

## 채번 규칙 (NumberingRule)

고객사별 품번/리비전 자동 생성 규칙.

```kotlin
data class NumberingRule(
    val id: UUID,
    val organizationId: UUID,

    val name: String,                    // "기본 채번"
    val targetType: TargetType,          // ITEM, REVISION
    val type: NumberingType,             // MANUAL, PREFIX_SEQ, PROJECT_SEQ, ...

    // 패턴 설정
    val prefix: String?,
    val useProjectCode: Boolean,
    val useFolderCode: Boolean,
    val separator: String,
    val digitLength: Int,

    // 순번 범위
    val scope: NumberingScope,           // ORGANIZATION, PROJECT, FOLDER

    val createdAt: Instant,
    val updatedAt: Instant
)

enum class NumberingType {
    MANUAL,              // 수동 입력
    PREFIX_SEQ,          // [접두어]-[순번]
    PROJECT_SEQ,         // [프로젝트코드]-[순번]
    PROJECT_FOLDER_SEQ,  // [프로젝트]-[폴더]-[순번]
    YEAR_SEQ             // [년도]-[순번]
}

enum class NumberingScope {
    ORGANIZATION,        // 조직 전체 유일
    PROJECT,             // 프로젝트 내 유일
    FOLDER               // 폴더 내 유일
}
```

---

## Arduino Uno Rev3 예시 매핑

### Item

| itemNumber | name | itemType | attributes |
|------------|------|----------|------------|
| ARDUINO-UNO-R3 | Arduino Uno Rev3 | ASSEMBLY | {} |
| ATMEGA16U2-MU | ATMEGA16U2-MU | PART | {"manufacturer": "MICROCHIP", "supplier_part": "C17317"} |
| CAP-100NF-0603 | 100nF Capacitor | PART | {"manufacturer": "FH", "footprint": "0603"} |

### Revision

| item | revisionNumber | status | drawingFileId |
|------|----------------|--------|---------------|
| ARDUINO-UNO-R3 | 1.0 | RELEASED | (Schematic PDF) |

### BomEntry

| parent (Rev) | child (Item) | quantity | unit | attributes |
|--------------|--------------|----------|------|------------|
| ARDUINO-UNO-R3 Rev 1.0 | ATMEGA16U2-MU | 1 | EA | {"designator": "U3"} |
| ARDUINO-UNO-R3 Rev 1.0 | CAP-100NF-0603 | 7 | EA | {"designator": "C1,C2,C4,C5,C6,C7,C10"} |

---

## 변경 이력

| 날짜 | 작성자 | 내용 |
|------|--------|------|
| 2024-01-30 | Claude | 초안 작성 |
