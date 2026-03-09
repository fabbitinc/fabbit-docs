import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote, Badge } from "@wire";

export default function 신규부품등록플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 신규 부품 등록"
        desc="목록 화면에서 새 부품을 만들고 Draft 리비전까지 생성하는 기본 흐름"
      />

      <FlowSection title="기본 흐름" desc="설계 엔지니어와 시스템이 함께 만드는 MVP 핵심 시나리오">
        <FlowRow>
          <FlowStep kind="start" title="새 부품 등록 클릭">
            목록 화면에서 생성 플로우를 시작한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="기본 정보 입력">
            품번, 품명, 유형, 카테고리를 입력한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="system" title="Item + Draft 리비전 생성">
            상태는 <Badge status="design" label="Design" /> 으로 시작하고 Rev.A
            Draft를 함께 만든다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="상세 편집으로 진입">
            도면 업로드와 속성 입력을 이어서 진행한다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="저장 전 검증" desc="MVP에서 프론트와 백엔드가 동일하게 맞춰야 하는 제약">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>품번이 중복되면 저장할 수 없다.</FlowNote>
          <FlowNote>필수 입력값이 비어 있으면 저장 버튼을 비활성화하거나 오류를 표시한다.</FlowNote>
          <FlowNote>생성 성공 시 목록 재조회보다 상세 화면 진입을 우선한다.</FlowNote>
          <FlowNote>초기 생성 단계에서는 변경관리 연동 모드를 고려하지 않는다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
