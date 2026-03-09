import {
  ScreenHeader,
  WireBlock,
  FormRow,
  MockInput,
  MockSelect,
  MockTextarea,
  MockButton,
  Row,
  Badge,
} from "@wire";

export default function 편집() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="편집 화면"
        desc="신규 등록 · Draft 편집 · Released 기준 새 Draft 편집"
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge status="production" />
          <span className="rounded border border-gray-200 bg-white px-2.5 py-1 text-sm font-mono text-gray-700">
            Rev.D Draft
          </span>
          <span className="text-sm font-mono text-gray-500">ENG-V6-001</span>
        </div>
        <div className="text-sm text-gray-500">마지막 저장 2026-03-09 14:20</div>
      </div>

      <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <div className="text-sm font-semibold text-amber-800">읽기 전용 잠금</div>
        <div className="mt-1 text-sm text-amber-700">
          김설계가 이 Draft를 편집 중입니다. 현재 화면은 읽기 전용으로 표시됩니다.
        </div>
      </div>

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
              <div className="grid grid-cols-[1fr_120px] gap-2">
                <MockInput defaultValue="-20 ~ 80" />
                <MockInput defaultValue="도씨" />
              </div>
            </FormRow>
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-500">변경사항이 저장되지 않았습니다.</div>
        <div className="flex flex-wrap gap-3">
          <span className="inline-block cursor-default rounded border border-gray-200 bg-gray-100 px-4 py-1.5 text-sm text-gray-400">
            저장
          </span>
          <MockButton>취소</MockButton>
        </div>
      </div>
    </div>
  );
}
