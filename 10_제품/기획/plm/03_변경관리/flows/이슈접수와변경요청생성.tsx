import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 이슈접수와변경요청생성() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 이슈 접수와 변경요청 생성"
        desc="부품 중심 이슈를 접수하고 변경요청으로 연결하는 기본 흐름"
      />

      <FlowSection title="기본 흐름" desc="MVP는 부품 상세 진입과 변경관리 메뉴 진입을 둘 다 지원한다">
        <FlowRow>
          <FlowStep kind="start" title="사용자 시작">
            부품 상세 또는 변경관리 메뉴에서 `새 이슈 등록`
          </FlowStep>
          <FlowArrow label="저장" />
          <FlowStep kind="system" title="시스템 생성">
            이슈 번호 발급
            <br />
            `Issue.state = OPEN`
          </FlowStep>
          <FlowArrow label="상세 이동" />
          <FlowStep kind="action" title="이슈 상세">
            연결 부품, 댓글, 첨부파일 확인
          </FlowStep>
          <FlowArrow label="변경요청 생성" />
          <FlowStep kind="result" title="변경요청 초안">
            원본 이슈와 부품을 미리 채운 `DRAFT`
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="분기" desc="작성 시작점에 따라 기본값만 달라지고 생성 규칙은 동일하다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>부품 상세 진입: 연결 부품을 자동 채움</FlowNote>
          <FlowNote>이슈 상세 진입: 원본 이슈 번호와 연결 부품을 자동 채움</FlowNote>
          <FlowNote>변경관리 메뉴 직접 진입: 제목/본문/부품을 사용자가 직접 선택</FlowNote>
          <FlowNote>이슈와 변경요청 번호는 같은 전역 시퀀스를 사용한다</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
