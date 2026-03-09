import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote, Badge } from "@wire";

export default function 승인배포플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 승인 배포"
        desc="Draft 작성본이 검토, 승인, 배포를 거쳐 현장 기준본이 되는 흐름"
      />

      <FlowSection title="상태 전이" desc="MVP는 명시적인 순방향 전이만 허용한다">
        <FlowRow>
          <FlowStep kind="start" title="작성 중">
            <Badge status="design" label="Draft" />
          </FlowStep>
          <FlowArrow label="검토 요청" />
          <FlowStep kind="action" title="검토 대기">
            <Badge status="prototype" label="In Review" />
          </FlowStep>
          <FlowArrow label="승인" />
          <FlowStep kind="action" title="승인 완료">
            <Badge status="eol" label="Approved" />
          </FlowStep>
          <FlowArrow label="배포" />
          <FlowStep kind="result" title="현장 기준본">
            <Badge status="production" label="Released" />
          </FlowStep>
          <FlowArrow label="대체본 배포" />
          <FlowStep kind="result" title="폐기">
            <Badge status="obsolete" label="Obsolete" />
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="검증 포인트" desc="배포는 승인 상태와 변환 상태를 함께 확인한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>Draft에서 In Review로 갈 때 변환 완료와 필수 메타데이터를 확인한다.</FlowNote>
          <FlowNote>In Review는 설계 리더만 승인 또는 반려할 수 있다.</FlowNote>
          <FlowNote>Approved에서 Released로 갈 때 대표 연결 부품 1건이 반드시 있어야 한다.</FlowNote>
          <FlowNote>Released는 직접 수정하지 않고 새 Draft 등록 후 기존본을 Obsolete로 돌린다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
