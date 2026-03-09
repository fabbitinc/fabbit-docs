import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 신규도면등록플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 신규 도면 등록"
        desc="파일 선택부터 비동기 변환 완료까지 사용자가 체감하는 등록 흐름"
      />

      <FlowSection title="등록 시작" desc="MVP는 업로드 완료 파일을 선택해 도면으로 등록한다">
        <FlowRow>
          <FlowStep kind="start" title="새 도면 등록 클릭">
            설계 엔지니어가 도면 메뉴에서 신규 등록을 시작한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="메타데이터 입력">
            도면번호, 도면명, 버전, 대표 연결 부품, 원본 파일을 입력한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="system" title="Drawing 생성">
            상태는 Draft, 변환 상태는 Pending으로 생성한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="상세 화면 이동">
            사용자는 Processing 배지를 보며 결과를 기다린다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="예외" desc="등록 직후 실패하는 조건을 먼저 차단한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>업로드가 완료되지 않은 파일은 등록할 수 없다.</FlowNote>
          <FlowNote>지원하지 않는 확장자는 저장 전에 차단한다.</FlowNote>
          <FlowNote>도면번호가 중복이면 Draft를 만들지 않는다.</FlowNote>
          <FlowNote>대표 연결 부품은 초기 저장에서 비어 있어도 되지만 Release 전에는 필수다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}

