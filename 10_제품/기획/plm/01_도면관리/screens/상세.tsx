import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 상세() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="상세 화면"
        desc="도면 메타데이터, 뷰어, 대표 연결 부품, 변환 상태를 함께 조회하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="기본 정보">
          <Field label="도면번호">D-ENG-002</Field>
          <Field label="도면명">실린더 헤드 조립도</Field>
          <Field label="버전">Rev.B</Field>
          <Field label="상태"><Badge status="production" label="Released" /></Field>
          <Field label="변환"><Badge status="production" label="Completed" /></Field>
        </WireBlock>
        <WireBlock title="파일 / 분류">
          <Field label="원본 유형">CAD_2D · TWO_D</Field>
          <Field label="뷰어 타입">PDF</Field>
          <Field label="대표 연결 부품">ENG-HEAD-002 · 실린더 헤드</Field>
          <Field label="원본 파일">cylinder-head-v2.dwg</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="뷰어">
          <div className="rounded border border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
            PDF 뷰어 영역
          </div>
          <div className="mt-3 text-[11px] text-gray-500">
            변환이 완료되면 PDF 또는 GLB 뷰어를 연다. 실패 시 안내 배너와
            재처리 버튼을 노출한다.
          </div>
        </WireBlock>
        <WireBlock title="변환 상태 / 산출물">
          <Field label="진행 상태">Completed · 2026-03-09 14:31</Field>
          <Field label="썸네일">WEBP 준비 완료</Field>
          <Field label="파생 파일">PDF 준비 완료 · 원본 다운로드 가능</Field>
          <Field label="실패 사유">없음</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="상태 이력">
          <Field>03-09 14:40 · 이리더 · Approved</Field>
          <Field>03-09 14:41 · 이리더 · Released</Field>
          <Field>03-09 14:31 · 시스템 · Conversion Completed</Field>
        </WireBlock>
        <WireBlock title="예외 상태">
          <Field label="읽기 전용">Released / Obsolete는 항상 읽기 전용</Field>
          <Field label="권한 없음">생산/품질은 조회와 다운로드만 가능</Field>
          <Field label="실패">Failed면 뷰어 대신 실패 배너를 표시</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>편집</MockButton>
        <MockButton>검토 요청</MockButton>
        <MockButton>배포</MockButton>
        <MockButton>재처리</MockButton>
        <MockButton>원본 다운로드</MockButton>
      </ButtonGroup>
    </div>
  );
}
