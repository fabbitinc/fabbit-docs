import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 가져오기이력() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="BOM 가져오기 이력 화면"
        desc="합성 작업 상태와 반영 결과를 최신순으로 확인하는 운영 화면"
      />

      <Row cols={2}>
        <WireBlock title="화면 목적">
          <Field label="대상">`/api/v1/synthesis` 기반 합성 작업</Field>
          <Field label="핵심 지표">상태 · 처리 행 수 · 생성 관계 수 · 오류 수</Field>
          <Field label="폴링">PENDING / PROCESSING 작업은 10초 간격 재조회</Field>
        </WireBlock>
        <WireBlock title="주의 사항">
          <Field label="파일 표시">현재 응답은 `fileId`만 제공</Field>
          <Field label="재처리">기존 작업 재실행 없음 · 새 합성 작업으로 처리</Field>
          <Field label="범위">BOM 반영 추적용 읽기 전용 화면</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="작업 목록">
          <div className="text-[10px] text-gray-400 mb-2">
            생성시각 · 작업ID · 상태 · 처리행/전체행 · 생성 관계 수 · 오류
          </div>
          <Field>
            <Badge status="completed" label="COMPLETED" /> 03-09 15:10 · job_8f2... · 240 / 240 · 관계 184건 · 오류 0건
          </Field>
          <Field>
            <Badge status="processing" label="PROCESSING" /> 03-09 14:55 · job_8e1... · 92 / 240 · 관계 67건 · 오류 1건
          </Field>
          <Field>
            <Badge status="failed" label="FAILED" /> 03-09 14:12 · job_7d9... · 18 / 120 · 관계 9건 · 오류 3건
          </Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="실패 상세 예시">
          <Field>row 19 · 상위 품번 누락</Field>
          <Field>row 44 · 하위 품번과 상위 품번 동일</Field>
          <Field>row 58 · 수량 값이 0 이하</Field>
        </WireBlock>
        <WireBlock title="상태 피드백">
          <Field label="Loading">목록 스켈레톤 + 마지막 갱신 시각 유지</Field>
          <Field label="Empty">아직 실행된 BOM 반영 작업이 없습니다</Field>
          <Field label="Error">목록 조회 실패 배너 + 새로고침 버튼</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>새로고침</MockButton>
        <MockButton>작업 상세 보기</MockButton>
      </ButtonGroup>
    </div>
  );
}
