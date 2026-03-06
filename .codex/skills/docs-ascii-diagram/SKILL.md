---
name: docs-ascii-diagram
description: ASCII Diagram 작성시 활용 가능한 스킬
disable-model-invocation: false
user-invocable: false
---

# ASCII Diagram Skill

ASCII 다이어그램 작성 시 한글/영문 혼합 정렬 규칙.

## 핵심 규칙

- 사용자는 고정폭 폰트를 사용합니다.
- **한글: 2칸** (가, 나, 다)
- **그 외: 1칸** (영문, 숫자, 특수문자, 공백, 박스문자)

## 계산 공식

```
총 너비 = (한글 수 × 2) + (그 외 문자 수 × 1)
```

## 예시

10칸 박스에 맞출 때:

```
"User"       = 4칸   → 공백 6칸 추가
"사용자"     = 6칸   → 공백 4칸 추가
"클라이언트" = 10칸  → 공백 0칸

┌────────────┐
│ User       │
│ 사용자     │
│ 클라이언트 │
└────────────┘
```

## 전제

- monospace 폰트 필수 (D2Coding, Consolas 등)
