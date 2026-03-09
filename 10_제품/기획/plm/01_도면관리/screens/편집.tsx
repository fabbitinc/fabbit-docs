import {
  ScreenHeader,
  WireBlock,
  FormRow,
  MockInput,
  MockSelect,
  MockTextarea,
  MockButton,
  Row,
  ButtonGroup,
  Field,
  Badge,
} from "@wire";

export default function 편집() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="편집 화면"
        desc="신규 도면 등록과 Draft 도면 수정을 처리하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="편집 모드">
          <Field label="현재 흐름">
            <Badge status="design" label="Draft" /> 신규 등록
          </Field>
          <Field label="승인 상태">Draft만 편집 가능</Field>
          <Field label="변환 상태">저장 후 Pending으로 시작</Field>
        </WireBlock>
        <WireBlock title="읽기 전용 조건">
          <Field label="상태">Released · Obsolete</Field>
          <Field label="권한">설계팀 이외 사용자</Field>
          <Field label="잠금">사용자 잠금은 후속 범위</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="기본 정보">
          <div className="space-y-1.5">
            <FormRow label="도면번호" required>
              <MockInput defaultValue="D-ENG-002" />
            </FormRow>
            <FormRow label="도면명" required>
              <MockInput defaultValue="실린더 헤드 조립도" />
            </FormRow>
            <FormRow label="버전" required>
              <MockInput defaultValue="Rev.B" />
            </FormRow>
            <FormRow label="상태">
              <MockSelect options={["Draft", "In Review", "Approved"]} />
            </FormRow>
          </div>
        </WireBlock>

        <WireBlock title="원본 파일">
          <div className="space-y-1.5">
            <FormRow label="업로드 파일" required>
              <MockSelect options={["cylinder-head-v2.dwg", "jig-assembly.step"]} />
            </FormRow>
            <FormRow label="분류">
              <MockInput locked value="CAD_2D / TWO_D" />
            </FormRow>
            <FormRow label="대표 연결 부품">
              <MockSelect options={["ENG-HEAD-002", "JIG-ASM-003", "미연결"]} />
            </FormRow>
          </div>
          <div className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
            원본 파일을 바꾸면 변환 상태는 다시 Pending이 된다. Released 도면은
            파일 교체 대신 새 Draft 등록으로 처리한다.
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="검토 메모">
          <MockTextarea placeholder="검토자에게 전달할 메모를 입력한다" />
          <div className="mt-3 text-[11px] text-gray-500">
            검토 메모는 Draft 저장에는 선택이고, 반려 시에는 검토자가 별도
            사유를 남긴다.
          </div>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="저장 전 검증">
          <Field label="필수값">도면번호 · 도면명 · 버전 · 원본 파일</Field>
          <Field label="중복">도면번호는 조직 내 유일</Field>
          <Field label="배포 조건">대표 연결 부품 + 변환 완료 필수</Field>
        </WireBlock>
        <WireBlock title="상태 피드백">
          <Field label="Saving">버튼 비활성 + 상단 로딩 배너</Field>
          <Field label="Validation">필드 하단 오류 문구</Field>
          <Field label="Failed">상세 화면에서 실패 코드 노출</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>저장</MockButton>
        <MockButton>취소</MockButton>
      </ButtonGroup>
      <div className="mt-3 text-[11px] text-gray-500">
        저장 성공 후 상세 화면으로 이동하고, 변환 상태 폴링이 시작된다.
      </div>
    </div>
  );
}
