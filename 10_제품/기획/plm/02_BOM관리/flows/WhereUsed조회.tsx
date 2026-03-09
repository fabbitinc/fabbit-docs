import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function WhereUsed조회플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · Where-Used 조회"
        desc="특정 부품을 기준으로 상위 조립품 체인을 역전개하는 흐름"
      />

      <FlowSection title="역전개 전환" desc="부품 상세 또는 BOM 상세에서 같은 루트로 방향만 바꾼다">
        <FlowRow>
          <FlowStep kind="start" title="사용자">
            단품 또는 하위 부품을 선택한 상태다.
          </FlowStep>
          <FlowArrow label="역전개 클릭" />
          <FlowStep kind="action" title="상세 화면">
            현재 루트는 유지하고 방향을 `REVERSE`로 바꾼다.
          </FlowStep>
          <FlowArrow label="direction=REVERSE" />
          <FlowStep kind="system" title="시스템">
            `/bom/tree`를 다시 호출해 상위 조립품 체인을 조회한다.
          </FlowStep>
          <FlowArrow label="상위 존재?" />
          <FlowStep kind="decision" title="분기">
            상위가 있으면 역전개 트리, 없으면 Where-Used 없음 상태를 보여 준다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="결과">
            사용자가 변경 영향 범위를 상위 제품 기준으로 파악한다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="검증 포인트" desc="역전개는 오류보다 빈 상태를 더 자주 만난다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>역전개 결과 없음은 실패가 아니라 정상 조회 결과다.</FlowNote>
          <FlowNote>잘못된 방향값은 서버에서 `VALIDATION_ERROR`로 차단한다.</FlowNote>
          <FlowNote>사용자가 다른 노드를 새 루트로 열면 그 노드 기준으로 흐름을 다시 시작한다.</FlowNote>
          <FlowNote>Where-Used는 별도 엔티티가 아니라 `REVERSE` 방향의 표현이다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
