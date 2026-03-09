import { ScreenHeader, WireBlock, FormRow, MockInput, MockSelect, MockTextarea, MockButton, Row, ButtonGroup } from "@wire";

export default function 편집() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader title="편집 화면" desc="부품 정보를 수정하는 화면 (신규 등록 시에도 동일한 레이아웃)" />

      <Row>
        <WireBlock title="기본 정보">
          <div className="space-y-1.5">
            <FormRow label="품번"><MockInput locked value="ENG-V6-001" /></FormRow>
            <FormRow label="품명" required><MockInput defaultValue="V6 엔진 ASS'Y" /></FormRow>
            <FormRow label="유형" required><MockSelect options={["조립품", "부품", "원자재"]} /></FormRow>
            <FormRow label="카테고리"><MockSelect options={["엔진", "차체", "전장"]} /></FormRow>
          </div>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="속성">
          <div className="space-y-1.5">
            <FormRow label="재질"><MockInput defaultValue="AL6061" /></FormRow>
            <FormRow label="무게 (kg)"><MockInput type="number" defaultValue="85.3" /></FormRow>
            <FormRow label="제조사"><MockInput defaultValue="자사" /></FormRow>
            <FormRow label="RoHS"><MockSelect options={["Y", "N", "N/A"]} /></FormRow>
          </div>
        </WireBlock>
        <WireBlock title="커스텀 속성">
          <div className="space-y-1.5">
            <FormRow label="표면처리"><MockInput defaultValue="아노다이징" /></FormRow>
            <FormRow label="공차등급"><MockInput defaultValue="IT7" /></FormRow>
          </div>
          <div className="mt-2">
            <MockButton>+ 속성 추가</MockButton>
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="변경 사유">
          <MockTextarea placeholder="변경 사유를 입력하세요 (Production 이상 필수)" />
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>저장</MockButton>
        <MockButton>취소</MockButton>
      </ButtonGroup>
    </div>
  );
}
