---
name: planning
description: 기획 문서를 작성할 때 사용. 기획서, 정책서, 와이어프레임(TSX), 상세 정책 마크다운을 생성. "기획 작성", "기획 만들어", "새 기능 기획", "와이어프레임 만들어" 등의 요청에 활용.
---

# 기획 문서 작성 가이드

사용자의 기획 요청을 받아 `10_제품/기획/` 하위에 문서를 생성한다.

## 폴더 구조 규칙

```
10_제품/기획/
  {모듈}/                    # plm, mes, site 등
    {번호}_{기능명}/          # 예: 04_부품관리
      기획.md                # 기능 전체 기획서
      정책.md                # 기능 전체 정책서
      screens/               # 와이어프레임 + 화면별 상세 정책
        {화면명}.tsx          # 와이어프레임 React 컴포넌트
        {화면명}-{정책명}.md  # 해당 화면의 상세 정책
```

### 번호 규칙

- 같은 모듈 내 기존 폴더의 번호를 확인하고 다음 번호를 부여
- 두 자리 숫자 + 언더스코어: `01_`, `02_`, ...

## 기획.md 작성법

기능의 전체 기획서. 아래 구조를 따른다:

```markdown
---
문서상태: 초안
문서소유자:
최종수정일: {오늘 날짜}
관련문서:
  - "[[관련문서 경로]]"
---

# {기능명} 기획

{기능 개요 1~2문장}

## 1. 문제와 목표
## 2. 사용자 스토리
## 3. 핵심 개념
## 4. 화면 구성
## 5. 비기능 요구사항
## 6. 마일스톤
```

## 정책.md 작성법

기능의 전체 정책서. 비즈니스 규칙, 유효성 검증, 상태 전이 등을 정의한다.

```markdown
---
문서상태: 초안
최종수정일: {오늘 날짜}
---

# {기능명} 정책

## 1. 데이터 모델
## 2. 상태 관리
## 3. 권한
## 4. 유효성 검증
## 5. 비즈니스 규칙
```

## 와이어프레임 (screens/*.tsx) 작성법

와이어프레임은 `.wireframe` 앱에서 렌더링되는 React 컴포넌트다.
공통 컴포넌트를 `@wire`에서 import하여 사용한다.

### 사용 가능한 공통 컴포넌트

상세 API는 [wire-components.md](wire-components.md)를 참조한다.

- `ScreenHeader` — 화면 제목 + 설명
- `WireBlock` — 보라색 제목의 섹션 블록
- `Field` — 읽기 전용 key:value 필드
- `Badge` — 상태 배지 (design/prototype/production/obsolete)
- `MockButton` — 버튼 (primary 옵션)
- `FormRow` — 폼 라벨 + 입력 행
- `MockInput` — 텍스트 입력 (locked 옵션)
- `MockSelect` — 드롭다운 (options 배열)
- `MockTextarea` — 텍스트에어리어
- `Row` — 그리드 행 (cols: 1/2/3)
- `ButtonGroup` — 버튼 그룹

### 와이어프레임 작성 예시

```tsx
import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader title="목록 화면" desc="전체 항목을 조회하는 화면" />
      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">통합 검색</Field>
          <Field label="필터">상태 · 유형</Field>
        </WireBlock>
      </Row>
      <Row>
        <WireBlock title="테이블">
          <Field><Badge status="production" /> 샘플 데이터</Field>
        </WireBlock>
      </Row>
      <ButtonGroup>
        <MockButton primary>신규 등록</MockButton>
        <MockButton>내보내기</MockButton>
      </ButtonGroup>
    </div>
  );
}
```

## 상세 정책 (screens/{화면명}-{정책명}.md) 작성법

와이어프레임의 각 화면에 대한 세부 정책을 기술한다.
파일명은 `{화면명}-{정책명}.md` 형식이다 (예: `목록-검색필터.md`, `상세-기본정보.md`).

간결하게 작성하되, 다음을 포함한다:
- 해당 영역의 동작 규칙
- 필드별 유효성 검증
- 예외 케이스
- UI 상태 변화

## 작업 순서

1. 사용자 요청을 분석하여 모듈과 기능명을 결정
2. 기존 폴더 구조를 확인하여 번호 부여
3. `기획.md` 작성
4. `정책.md` 작성
5. `screens/` 하위에 화면별 `.tsx` 와이어프레임 작성
6. 각 화면의 상세 정책 `.md` 작성
