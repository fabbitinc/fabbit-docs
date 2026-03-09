import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader title="목록 화면" desc="전체 부품을 검색·필터하고 관리 진입점을 제공하는 화면" />

      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">품번, 품명 통합 검색</Field>
          <Field label="필터">상태 · 유형 · 카테고리</Field>
          <Field label="정렬">최근 수정순 (기본)</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="부품 목록 테이블">
          <div className="text-[10px] text-gray-400 mb-2">□ · 품번 · 품명 · 유형 · 상태 · 현재 리비전 · 최종수정일 · 수정자</div>
          <Field><Badge status="design" /> ENG-V6-001 · V6 엔진 ASS'Y · 조립품 · Rev.C · 03-07</Field>
          <Field><Badge status="production" /> ENG-V6-002 · 실린더 블록 · 가공품 · Rev.B · 03-05</Field>
          <Field><Badge status="obsolete" /> ENG-V4-001 · V4 엔진 ASS'Y · 조립품 · Rev.A · 02-10</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="액션">
          <ButtonGroup>
            <MockButton primary>새 부품 등록</MockButton>
            <MockButton>내보내기</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            일괄 상태 변경은 후속 확장 범위로 분리한다.
          </div>
        </WireBlock>
      </Row>
    </div>
  );
}
