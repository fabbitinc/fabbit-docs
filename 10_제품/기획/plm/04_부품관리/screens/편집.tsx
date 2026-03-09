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
        desc="신규 등록, Draft 편집, Released 기준 새 Draft 편집을 하나의 레이아웃으로 처리하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="편집 모드">
          <Field label="현재 흐름">
            <Badge status="production" /> Production 기준 새 Draft 생성 후 편집
          </Field>
          <Field label="현재 리비전">Rev.D Draft · 2026-03-09 14:20 생성</Field>
          <Field label="저장 정책">편집 화면은 저장만 수행 · Release는 상세 화면</Field>
        </WireBlock>
        <WireBlock title="잠금 상태">
          <Field label="상태">읽기 전용 잠금 진입 가능</Field>
          <Field label="잠금 보유자">김설계 · 마지막 활동 14:05</Field>
          <Field label="자동 해제">30분 비활동 시 자동 해제 · 관리자 강제 해제 가능</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="기본 정보">
          <div className="space-y-1.5">
            <FormRow label="품번">
              <MockInput locked value="ENG-V6-001" />
            </FormRow>
            <FormRow label="품명" required><MockInput defaultValue="V6 엔진 ASS'Y" /></FormRow>
            <FormRow label="유형" required>
              <MockSelect options={["조립품", "부품", "원자재"]} />
            </FormRow>
            <FormRow label="카테고리">
              <MockSelect options={["엔진", "차체", "전장"]} />
            </FormRow>
          </div>
          <div className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
            품번은 현재 상태에서 읽기 전용입니다. Released 기준 편집은 기존
            기준본을 수정하지 않고 새 Draft에서만 저장됩니다.
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
            <FormRow label="표면처리">
              <MockInput defaultValue="아노다이징" />
            </FormRow>
            <FormRow label="공차등급">
              <MockInput defaultValue="IT7" />
            </FormRow>
            <FormRow label="사용온도">
              <div className="grid grid-cols-[1fr_1fr_120px] gap-2">
                <MockInput defaultValue="-20 ~ 80" />
                <MockInput defaultValue="도씨" />
                <MockSelect options={["리비전 영향", "일반 메타"]} />
              </div>
            </FormRow>
          </div>
          <div className="mt-2">
            <MockButton>+ 속성 추가</MockButton>
          </div>
          <div className="mt-3 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] text-gray-600">
            커스텀 속성은 현장에서 직접 추가할 수 있습니다. 속성명 중복, 빈
            이름, 빈 값은 저장할 수 없습니다.
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="변경 사유">
          <MockTextarea placeholder="변경 사유를 입력하세요 (Production 이상 필수)" />
          <div className="mt-3 text-[11px] text-gray-500">
            신규 등록에서는 선택 입력입니다. Production 이상 부품의 Draft
            저장에서는 필수입니다.
          </div>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="저장 전 검증">
          <Field label="필수값">품번 · 품명 · 유형</Field>
          <Field label="중복 검사">품번 중복 시 저장 불가</Field>
          <Field label="커스텀 속성">이름 중복 / 빈 값 저장 불가</Field>
        </WireBlock>
        <WireBlock title="상태 피드백">
          <Field label="Loading">기본 정보와 저장 버튼을 비활성 상태로 노출</Field>
          <Field label="Locked">읽기 전용 진입 · 잠금 보유자 표시</Field>
          <Field label="Error">필드 오류 + 상단 오류 배너</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>저장</MockButton>
        <MockButton>취소</MockButton>
      </ButtonGroup>
      <div className="mt-3 text-[11px] text-gray-500">
        Release와 상태 변경은 상세 화면에서 진행합니다. 저장 성공 후에는 같은
        화면에 머무르며 `Draft 저장됨` 토스트를 노출합니다.
      </div>
    </div>
  );
}
