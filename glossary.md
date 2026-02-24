# 용어집 (Glossary)

Fabbit 프로젝트에서 사용하는 도메인 용어를 정리합니다.
**API 용어**(백엔드 식별자)와 **UI 표시**(사용자에게 보이는 텍스트)를 구분합니다.

---

## 핵심 엔티티

| API 용어 | UI 표시 | 설명 |
|----------|---------|------|
| Part | 부품 | 제품을 구성하는 개별 부품. "품목"과 혼용하지 않음 |
| Drawing | 도면 | 부품 정보의 원본 출처인 설계 도면 |
| Supplier | 공급사 | 부품을 공급하는 외부 업체 |
| BOM (Bill of Materials) | BOM | 부품 간 구성 관계 (부모-자식). 풀어쓸 때는 "부품 구성" |
| Project | 프로젝트 | 부품을 묶어 관리하는 단위 |

## 관계 유형

| API 용어 | UI 표시 | 설명 |
|----------|---------|------|
| CONSISTS_OF | 구성 | 부품이 다른 부품으로 구성됨 (BOM 관계) |
| SUPPLIED_BY | 공급 | 공급사가 부품을 공급 |
| DEFINED_BY | 정의 | 도면이 부품을 정의 |
| HAS_ITEM | 포함 | 프로젝트가 부품을 포함 |

## 프로세스 / 액션

| API 용어 | UI 표시 | 설명 |
|----------|---------|------|
| Synthesis | 부품 업로드 | 업로드된 엑셀 파일을 파싱하여 Part/BOM/Supplier 등을 시스템에 적재하는 백그라운드 작업 |
| Mapping | 매핑 | 원본 데이터 컬럼을 표준 온톨로지 속성에 매핑하는 과정 |
| Onboarding | 온보딩 | 신규 사용자의 초기 설정 플로우 (워크스페이스 → 업로드 → 매핑 → 탐색) |
| Drawing Analysis | 도면 분석 | AI가 도면에서 표제란/부품표를 인식하는 과정 |
| Drawing Conversion | 도면 변환 | DWG 등 원본 파일을 PDF/썸네일로 변환하는 과정 |

## 상태값

| API 용어 | UI 표시 | 사용 맥락 |
|----------|---------|-----------|
| PENDING | 대기 | Synthesis, Drawing Conversion 등 |
| PROCESSING | 처리 중 | Synthesis batch |
| COMPLETED | 완료 | 정상 완료 |
| COMPLETED_WITH_ERRORS | 부분 완료 | 일부 오류 포함 완료 |
| FAILED | 실패 | 작업 실패 |

## 속성 (Part 기준)

| API 필드 | UI 표시 |
|----------|---------|
| part_number | 품번 |
| name | 부품명 |
| revision | 리비전 |
| material | 재질 |
| unit | 단위 |
| category | 분류 |
| lifecycle_state | 수명주기 |
| lead_time_days | 리드타임 |
| is_phantom | 팬텀 여부 |
| description | 설명 |

## Synthesis 결과 지표

| API 필드 | UI 표시 | 설명 |
|----------|---------|------|
| nodes_created | 등록 항목 | 생성된 노드 수 (Part, Drawing, Supplier 등 포함) |
| relationships_created | 등록 관계 | 생성된 관계 수 (BOM 연결, 공급 관계 등 포함) |
| completed_at | 완료 시각 | 작업 완료 시점 |

---

## 혼용 금지

| 잘못된 사용 | 올바른 사용 | 이유 |
|------------|------------|------|
| 품목 (Part 의미로) | 부품 | "품목"은 Item 도메인에서 사용. Part는 "부품"으로 통일 |
| 합성 | 부품 업로드 | 사용자에게 "합성"은 의미 불명확. "부품 업로드"가 동작을 설명 |
| BOM 링크 | BOM 연결 | "링크"보다 "연결"이 한국어로 자연스러움 |
