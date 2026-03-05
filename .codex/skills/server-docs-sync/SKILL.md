---
name: server-docs-sync
description: >
  ../server와 ../web/apps/web 코드베이스를 분석하고 현재 docs 저장소의
  주요 문서를 최신 구현 상태로 동기화할 때 사용한다. 사용자가 "서버/웹 기준으로
  문서 업데이트", "코드베이스 전수 분석 후 docs 반영", "openapi/프론트 라우트
  기준 문서 갱신"을 요청하면 이 스킬을 사용한다.
---

# server-docs-sync

`../server` + `../web/apps/web` 구현 상태를 기준으로 `docs` 문서를
최신화하는 스킬.

## 적용 범위

- `../server`의 API/도메인/최근 변경사항을 전수 분석한다.
- `../web/apps/web`의 라우트/API 클라이언트/UI 노출 기능을 분석한다.
- `docs` 내 문서 구조와 주요 기준 문서를 전수 점검한다.
- 누락/불일치 내용을 문서에 반영한다.
- 반영 후 검증(정합성/링크/변경 요약)까지 수행한다.

## 기본 원칙

- 문서 편집 작업이므로 `docs-writer` 스킬 규칙을 함께 따른다.
- 추측으로 작성하지 않고 `openapi.json`, 라우터, 스키마, 프론트 라우트,
  API 타입, 최근 커밋을 근거로 반영한다.
- 변경은 최소 파일이 아니라 영향 문서 전체를 기준으로 동기화한다.

## 실행 절차

### 1) 서버 코드베이스 전수 분석 (`../server`)

다음 항목을 모두 수집한다.

1. 라우터 등록 현황: `../server/app/main.py`
2. API 엔드포인트: `../server/app/api/v1/**`
3. 도메인 모델/스키마: `../server/app/modules/**`
4. 조회/명령 계층: `../server/app/queries/**`, `../server/app/use_cases/**`
5. OpenAPI 스펙: `../server/openapi.json`
6. 최근 변경 흐름: `git -C ../server log --oneline -n 20`

필수 집계:

- Path 수
- Operation 수
- Schema 수
- Tag별 operation 개수

권장 명령:

```bash
jq -r '.paths | keys | length' ../server/openapi.json
jq -r '[.paths[] | keys[]] | length' ../server/openapi.json
jq -r '.components.schemas | keys | length' ../server/openapi.json
jq -r '.paths | to_entries[] | .value | to_entries[] | .value.tags[]?' ../server/openapi.json | sort | uniq -c | sort -nr
```

### 2) docs 전수 점검

다음 항목을 확인한다.

1. 문서 트리/실제 파일 존재 여부
2. 루트 진입 문서(`README.md`)와 실제 구조 정합성
3. 제품/개발/표현 규칙 문서의 최신성
4. 누락된 기준 문서 존재 여부

권장 명령:

```bash
find . -type f -name '*.md' | sort
find . -maxdepth 3 -type d | sort
```

### 3) 웹 코드베이스 전수 분석 (`../web/apps/web`)

`server` 로직이 중심이어도, 문서 관점에서는 웹 노출 기능/용어를 반드시 확인한다.
특히 아래는 서버 분석만으로 파악되지 않는다.

- 실제 사용자 노출 라우트 (`src/App.tsx`)
- 프론트 API 클라이언트 범위 (`src/api/**`)
- UI 전용/선행 기능(WIP, mock, legacy route)
- 서버 대비 명칭 차이(`item` vs `part`, `changes/issues/*` 라우트 등)

권장 명령:

```bash
sed -n '1,260p' ../web/apps/web/src/App.tsx
find ../web/apps/web/src/api -maxdepth 2 -type f | sort
git -C ../web diff --name-only HEAD -- apps/web/src
```

### 4) 반영 대상 문서 결정

기본 반영 대상:

- `README.md`
- `00_문서관리/표현-규칙/웹-표현-규칙.md`
- `10_제품/plm/제품-로드맵.md`
- `20_개발/인터페이스/서버-코드베이스-현황.md` (없으면 신규 생성)

상황별 추가 반영:

- 권한/역할 체계 변경 시: 관련 아키텍처/운영 문서
- 도메인 확장(issues/changes/team 등) 시: 제품 로드맵/용어 규칙
- API 대규모 변경 시: 인터페이스 문서 추가/분리

### 5) 문서 업데이트

반드시 다음을 반영한다.

1. 서버 현행 기능(도메인/상태/액션/권한/주요 필드)과 문서 동기화
2. 웹 노출 기능(라우트/화면/용어)과 문서 동기화
2. 오래된 경로/존재하지 않는 파일 참조 제거
3. 최신 기준일(절대 날짜) 갱신
4. 신규 기준 문서 생성 시 관련 문서에서 링크 연결

### 6) 검증

최소 검증:

1. `git status --short`로 변경 파일 확인
2. `git diff --stat`로 변경 규모 확인
3. 문서 내 깨진 참조/오래된 경로 재검색
4. 서버/웹 불일치 항목이 문서에 반영됐는지 확인
4. 변경 요약을 사용자에게 파일 단위로 보고

권장 명령:

```bash
git status --short
git diff --stat
rg -n "index.md|TODO|FIXME|TBD" README.md 00_문서관리 10_제품 20_개발
```

## 결과 보고 형식

최종 보고에는 아래를 포함한다.

1. 서버 분석 요약(숫자 포함)
2. 웹 분석 요약(라우트/API/특이사항)
3. 점검한 docs 범위
4. 수정/생성 파일 목록
5. 핵심 반영 내용
6. 남은 리스크 또는 후속 작업(있을 때만)
