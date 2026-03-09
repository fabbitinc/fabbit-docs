import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 리비전상승플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 리비전 상승"
        desc="기존 부품 편집 시 현재 리비전 상태에 따라 같은 Draft를 수정할지 새 Draft를 만들지 결정한다"
      />

      <FlowSection title="분기 시작" desc="상세 화면의 편집 액션은 현재 리비전 상태를 먼저 확인한다">
        <FlowRow>
          <FlowStep kind="start" title="상세 화면에서 편집 클릭">
            사용자는 현재 기준본을 수정하고 싶다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="decision" title="현재 리비전이 Draft인가?">
            Draft와 Released의 처리 방식이 다르다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <div className="grid gap-4 md:grid-cols-2">
        <FlowSection title="Draft인 경우" desc="리비전 상승 없이 같은 작업본을 계속 편집">
          <FlowRow>
            <FlowStep kind="action" title="같은 Draft 편집">
              도면, 속성, 메모를 같은 리비전 안에서 수정한다.
            </FlowStep>
            <FlowArrow />
            <FlowStep kind="result" title="저장">
              리비전 번호는 유지되고 수정 시각만 갱신된다.
            </FlowStep>
          </FlowRow>
        </FlowSection>

        <FlowSection title="Released인 경우" desc="불변 기준본을 건드리지 않고 새 Draft를 만든다">
          <FlowRow>
            <FlowStep kind="system" title="새 Draft 생성">
              기존 Released를 복사한 새 Draft를 1개만 만든다.
            </FlowStep>
            <FlowArrow />
            <FlowStep kind="result" title="새 Draft 편집 화면 진입">
              이후 수정은 새 Draft에서만 허용한다.
            </FlowStep>
          </FlowRow>
        </FlowSection>
      </div>

      <FlowSection title="예외" desc="MVP에서는 모드 A만 지원한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>이미 Draft가 있으면 추가 Draft 생성은 막아야 한다.</FlowNote>
          <FlowNote>변경관리 모드 B 분기는 후속 확장이다.</FlowNote>
          <FlowNote>동시에 두 사용자가 같은 Draft를 편집하면 잠금 정책이 적용된다.</FlowNote>
          <FlowNote>Released 리비전은 직접 수정 API를 제공하지 않는다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
