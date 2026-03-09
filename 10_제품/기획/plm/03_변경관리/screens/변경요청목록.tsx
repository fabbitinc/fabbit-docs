import { ScreenHeader, WireBlock, Field, MockButton, Row, ButtonGroup } from "@wire";

export default function 변경요청목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="변경요청 목록"
        desc="변경요청의 제출, 반영, 종료 상태와 검토 진행도를 조회하는 화면"
      />

      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">제목 부분 일치</Field>
          <Field label="기본 상태">Issue.state = OPEN / CLOSED</Field>
          <Field label="변경요청 상태">DRAFT / SUBMITTED / MERGED / CLOSED</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="변경요청 테이블">
          <div className="text-[10px] text-gray-400 mb-2">
            번호 · 제목 · crState · 검토 현황 · 연결 이슈 수 · 연결 부품 · 최종수정일
          </div>
          <Field>#249 · 체결 순서 변경 요청 · SUBMITTED · 1 승인 / 1 대기 · 2건 · ENG-2210 · 03-09 14:05</Field>
          <Field>#247 · 헤드 체결부 두께 보정 · DRAFT · 0 승인 / 2 대기 · 1건 · ENG-2210 · 03-09 11:15</Field>
          <Field>#232 · 검사 성적서 양식 정리 · MERGED · 2 승인 / 0 대기 · 1건 · ENG-1044 · 03-07 17:22</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="액션">
          <ButtonGroup>
            <MockButton primary>새 변경요청 등록</MockButton>
            <MockButton>새로고침</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            목록에서는 대량 반영을 제공하지 않는다. 상태 전이는 상세 화면에서만 처리한다.
          </div>
        </WireBlock>
      </Row>
    </div>
  );
}
