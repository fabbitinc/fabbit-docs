import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 병합후연결이슈종결() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 병합 후 연결 이슈 종결"
        desc="변경요청 MERGE 이후 연결된 일반 이슈를 자동으로 닫는 규칙"
      />

      <FlowSection title="자동 종결 흐름" desc="MERGE 이벤트에서만 수행한다">
        <FlowRow>
          <FlowStep kind="start" title="변경요청 MERGED">
            현재 변경요청 상태 전이 완료
          </FlowStep>
          <FlowArrow label="시스템 검사" />
          <FlowStep kind="system" title="연결 이슈 조회">
            현재 변경요청에 연결된 일반 이슈 목록 수집
          </FlowStep>
          <FlowArrow label="미해결 CR?" />
          <FlowStep kind="decision" title="다른 DRAFT/SUBMITTED 존재">
            있으면 이슈 유지
            <br />
            없으면 자동 `CLOSED`
          </FlowStep>
          <FlowArrow label="activity 기록" />
          <FlowStep kind="result" title="이슈 상태 반영">
            `issue:state_changed` 타임라인 추가
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="예외" desc="자동 종결이 실행되지 않는 조건">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>이미 닫힌 이슈는 다시 종결하지 않는다.</FlowNote>
          <FlowNote>현재 변경요청을 `CLOSED` 처리하는 것만으로는 자동 종결하지 않는다.</FlowNote>
          <FlowNote>다른 미해결 변경요청이 1건이라도 있으면 열린 상태를 유지한다.</FlowNote>
          <FlowNote>자동 종결 규칙은 일반 이슈에만 적용한다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
