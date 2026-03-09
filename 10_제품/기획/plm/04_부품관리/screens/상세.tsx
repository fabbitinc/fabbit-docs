import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 상세() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader title="상세 화면" desc="개별 부품의 전체 정보를 읽기 전용으로 조회하는 화면" />

      <Row cols={2}>
        <WireBlock title="기본 정보">
          <Field label="품번">ENG-V6-001</Field>
          <Field label="품명">V6 엔진 ASS'Y</Field>
          <Field label="유형">조립품</Field>
          <Field label="상태"><Badge status="production" /></Field>
          <Field label="카테고리">엔진</Field>
        </WireBlock>
        <WireBlock title="리비전">
          <Field>Rev.C &nbsp; Released &nbsp; 03-07</Field>
          <Field><span className="text-gray-400">Rev.B &nbsp; Obsolete &nbsp; 02-15</span></Field>
          <Field><span className="text-gray-400">Rev.A &nbsp; Obsolete &nbsp; 01-20</span></Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="속성">
          <Field label="재질">AL6061 &nbsp;|&nbsp; <span className="text-gray-400">무게:</span> 85.3kg</Field>
          <Field label="제조사">자사 &nbsp;|&nbsp; <span className="text-gray-400">RoHS:</span> Y</Field>
        </WireBlock>
        <WireBlock title="연결 정보">
          <Field label="BOM 하위">47건 &nbsp;|&nbsp; <span className="text-gray-400">Where-Used:</span> 2건</Field>
          <Field label="ECO">ECO-0023, ECO-0019</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="이력">
          <Field>03-07 09:00 &nbsp; 김설계 &nbsp; Rev.C Released</Field>
          <Field>03-05 14:30 &nbsp; 김설계 &nbsp; Rev.C Draft 도면 변경</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>편집</MockButton>
        <MockButton>상태 변경</MockButton>
        <MockButton>삭제</MockButton>
      </ButtonGroup>
    </div>
  );
}
