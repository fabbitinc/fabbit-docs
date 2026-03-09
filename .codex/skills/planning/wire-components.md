# @wire 공통 컴포넌트 API

모든 컴포넌트는 `@wire`에서 import한다.

```tsx
import { ScreenHeader, WireBlock, Field, Badge, FlowSection, ... } from "@wire";
```

## ScreenHeader

화면 상단 제목 + 설명.

| prop | type | 설명 |
|------|------|------|
| `title` | `string` | 화면 제목 |
| `desc` | `string` | 한줄 설명 |

## WireBlock

보라색 제목의 섹션 블록. 와이어프레임의 기본 단위.

| prop | type | 설명 |
|------|------|------|
| `title` | `string` | 블록 제목 (보라색) |
| `children` | `ReactNode` | 내용 |
| `className?` | `string` | 추가 클래스 |

## Field

읽기 전용 key:value 표시.

| prop | type | 설명 |
|------|------|------|
| `label?` | `string` | 라벨 (회색) |
| `children` | `ReactNode` | 값 |

## Badge

상태 배지. 색상은 status에 따라 자동 매핑.

| prop | type | 설명 |
|------|------|------|
| `status` | `string` | `design` / `prototype` / `production` / `eol` / `obsolete` |
| `label?` | `string` | 표시 텍스트 (기본: status) |

색상 매핑:
- design → 파랑
- prototype → 초록
- production → 주황
- eol → 노랑
- obsolete → 빨강

## MockButton

버튼 목업.

| prop | type | 설명 |
|------|------|------|
| `primary?` | `boolean` | true면 보라 배경, false면 회색 border |
| `children` | `ReactNode` | 버튼 텍스트 |

## FormRow

폼 라벨 + 입력 필드를 가로 정렬.

| prop | type | 설명 |
|------|------|------|
| `label` | `string` | 라벨 |
| `required?` | `boolean` | true면 `*` 표시 |
| `children` | `ReactNode` | 입력 컴포넌트 |

## MockInput

텍스트 입력 목업. HTML `<input>` props를 모두 지원.

| prop | type | 설명 |
|------|------|------|
| `locked?` | `boolean` | true면 읽기 전용 (회색 배경) |

## MockSelect

드롭다운 목업.

| prop | type | 설명 |
|------|------|------|
| `options` | `string[]` | 선택지 배열 |

## MockTextarea

텍스트에어리어 목업. HTML `<textarea>` props를 모두 지원.

## Row

그리드 레이아웃 행.

| prop | type | 설명 |
|------|------|------|
| `cols?` | `1 \| 2 \| 3` | 컬럼 수 (기본: 1) |
| `children` | `ReactNode` | WireBlock 등 |

## ButtonGroup

버튼들을 가로 배치. `mt-3` 자동 적용.

## FlowSection

플로우 탭에서 쓰는 섹션 블록.

| prop | type | 설명 |
|------|------|------|
| `title` | `string` | 섹션 제목 |
| `desc?` | `string` | 한줄 설명 |
| `children` | `ReactNode` | 내용 |

## FlowRow

플로우 단계를 가로로 배치.

| prop | type | 설명 |
|------|------|------|
| `children` | `ReactNode` | `FlowStep`, `FlowArrow` 등 |
| `className?` | `string` | 추가 클래스 |

## FlowStep

플로우 단계 카드.

| prop | type | 설명 |
|------|------|------|
| `title` | `string` | 단계 제목 |
| `kind?` | `"start" \| "action" \| "decision" \| "system" \| "result"` | 단계 유형 |
| `children?` | `ReactNode` | 보조 설명 |
| `className?` | `string` | 추가 클래스 |

## FlowArrow

단계 사이 연결 표시.

| prop | type | 설명 |
|------|------|------|
| `label?` | `string` | 조건/분기 라벨 |

## FlowNote

보조 메모나 예외 조건을 표시.
