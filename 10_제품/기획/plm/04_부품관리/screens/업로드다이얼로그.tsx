import {
  ScreenHeader,
  WireBlock,
  Field,
  MockButton,
  MockInput,
  MockSelect,
  Row,
  ButtonGroup,
  Badge,
} from "@wire";

export default function 업로드다이얼로그() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="업로드 다이얼로그"
        desc="매핑 선택, 파일 검증, 루트 컨텍스트 보강, 배치 진행률 확인을 한 흐름으로 처리한다"
      />

      <Row cols={2}>
        <WireBlock title="매핑 선택">
          <Field label="매핑 목록">가장 최근 버전 우선 정렬</Field>
          <Field label="선택값">자동차 부품 매핑 v7</Field>
          <Field label="예외 상태">매핑 없음 또는 조회 실패 시 속성 분석으로 이동</Field>
        </WireBlock>
        <WireBlock title="필수 컬럼">
          <Field label="일반 컬럼">part_number · name · revision · quantity</Field>
          <Field label="루트 컨텍스트 필요">Supplier · Project</Field>
          <Field label="추가 컬럼">미반영 컬럼은 경고만 표시</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="파일 업로드">
          <Field label="허용 형식">xlsx · xls · csv</Field>
          <Field label="업로드 방식">드래그 앤 드롭 · 파일 선택 · 다중 업로드</Field>
          <Field label="검증">헤더 즉시 검사 · 필수 컬럼 누락 시 실패</Field>
        </WireBlock>
        <WireBlock title="파일 카드 상태">
          <Field><Badge status="production" /> engine-bom.xlsx · 검증 완료</Field>
          <Field><Badge status="eol" /> supplier.csv · 미반영 컬럼 3개 경고</Field>
          <Field><Badge status="obsolete" /> drawing.xlsx · 필수 컬럼 누락</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="루트 컨텍스트 보강">
          <Field label="대상">Supplier</Field>
          <MockInput defaultValue="현대소재" />
          <Field label="입력 방식">자동완성 검색 또는 직접 입력</Field>
          <ButtonGroup>
            <MockButton>검색 결과 선택</MockButton>
            <MockButton>모두 적용</MockButton>
          </ButtonGroup>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="실행 옵션">
          <Field label="기존 값 덮어쓰기">OFF: 빈 필드만 채움 / ON: 업로드 값으로 갱신</Field>
          <Field label="실행 조건">완료 파일 1개 이상 · 실패 파일 없음 · 루트 컨텍스트 완료</Field>
        </WireBlock>
        <WireBlock title="배치 진행률">
          <Field label="상태">pending 1 · processing 2 · completed 4 · failed 1</Field>
          <Field label="파일별 결과">rows / nodes / relationships / errors</Field>
          <Field label="완료 후">목록, 상세, BOM 재조회</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="다이얼로그 액션">
          <ButtonGroup>
            <MockButton>취소</MockButton>
            <MockButton>속성 분석으로 이동</MockButton>
            <MockButton primary>업로드 실행</MockButton>
          </ButtonGroup>
        </WireBlock>
      </Row>
    </div>
  );
}
