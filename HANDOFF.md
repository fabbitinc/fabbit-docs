# HANDOFF — .wireframe 앱 & 기획 문서 시스템

## Goal

`10_제품/기획/` 하위의 기획 문서(기획.md, 정책.md)와 와이어프레임(TSX), 상세 정책(MD)을 웹 뷰어로 통합 열람할 수 있는 React 앱을 구축하고, 기획 작성 컨벤션을 스킬로 정립한다.

## Current Progress

### 완료된 작업

1. **`.wireframe` 앱 구축** (`10_제품/기획/.wireframe/`)
   - React + Vite + Tailwind + TypeScript
   - `pnpm dev` → `http://localhost:5173/`

2. **3패널 레이아웃**
   - 왼쪽: 사이드바 (모듈/기능 트리 네비게이션, `{번호}_` prefix 숨김)
   - 가운데: 탭 전환 — 와이어프레임 | 기획 | 정책
   - 오른쪽: 와이어프레임 탭일 때 화면별 상세 정책 표시 (탭 없이 전체 스크롤)

3. **와이어프레임을 HTML iframe → React TSX 컴포넌트로 전환**
   - `import.meta.glob("../../../**/screens/*.tsx")`로 동적 로딩
   - `vite.config.ts`에 `server.fs.allow`로 부모 디렉토리 접근 허용

4. **폴더 구조 통합** (wireframe/ + policies/ → screens/)
   ```
   plm/04_부품관리/
     기획.md
     정책.md
     screens/
       목록.tsx              ← 와이어프레임 컴포넌트
       목록-검색필터.md       ← 화면별 상세 정책 (prefix 매칭)
       목록-테이블.md
       상세.tsx
       상세-기본정보.md
       ...
   ```

5. **공통 와이어프레임 컴포넌트** (`@wire` alias)
   - 위치: `.wireframe/src/components/wire/index.tsx`
   - 컴포넌트: `ScreenHeader`, `WireBlock`, `Field`, `Badge`, `MockButton`, `FormRow`, `MockInput`, `MockSelect`, `MockTextarea`, `Row`, `ButtonGroup`

6. **기획/정책 마크다운 뷰어**
   - YAML frontmatter 숨김 (`remark-frontmatter`)
   - 오른쪽 목차 (헤딩 자동 추출, 클릭 스크롤, 활성 헤딩 하이라이트)
   - `@tailwindcss/typography` 적용

7. **Vite 플러그인** (`featureScanPlugin`)
   - `/api/tree`: 폴더 구조 스캔 (screens/*.tsx → 화면, {screen}-*.md → 정책 매칭)
   - `/files/*`: 기획 폴더 정적 파일 서빙

8. **`/planning` 스킬 생성** (`.claude/skills/planning/`)
   - `SKILL.md`: 폴더 규칙, 문서 양식, 와이어프레임 작성법
   - `wire-components.md`: @wire 공통 컴포넌트 API 레퍼런스

### 주요 파일 위치

| 파일 | 용도 |
|------|------|
| `10_제품/기획/.wireframe/vite.config.ts` | Vite 설정 + featureScan 플러그인 |
| `10_제품/기획/.wireframe/src/App.tsx` | 메인 레이아웃 (3패널 + 탭) |
| `10_제품/기획/.wireframe/src/components/WireframePanel.tsx` | TSX 동적 로딩 + 화면 탭 |
| `10_제품/기획/.wireframe/src/components/PolicyPanel.tsx` | 상세 정책 렌더링 |
| `10_제품/기획/.wireframe/src/components/MarkdownView.tsx` | 기획/정책 마크다운 뷰어 + 목차 |
| `10_제품/기획/.wireframe/src/components/Sidebar.tsx` | 폴더 트리 네비게이션 |
| `10_제품/기획/.wireframe/src/components/wire/index.tsx` | 공통 와이어프레임 컴포넌트 |
| `.claude/skills/planning/SKILL.md` | 기획 작성 스킬 |

## What Worked

- `import.meta.glob`으로 부모 디렉토리의 TSX를 상대 경로(`../../../**/screens/*.tsx`)로 동적 로딩
- `server.fs.allow`로 Vite가 부모 디렉토리 파일에 접근 가능
- screens/ 폴더에 TSX + MD를 함께 두고 prefix로 매칭하는 컨벤션이 단순하고 효과적
- 정책 패널: 탭 대신 전체 표시 + 오른쪽만 스크롤이 UX상 자연스러움

## What Didn't Work

- `import.meta.glob`에서 Vite alias (`/@planning/`)는 지원하지 않음 → 상대 경로 사용
- iframe 방식 와이어프레임: `100vh` vs iframe 높이 불일치로 스크롤 문제 발생, 화면 간 상태 통신도 불편 → React TSX로 전환
- 정책을 별도 `policies/` 하위 폴더로 관리: 불필요하게 깊은 구조 → screens/에 prefix로 통합

## Next Steps

- [ ] MES, Site 등 다른 모듈에 screens/ 구조로 와이어프레임 추가
- [ ] `00_문서관리/템플릿/와이어프레임.html` 레거시 템플릿 정리
- [ ] 빌드(`pnpm build`) 설정 확인 — 현재 dev 모드만 테스트됨
- [ ] 와이어프레임에 인터랙션 추가 가능성 검토 (탭 클릭 시 하위 화면 전환 등)
- [ ] 새 Badge 색상/상태 추가 시 `wire/index.tsx`의 `BADGE_COLORS` 확장
