import { ScreenHeader, WireBlock, Field, MockButton, Row, ButtonGroup } from "@wire";

export default function 이슈목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="이슈 목록"
        desc="설계, 품질, 생산에서 접수된 변경 이슈를 검색하고 상세 화면으로 진입하는 화면"
      />

      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">제목 부분 일치</Field>
          <Field label="상태">OPEN / CLOSED / 전체</Field>
          <Field label="진입 컨텍스트">부품 상세 진입 시 부품 칩 고정 표시</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="이슈 테이블">
          <div className="text-[10px] text-gray-400 mb-2">
            번호 · 제목 · 상태 · 연결 부품 · 연결 변경요청 수 · 댓글 수 · 최종수정일
          </div>
          <Field>#241 · 조립 공차 이슈 · OPEN · ENG-2210 · 2건 · 4건 · 03-09 14:05</Field>
          <Field>#236 · 도면 치수 누락 · CLOSED · ENG-2198 · 1건 · 2건 · 03-08 18:20</Field>
          <Field>#233 · LOT 불량 원인 조사 · OPEN · ENG-1044 · 0건 · 1건 · 03-08 09:42</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="액션">
          <ButtonGroup>
            <MockButton primary>새 이슈 등록</MockButton>
            <MockButton>새로고침</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            목록에서는 행 선택 후 상세로 이동한다. 대량 닫기, 대량 배정은 후속 범위다.
          </div>
        </WireBlock>
      </Row>
    </div>
  );
}
