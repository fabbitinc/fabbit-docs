# Fabbit 이메일 관리 전략

## 개요

스타트업 초기에는 간단하게 시작하고, 성장에 따라 확장하는 것이 핵심입니다.

---

## 권장 이메일 구조

### Tier 1: 필수 (Day 1)

| 이메일 | 포지션 | 용도 |
|--------|--------|------|
| `hello@fabbit.com` | CEO | 대표 연락처, 일반 문의 |
| `support@fabbit.com` | CS | 고객 지원, 기술 문의 |

> **Tip**: 초기에는 `hello@`로 모든 문의를 받고, 규모가 커지면 분리

### Tier 2: 운영 안정화 시

| 이메일 | 포지션 | 용도 |
|--------|--------|------|
| `infra@fabbit.com` | Infra | 클라우드/인프라 (AWS, Cloudflare) |
| `dev@fabbit.com` | Dev | 개발 도구 (GitHub, Supabase) |
| `finance@fabbit.com` | Finance | 결제/회계 (Stripe, 홈택스) |
| `noreply@fabbit.com` | Marketing | 시스템 발송 전용 |

### Tier 3: 성장 단계

| 이메일 | 포지션 | 용도 |
|--------|--------|------|
| `hr@fabbit.com` | HR | 인사 관리 |
| `careers@fabbit.com` | HR | 채용 (외부 공개) |
| `sales@fabbit.com` | Sales | 영업/제휴 |
| `security@fabbit.com` | Security | 보안 취약점 신고 |
| `legal@fabbit.com` | Legal | 법무/계약 |
| `press@fabbit.com` | Marketing | 언론/PR |

---

## 개인 이메일 네이밍 컨벤션

| 방식 | 예시 | 장단점 |
|------|------|--------|
| **firstname** | `seongha@fabbit.com` | ✅ 간결, ❌ 동명이인 충돌 |
| **firstname.lastname** | `seongha.moon@fabbit.com` | ✅ 명확, ❌ 긴 주소 |
| **f.lastname** | `s.moon@fabbit.com` | ✅ 짧고 명확 |

> **권장**: 초기에는 `firstname@` 사용, 팀 확장 시 `firstname.lastname@`으로 전환

---

## 포지션별 이메일 관리 전략

### 왜 분리해야 하나?

1. **보안**: 한 계정 탈취 시 피해 범위 제한
2. **관리**: 서비스별 청구서/알림 분리
3. **인수인계**: 담당자 변경 시 개인 메일 사용 방지
4. **책임 명확화**: 누가 어떤 서비스를 관리하는지 명확

---

### CEO / 대표

| 이메일 | 용도 |
|--------|------|
| `hello@fabbit.com` | 대외 대표 연락처, 일반 문의 |
| `ceo@fabbit.com` (선택) | 공식 대표 메일 (투자, 파트너십) |

```
관리 서비스
├── 법인 대표 계정 (은행, 공인인증)
├── 투자 관련 (IR 플랫폼)
└── 주요 파트너십 계약
```

---

### Infra / 인프라 관리자

| 이메일 | 용도 |
|--------|------|
| `infra@fabbit.com` | 클라우드/인프라 서비스 |

```
관리 서비스
├── 클라우드: AWS, GCP, Oracle Cloud
├── CDN/DNS: Cloudflare
├── 도메인: 가비아, Namecheap, Route53
├── 모니터링: Datadog, Grafana Cloud
└── 서버/컨테이너: Docker Hub, Kubernetes
```

---

### Dev / 개발 관리자

| 이메일 | 용도 |
|--------|------|
| `dev@fabbit.com` | 개발 도구 및 서비스 |

```
관리 서비스
├── 코드: GitHub, GitLab, Bitbucket
├── CI/CD: GitHub Actions, CircleCI
├── 백엔드: Supabase, Firebase, PlanetScale
├── 프론트엔드: Vercel, Netlify
├── 에러 트래킹: Sentry
├── AI API: OpenAI, Anthropic, Google AI
└── 개발자 도구: Postman, Figma (Dev mode)
```

---

### Finance / 재무 관리자

| 이메일 | 용도 |
|--------|------|
| `finance@fabbit.com` | 재무/회계/결제 |
| `billing@fabbit.com` | 고객 결제 관련 |

```
관리 서비스
├── 결제: Stripe, Toss Payments, 페이팔
├── 회계: 홈택스, 세무사 연락
├── 급여: 급여 서비스 (flex, 사람인페이)
├── 법인카드: 카드사 관리
└── 구독 서비스 결제 총괄
```

---

### HR / 인사 관리자

| 이메일 | 용도 |
|--------|------|
| `hr@fabbit.com` | 인사 관리 |
| `careers@fabbit.com` | 채용 (외부 공개용) |

```
관리 서비스
├── 채용: 원티드, 로켓펀치, LinkedIn
├── 근태: Flex, 시프티
├── 협업: Slack (워크스페이스 관리)
├── 문서: Notion, Confluence (팀 관리)
└── 복리후생: 식대, 복지몰
```

---

### Sales / 영업 관리자

| 이메일 | 용도 |
|--------|------|
| `sales@fabbit.com` | B2B 영업, 제휴 |
| `partners@fabbit.com` | 파트너/리셀러 |

```
관리 서비스
├── CRM: HubSpot, Salesforce, Pipedrive
├── 미팅: Calendly, Cal.com
├── 계약: DocuSign, 모두싸인
└── 리드 관리: LinkedIn Sales Navigator
```

---

### CS / 고객지원 관리자

| 이메일 | 용도 |
|--------|------|
| `support@fabbit.com` | 고객 문의, 기술 지원 |
| `help@fabbit.com` (별칭) | support@ 포워딩 |

```
관리 서비스
├── 헬프데스크: Zendesk, Freshdesk, Intercom
├── 채팅: Channel.io, Crisp
├── FAQ/문서: Notion, GitBook
└── 피드백: Canny, Typeform
```

---

### Security / 보안 관리자

| 이메일 | 용도 |
|--------|------|
| `security@fabbit.com` | 보안 취약점 신고 (필수 권장) |

```
관리 서비스
├── 보안 스캔: Snyk, SonarQube
├── 시크릿 관리: Vault, AWS Secrets Manager
├── 인증: Auth0, Clerk
└── 버그 바운티 프로그램 (선택)
```

---

### Legal / 법무 관리자

| 이메일 | 용도 |
|--------|------|
| `legal@fabbit.com` | 계약, 법률 검토 |

```
관리 서비스
├── 계약: NDA, 이용약관, 개인정보처리방침
├── 법률 자문: 법무법인 연락
├── 지식재산: 특허, 상표 출원
└── 규제 대응: GDPR, 개인정보보호법
```

---

### Marketing / 마케팅 관리자

| 이메일 | 용도 |
|--------|------|
| `marketing@fabbit.com` | 마케팅 캠페인 |
| `press@fabbit.com` | 언론/PR |
| `noreply@fabbit.com` | 뉴스레터, 시스템 메일 발송 |

```
관리 서비스
├── 이메일 마케팅: Mailchimp, Stibee
├── 애널리틱스: Google Analytics, Mixpanel
├── 광고: Google Ads, Meta Ads
├── SNS: Twitter, LinkedIn, Instagram
└── 디자인: Figma, Canva
```

---

## 이메일 그룹/별칭 활용

Google Workspace 또는 Microsoft 365 사용 시 **그룹 이메일**로 관리:

```
support@fabbit.com
  └── 수신자: seongha@, developer1@, developer2@

team@fabbit.com
  └── 수신자: 전체 팀원 (공지용)
```

---

## 보안 권장사항

| 항목 | 권장 |
|------|------|
| **2FA 필수** | 모든 공용 계정에 2단계 인증 |
| **비밀번호 관리** | 1Password, Bitwarden 등 팀 공유 볼트 사용 |
| **복구 이메일** | 대표 개인 메일을 admin@ 복구 이메일로 설정 |
| **접근 권한 로그** | 누가 언제 로그인했는지 주기적 확인 |

---

## Fabbit 초기 권장 구성

### 1인 창업 / 초기 (1~2명)

> 한 사람이 여러 역할 겸임

```
📧 필수 (즉시 생성)
├── hello@fabbit.com      → CEO: 대표 연락처
├── infra@fabbit.com      → Infra: 클라우드 (AWS, Cloudflare)
├── dev@fabbit.com        → Dev: 개발 도구 (GitHub, Supabase)
└── noreply@fabbit.com    → Marketing: 시스템 발송용

📧 런칭 시
├── support@fabbit.com    → CS: 고객 지원
└── finance@fabbit.com    → Finance: 결제/청구
```

### 성장기 (3~10명)

> 포지션별 담당자 지정

```
📧 추가 생성
├── hr@fabbit.com         → HR: 인사 관리
├── careers@fabbit.com    → HR: 채용 (외부 공개)
├── sales@fabbit.com      → Sales: 영업/제휴
├── security@fabbit.com   → Security: 보안 신고
└── legal@fabbit.com      → Legal: 계약/법무
```

### 확장기 (10명+)

```
📧 세분화
├── billing@fabbit.com    → Finance: 고객 결제 전용
├── partners@fabbit.com   → Sales: 파트너/리셀러
├── press@fabbit.com      → Marketing: 언론/PR
└── marketing@fabbit.com  → Marketing: 캠페인
```

---

## 체크리스트

### 초기 설정
- [ ] 도메인 이메일 호스팅 선택 (Google Workspace / Microsoft 365 / Zoho)
- [ ] 필수 이메일 생성 (hello, infra, dev, noreply)
- [ ] 모든 계정 2FA 설정
- [ ] 비밀번호 관리 도구 설정 (1Password, Bitwarden)

### 포지션별 계정 분리
- [ ] Infra: 클라우드 서비스 이관
- [ ] Dev: 개발 도구 이관
- [ ] Finance: 결제 서비스 이관
- [ ] 각 포지션별 담당자 지정 및 권한 부여

### 보안 점검
- [ ] 복구 이메일 설정 (대표 개인 메일)
- [ ] 접근 권한 로그 주기적 확인
- [ ] 퇴사자 계정 즉시 비활성화 프로세스 수립
