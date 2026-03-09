import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 변경요청상태전이() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 변경요청 상태 전이"
        desc="변경요청의 제출, 반영, 종료, 재개 규칙과 실패 조건"
      />

      <FlowSection title="상태 전이" desc="기본 Issue.state와 crState를 함께 관리한다">
        <FlowRow>
          <FlowStep kind="start" title="초기 생성">
            `OPEN + DRAFT`
          </FlowStep>
          <FlowArrow label="submit" />
          <FlowStep kind="action" title="검토 중">
            `OPEN + SUBMITTED`
          </FlowStep>
          <FlowArrow label="merge" />
          <FlowStep kind="result" title="반영 완료">
            `CLOSED + MERGED`
          </FlowStep>
          <FlowArrow label="edit 불가" />
          <FlowStep kind="decision" title="종료 후 재개?">
            `CLOSED`만 `SUBMITTED`로 복귀 가능
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="대체 종료 흐름" desc="반영 없이 종료하는 경우">
        <FlowRow>
          <FlowStep kind="action" title="DRAFT 또는 SUBMITTED">
            진행 중이지만 중단 결정
          </FlowStep>
          <FlowArrow label="close" />
          <FlowStep kind="result" title="종료">
            `CLOSED + CLOSED`
          </FlowStep>
          <FlowArrow label="reopen" />
          <FlowStep kind="action" title="재개">
            `OPEN + SUBMITTED`
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="검증 포인트" desc="MVP에서는 승인 게이트보다 상태 전이 일관성을 우선한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>`SUBMITTED`에서만 `MERGE` 가능하다.</FlowNote>
          <FlowNote>`MERGED`와 `CLOSED`는 편집 불가다.</FlowNote>
          <FlowNote>리뷰 제출은 개인 검토자만 가능하고 `PENDING` 제출은 실패한다.</FlowNote>
          <FlowNote>MVP에서는 승인 완료 여부가 `MERGE`를 자동 차단하지 않는다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
