import {
  ScreenHeader,
  WireBlock,
  FormRow,
  MockInput,
  MockTextarea,
  MockSelect,
  MockButton,
  Row,
  ButtonGroup,
  Field,
} from "@wire";

export default function 이슈편집() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="이슈 편집"
        desc="신규 이슈 등록과 열린 이슈 수정을 처리하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="편집 상태">
          <Field label="현재 흐름">부품 상세에서 진입한 신규 이슈 등록</Field>
          <Field label="기본 상태">저장 시 OPEN</Field>
          <Field label="저장 정책">제목/본문 저장 후 상세 화면에서 후속 액션 수행</Field>
        </WireBlock>
        <WireBlock title="에디터 규칙">
          <Field label="본문 포맷">TipTap JSON</Field>
          <Field label="멘션">사용자, 이슈 멘션 지원</Field>
          <Field label="첨부 제한">요청당 최대 20개</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="기본 정보">
          <div className="space-y-1.5">
            <FormRow label="제목" required>
              <MockInput defaultValue="조립 공차 이슈로 실린더 헤드 간섭 발생" />
            </FormRow>
            <FormRow label="본문">
              <MockTextarea placeholder="현상, 재현 조건, LOT, 임시 조치 내용을 입력" />
            </FormRow>
            <FormRow label="연결 부품">
              <MockInput defaultValue="ENG-2210, ENG-2210-HEAD" />
            </FormRow>
          </div>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="담당 / 분류">
          <div className="space-y-1.5">
            <FormRow label="개인 담당자">
              <MockInput defaultValue="박품질" />
            </FormRow>
            <FormRow label="팀 담당자">
              <MockSelect options={["선택 안 함", "품질팀", "생산기술팀", "설계팀"]} />
            </FormRow>
            <FormRow label="라벨">
              <MockInput defaultValue="조립성, 양산, 긴급" />
            </FormRow>
          </div>
        </WireBlock>
        <WireBlock title="파일 / 저장 상태">
          <Field label="첨부파일">간섭사진-1.png, 측정결과.xlsx</Field>
          <Field label="검증">제목 필수, 본문 TipTap 유효성, 파일 20개 이하</Field>
          <Field label="오류">VALIDATION_ERROR, PERMISSION_DENIED</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>저장</MockButton>
        <MockButton>취소</MockButton>
      </ButtonGroup>
    </div>
  );
}
