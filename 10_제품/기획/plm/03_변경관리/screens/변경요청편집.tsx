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

export default function 변경요청편집() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="변경요청 편집"
        desc="신규 변경요청 등록과 DRAFT/SUBMITTED 상태 수정에 사용하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="편집 상태">
          <Field label="현재 흐름">이슈 #241에서 생성한 신규 변경요청 작성</Field>
          <Field label="현재 상태">DRAFT</Field>
          <Field label="상태 제약">MERGED / CLOSED는 읽기 전용</Field>
        </WireBlock>
        <WireBlock title="검토 정책">
          <Field label="개인 검토자">리뷰 제출 가능</Field>
          <Field label="팀 검토자">배정 현황만 관리</Field>
          <Field label="반영 제약">MVP에서는 승인 완료 자동 차단 없음</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="기본 정보">
          <div className="space-y-1.5">
            <FormRow label="제목" required>
              <MockInput defaultValue="체결 순서 변경 요청" />
            </FormRow>
            <FormRow label="본문">
              <MockTextarea placeholder="변경 배경, 기대 효과, 리스크, 현장 적용 메모 입력" />
            </FormRow>
            <FormRow label="원본 이슈">
              <MockInput locked value="#241 조립 공차 이슈" />
            </FormRow>
            <FormRow label="연결 부품">
              <MockInput defaultValue="ENG-2210" />
            </FormRow>
          </div>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="담당 / 검토 설정">
          <div className="space-y-1.5">
            <FormRow label="개인 담당자">
              <MockInput defaultValue="김설계" />
            </FormRow>
            <FormRow label="팀 담당자">
              <MockSelect options={["선택 안 함", "설계팀", "생산기술팀"]} />
            </FormRow>
            <FormRow label="개인 검토자">
              <MockInput defaultValue="이검토, 정리더" />
            </FormRow>
            <FormRow label="팀 검토자">
              <MockSelect options={["선택 안 함", "품질팀", "생산기술팀"]} />
            </FormRow>
          </div>
        </WireBlock>
        <WireBlock title="분류 / 파일 / 저장 상태">
          <Field label="라벨">양산, 작업표준, 조립성</Field>
          <Field label="첨부파일">조립순서-개정안.pdf, 현장영상.mp4</Field>
          <Field label="검증">제목 필수, TipTap 유효성, 리뷰 상태는 상세에서 제출</Field>
          <Field label="오류">VALIDATION_ERROR, INVALID_STATE, FORBIDDEN</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>저장</MockButton>
        <MockButton>제출</MockButton>
        <MockButton>취소</MockButton>
      </ButtonGroup>
    </div>
  );
}
