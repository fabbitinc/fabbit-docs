import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 트리조회플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 트리 조회"
        desc="BOM 목록에서 루트를 선택하고 정전개 트리를 조회하는 기본 흐름"
      />

      <FlowSection title="목록에서 상세로 이동" desc="BOM 루트 후보를 고른 뒤 상세 화면으로 진입한다">
        <FlowRow>
          <FlowStep kind="start" title="사용자">
            BOM 목록에서 검색 조건을 입력한다.
          </FlowStep>
          <FlowArrow label="행 선택" />
          <FlowStep kind="action" title="목록 화면">
            선택한 부품 ID를 상세 화면 라우트로 전달한다.
          </FlowStep>
          <FlowArrow label="병렬 조회" />
          <FlowStep kind="system" title="시스템">
            part 요약, 1-depth BOM, 정전개 트리를 동시에 조회한다.
          </FlowStep>
          <FlowArrow label="하위 존재?" />
          <FlowStep kind="decision" title="분기">
            자식 노드가 있으면 트리를, 없으면 빈 상태를 노출한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="결과">
            사용자가 계층 구조와 수량을 읽는다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="예외 처리" desc="조회 실패와 빈 결과를 명확히 구분한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>존재하지 않는 부품 ID면 not found 오류 상태로 끝난다.</FlowNote>
          <FlowNote>하위 부품이 없으면 오류가 아니라 정상 빈 상태를 보여 준다.</FlowNote>
          <FlowNote>트리 로딩 중에는 루트 요약을 유지해 맥락 손실을 막는다.</FlowNote>
          <FlowNote>수동 편집은 MVP에 없으므로 잠금 분기는 발생하지 않는다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
