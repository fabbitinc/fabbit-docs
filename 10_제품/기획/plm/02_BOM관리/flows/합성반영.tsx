import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 합성반영플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 합성 반영"
        desc="매핑 기반 합성 작업이 BOM 반영 이력과 조회 결과에 연결되는 흐름"
      />

      <FlowSection title="작업 상태 전이" desc="현재 구현의 SynthesisJob 상태를 그대로 사용한다">
        <FlowRow>
          <FlowStep kind="start" title="합성 시작">
            매핑이 확정되고 BOM 반영 배치가 생성된다.
          </FlowStep>
          <FlowArrow label="job 생성" />
          <FlowStep kind="system" title="PENDING">
            작업이 큐에 올라가고 아직 실제 처리는 시작되지 않았다.
          </FlowStep>
          <FlowArrow label="워커 시작" />
          <FlowStep kind="system" title="PROCESSING">
            행 단위 처리와 `BomLink` upsert가 진행된다.
          </FlowStep>
          <FlowArrow label="성공/실패" />
          <FlowStep kind="decision" title="분기">
            모든 행이 처리되면 완료, 중간 오류로 중단되면 실패다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="COMPLETED / FAILED">
            결과가 가져오기 이력 화면과 BOM 조회 결과에 반영된다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="운영 규칙" desc="실시간 이벤트 대신 폴링으로 상태를 추적한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>`PENDING`, `PROCESSING` 작업이 있으면 이력 화면이 10초 간격으로 갱신된다.</FlowNote>
          <FlowNote>`COMPLETED`는 생성 관계 수를 기준으로 반영 성공을 판단한다.</FlowNote>
          <FlowNote>`FAILED`는 오류 메시지를 숨기지 않고 즉시 확인 가능해야 한다.</FlowNote>
          <FlowNote>재시도는 기존 작업 재실행이 아니라 새 합성 작업 생성으로 처리한다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
