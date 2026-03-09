import { ScreenHeader, WireBlock, Field, MockButton, Row, ButtonGroup } from "@wire";

export default function 변경요청상세() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="변경요청 상세"
        desc="변경요청의 기본 정보, 검토 상태, 연결 이슈, 타임라인과 상태 전이를 관리하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="기본 정보">
          <Field label="번호">#249</Field>
          <Field label="기본 상태">OPEN</Field>
          <Field label="변경요청 상태">SUBMITTED</Field>
          <Field label="제목">체결 순서 변경 요청</Field>
          <Field label="담당자">김설계, 생산기술팀</Field>
        </WireBlock>
        <WireBlock title="부품 / 파일 / 라벨">
          <Field label="부품">ENG-2210</Field>
          <Field label="라벨">양산, 작업표준, 조립성</Field>
          <Field label="첨부파일">조립순서-개정안.pdf, 현장영상.mp4</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="검토 현황">
          <Field>이검토 · APPROVED · 03-09 13:10</Field>
          <Field>정리더 · PENDING</Field>
          <Field>검토팀: 품질팀</Field>
        </WireBlock>
        <WireBlock title="연결 이슈">
          <Field>#241 · OPEN · 조립 공차 이슈</Field>
          <Field>#245 · OPEN · 공정 작업표준 불일치</Field>
          <div className="mt-3 text-[11px] text-gray-500">
            이 변경요청이 MERGED 되어도 다른 미해결 변경요청이 남아 있으면 연결 이슈는 열린 상태를 유지한다.
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="타임라인">
          <Field>03-09 11:15 · activity · cr:state_changed · DRAFT 생성</Field>
          <Field>03-09 12:40 · comment · 김설계 · 조립 순서 변경으로 간섭 감소 확인</Field>
          <Field>03-09 13:10 · activity · issue:reviewer_changed · 정리더 추가</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>반영</MockButton>
        <MockButton>수정</MockButton>
        <MockButton>닫기</MockButton>
      </ButtonGroup>
    </div>
  );
}
