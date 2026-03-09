import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote, Badge } from "@wire";

export default function 변환상태플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 변환 상태"
        desc="원본 파일이 뷰어 산출물로 바뀌는 비동기 처리와 실패 대응 흐름"
      />

      <FlowSection title="비동기 처리" desc="현재 server2 구현의 변환 잡 상태를 그대로 노출한다">
        <FlowRow>
          <FlowStep kind="start" title="등록 또는 재처리">
            <Badge status="design" label="Pending" />
          </FlowStep>
          <FlowArrow label="잡 클레임" />
          <FlowStep kind="system" title="변환 실행">
            <Badge status="prototype" label="Processing" />
          </FlowStep>
          <FlowArrow label="산출물 저장 성공" />
          <FlowStep kind="result" title="뷰어 준비 완료">
            <Badge status="production" label="Completed" />
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="실패 분기" desc="실패 코드는 상세 화면에서 사용자 문구로 번역한다">
        <FlowRow>
          <FlowStep kind="decision" title="변환 실패">
            시간 초과, 미지원 포맷, 변환기 비가용, 일반 실패를 구분한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="실패 코드 노출">
            <Badge status="obsolete" label="Failed" />
          </FlowStep>
          <FlowArrow label="재처리 또는 원본 교체" />
          <FlowStep kind="result" title="다시 Pending">
            사용자는 재처리 이후 같은 상세 화면에서 상태를 다시 확인한다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="예외" desc="MVP는 변환 잡 중복 실행을 막는다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>동일 도면에 활성 잡이 있으면 중복 재처리를 막는다.</FlowNote>
          <FlowNote>2D는 PDF, 3D는 GLB가 준비돼야 뷰어를 연다.</FlowNote>
          <FlowNote>썸네일만 있어도 Completed로 보지 않는다. 주 뷰어 산출물이 필요하다.</FlowNote>
          <FlowNote>변환 실패여도 원본 다운로드는 계속 허용한다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
