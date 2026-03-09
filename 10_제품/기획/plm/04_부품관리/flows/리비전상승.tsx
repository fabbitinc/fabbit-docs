import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 리비전상승플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 리비전 상승"
        desc="기존 부품 편집 시 Draft 재사용, 새 Draft 생성, 잠금, 저장 예외를 함께 다룬다"
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
            <FlowStep kind="action" title="잠금 확인 후 같은 Draft 편집">
              도면, 속성, 메모를 같은 리비전 안에서 수정한다.
            </FlowStep>
            <FlowArrow />
            <FlowStep kind="result" title="저장">
              리비전 번호는 유지되고 수정 시각만 갱신된다. Release는 상세
              화면에서 별도 수행한다.
            </FlowStep>
          </FlowRow>
        </FlowSection>

        <FlowSection title="Released인 경우" desc="불변 기준본을 건드리지 않고 새 Draft를 만든다">
          <FlowRow>
            <FlowStep kind="decision" title="이미 Draft가 있는가?">
              기존 Draft가 있으면 재사용하고, 없으면 새 Draft를 만든다.
            </FlowStep>
            <FlowArrow />
            <FlowStep kind="system" title="Draft 확보">
              기존 Released를 복사한 새 Draft를 1개만 유지한다.
            </FlowStep>
            <FlowArrow />
            <FlowStep kind="result" title="새 Draft 편집 화면 진입">
              이후 수정은 새 Draft에서만 허용하고 저장은 Draft만 갱신한다.
            </FlowStep>
          </FlowRow>
        </FlowSection>
      </div>

      <FlowSection title="예외" desc="MVP에서는 모드 A만 지원한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>이미 Draft가 있으면 추가 Draft 생성은 막고 기존 Draft로 이동한다.</FlowNote>
          <FlowNote>변경관리 모드 B 분기는 후속 확장이다.</FlowNote>
          <FlowNote>다른 사용자가 잠금을 보유하면 편집 화면은 읽기 전용으로 진입한다.</FlowNote>
          <FlowNote>Released 리비전은 직접 수정 API를 제공하지 않는다.</FlowNote>
          <FlowNote>Production 이상 부품은 변경 사유가 비어 있으면 Draft 저장에 실패한다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
