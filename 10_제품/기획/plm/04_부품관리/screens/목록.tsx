import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader title="목록 화면" desc="전체 부품을 검색·필터하고 관리 진입점을 제공하는 화면" />

      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">품번, 품명 통합 검색</Field>
          <Field label="필터">카테고리 · 상태 · 도면 유무 · 하위 부품 유무</Field>
          <Field label="추가 기획">유형 필터 🔴 (미개발)</Field>
          <Field label="적용 상태">필터 칩 노출 · 검색 버튼 또는 Enter로 적용</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="부품 목록 테이블">
          <div className="mb-3 text-xs text-gray-400">□ · 품번 · 품명 · 카테고리 · Rev · 상태 · 도면 · 하위 부품</div>
          <Field><Badge status="design" /> ENG-V6-001 · V6 엔진 ASS'Y · 엔진 · C · 문서 있음 · 47건</Field>
          <Field><Badge status="production" /> ENG-V6-002 · 실린더 블록 · 엔진 · B · 문서 있음 · 0건</Field>
          <Field><Badge status="obsolete" /> ENG-V4-001 · V4 엔진 ASS'Y · 엔진 · A · 문서 없음 · 12건</Field>
          <Field label="페이지">15 / 30 / 50개씩</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="상단 액션">
          <ButtonGroup>
            <MockButton>속성 분석</MockButton>
            <MockButton>부품 업로드</MockButton>
            <MockButton primary>새 부품 🔴 (미개발)</MockButton>
          </ButtonGroup>
        </WireBlock>
        <WireBlock title="선택 액션">
          <Field label="선택 상태">선택 3건</Field>
          <ButtonGroup>
            <MockButton>프로젝트 연결</MockButton>
            <MockButton>선택 내려받기</MockButton>
            <MockButton>전체 내려받기</MockButton>
            <MockButton>검색 결과 내려받기</MockButton>
          </ButtonGroup>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="후속 기획">
          <ButtonGroup>
            <MockButton>유형 컬럼 🔴 (미개발)</MockButton>
            <MockButton>최종수정일 🔴 (미개발)</MockButton>
            <MockButton>수정자 🔴 (미개발)</MockButton>
          </ButtonGroup>
        </WireBlock>
      </Row>
    </div>
  );
}
