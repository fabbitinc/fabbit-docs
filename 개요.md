# Fabbit PLM 리서치 정리 (도면관리/BOM 중심)

이 문서는 Fabbit 프로젝트의 PLM(Product Lifecycle Management) 범위를 빠르게
공유하고, 1차 집중 대상인 도면관리와 BOM의 실행 우선순위를 정리한다.

## 목적

이번 정리의 목적은 "처음부터 큰 범위를 한 번에 구현"하는 대신, 추적성과
운영 효과가 큰 코어 기능부터 단계적으로 도입할 수 있게 기준을 만드는 것이다.

- PLM 전체 범위와 핵심 모듈을 한눈에 파악한다.
- 도면관리와 BOM의 최소 요구사항을 명확히 한다.
- Fabbit 기준 단계별 실행안을 정의한다.

## 1. PLM 전체 관점

PLM은 제품 수명주기 전반의 데이터를 연결해, 최신성과 추적성을 유지하는 체계다.
핵심은 문서 저장이 아니라 SSOT(Single Source of Truth) 운영이다.

### 1.1 PLM 정의

- PLM은 `기획 → 설계 → 제조 → 서비스 → 폐기` 전 주기 데이터를 통합 관리한다.
- 목표는 제품 데이터의 SSOT 확보와 변경 추적성 보장이다.

### 1.2 일반적인 PLM 핵심 모듈

- **PDM/문서관리**: 도면, 사양, 파일의 버전/리비전 관리
- **BOM 관리**: EBOM, MBOM, SBOM 구조 관리 및 비교
- **변경관리(ECR/ECO)**: 변경 요청, 승인, 배포 워크플로
- **구성관리(Configuration)**: 옵션/변형, Effectivity, 베이스라인
- **품질/컴플라이언스**: 규격 준수와 감사 추적
- **프로젝트/협업**: 부서 간 협업과 일정 관리
- **시스템 통합**: CAD, ERP, MES 및 외부 시스템 연계

### 1.3 2024~2026 시장/기술 트렌드

- **클라우드 PLM 확산**: 도입 속도, 확장성, 운영 자동화 측면에서 유리
- **AI 활용 확대**: 검색, 분류, 변경 영향 분석 보조
- **디지털 스레드 강화**: 설계-제조-서비스 데이터 연속성 확보
- **데이터 거버넌스 강화**: 권한, 감사, 라인리지, 규제 대응 중요성 증가

### 1.4 도입 효과

- 설계/변경 리드타임 단축
- 중복 데이터와 커뮤니케이션 오류 감소
- 최신본 사용률 향상 및 현장 재작업 감소
- 부서 간 협업 가시성과 책임 추적 강화

### 1.5 실패 요인(현업 빈도 높음)

- 파트번호, 리비전, 상태코드 등 **데이터 표준 부재**
- EBOM↔MBOM 매핑 규칙 미정의
- ECR/ECO 프로세스의 툴 내재화 미흡
- CAD/ERP/MES 통합 책임 경계 불명확

### 1.6 중견 제조기업 도입 권고

중견 제조 환경에서는 빅뱅 방식보다 코어 기능 선도입이 현실적이다.

- **1차 범위**: 도면관리 + BOM + 변경관리
- **통합 방식**: 단계적 연계
  1. CAD 연계
  2. ERP로 Released BOM 전달
  3. MES 실적/품질 피드백 수집

## 2. 도면관리·BOM 기능 정리

이 장은 Fabbit의 1차 구축 대상인 도면관리와 BOM을 기능, 데이터, KPI 관점으로
요약한다.

### 2.1 도면관리 (Drawing/Document Management)

도면관리는 "최신 승인본 사용 보장"과 "도면-품목-변경 추적"을 동시에 달성하는
영역이다.

#### 목표

- 현장에서 항상 최신 승인본을 참조하도록 보장
- 도면-품목-변경 간 연결 추적성 확보

#### 핵심 기능

- 파일 저장소 + 메타데이터 관리 (`dwg`, `step`, `pdf`, `xlsx` 등)
- **버전(작업본)/리비전(공식본)** 분리 관리
- 상태 전이 워크플로 (`작성 → 검토 → 승인 → 배포`)
- 접근권한(RBAC), 감사로그(열람/수정/승인 이력)
- 도면과 Part/BOM/ECO 간 참조 관계 관리

#### 최소 데이터 모델(예시)

- 문서번호, 문서유형, 상태, 버전, 리비전
- 소유자/조직, 제품/모델, 연관 Part ID
- 연관 ECO ID, 첨부 파일 해시, 생성/수정 이력

#### 운영 KPI

- 승인 리드타임
- 최신본 사용률
- 중복 도면률
- 긴급 변경 비율
- 도면-품목 연결률

### 2.2 BOM 관리

BOM 관리는 설계와 생산 간 데이터 정합성을 유지하고 변경 영향을 빠르게 파악하는
기능이다.

#### BOM 유형

- **EBOM (Engineering BOM)**: 설계 관점
- **MBOM (Manufacturing BOM)**: 생산 관점
- **SBOM (Service/Software BOM)**: 서비스 또는 소프트웨어 구성 관점

#### 핵심 기능

- 멀티레벨 BOM(상하위 구조)
- BOM 비교(diff), where-used 조회
- 대체품, 옵션품, Effectivity 관리
- 베이스라인 스냅샷(출고 기준점)
- ECR/ECO 연동(변경 전파/영향 추적)

#### 실무 핵심

- EBOM→MBOM은 완전 자동보다 **검토 가능한 반자동**이 현실적
- BOM, 도면, ECO를 동일 식별체계로 연결해야 추적성 확보 가능

#### 운영 KPI

- BOM 정확도
- ECO 처리시간
- BOM 변경 반영 지연시간
- BOM 기인 생산 오류율
- 재작업률

## 3. Fabbit 실행 우선순위

아래 단계는 구현 난이도와 현장 체감 효과를 함께 고려한 MVP 중심 실행안이다.

### Phase 1: 도면관리 MVP

- 문서/리비전/승인/배포/권한/감사로그

### Phase 2: BOM MVP

- EBOM 중심 멀티레벨
- BOM 비교, where-used
- 베이스라인 관리

### Phase 3: 변경관리 통합

- ECR/ECO 워크플로
- 도면/BOM 영향 연결 및 추적

### Phase 4: 외부 시스템 연계

- CAD 메타데이터 수집
- ERP로 Released BOM 전달
- MES 실적/품질 피드백 수집

## 4. 참고 출처

- IBM PLM 개요: https://www.ibm.com/think/topics/product-lifecycle-management
- Oracle PLM 개요: https://www.oracle.com/scm/product-lifecycle-management/what-is-plm/
- PTC EBOM 설명: https://www.ptc.com/en/technologies/plm/bill-of-materials/ebom
- Saratech EBOM vs MBOM: https://saratech.com/2024/07/ebom-vs-mbom-key-differences-and-benefits/
- BeyondPLM (EBOM↔MBOM 동기화 복잡성): https://beyondplm.com/2014/11/27/engineering-change-and-ebom-to-mbom-synchronization-complexity/
- CISA SBOM 개요: https://www.cisa.gov/sbom
- PLM 시장 전망 참고: https://www.precedenceresearch.com/product-lifecycle-management-market
