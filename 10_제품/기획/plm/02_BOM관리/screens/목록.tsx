import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="BOM 목록 화면"
        desc="BOM 루트 후보인 조립품을 검색·필터하고 상세 탐색 화면으로 진입하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="검색 / 필터">
          <Field label="기본 범위">자식 BOM이 있는 부품만 표시 (`has_children=true`)</Field>
          <Field label="검색">품번, 품명 통합 검색</Field>
          <Field label="필터">카테고리 · 수명주기 상태 · 프로젝트</Field>
          <Field label="보조 조건">도면 연결 여부</Field>
        </WireBlock>
        <WireBlock title="진입 컨텍스트">
          <Field label="직접 진입">부품 &gt; BOM 관리</Field>
          <Field label="빠른 진입">부품 상세 &gt; 연결 정보 &gt; BOM 하위</Field>
          <Field label="기본 동작">목록은 읽기 전용, 편집 CTA 없음</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="BOM 루트 목록">
          <div className="text-[10px] text-gray-400 mb-2">
            품번 · 품명 · 카테고리 · 상태 · 현재 리비전 · 하위 부품 수 · 도면
          </div>
          <Field>
            <Badge status="production" /> ASSY-1000 · 메인 프레임 ASS&apos;Y · 본체 · Rev.4 · 하위 18건 · 도면 O
          </Field>
          <Field>
            <Badge status="prototype" /> ASSY-2200 · 모터 브라켓 ASS&apos;Y · 구동계 · Rev.2 · 하위 6건 · 도면 O
          </Field>
          <Field>
            <Badge status="design" /> ASSY-3300 · 컨트롤 패널 ASS&apos;Y · 전장 · Rev.1 · 하위 9건 · 도면 X
          </Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="상태 피드백">
          <Field label="Loading">검색 영역 유지 + 테이블 스켈레톤</Field>
          <Field label="Empty">조건에 맞는 BOM 루트가 없습니다</Field>
          <Field label="Error">재시도 버튼과 오류 배너 표시</Field>
        </WireBlock>
        <WireBlock title="액션">
          <ButtonGroup>
            <MockButton primary>BOM 보기</MockButton>
            <MockButton>가져오기 이력</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            목록에서는 BOM 생성, 수정, 삭제를 제공하지 않습니다. 수동 편집은
            후속 범위입니다.
          </div>
        </WireBlock>
      </Row>
    </div>
  );
}
