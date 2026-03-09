import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 상세() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="BOM 상세 화면"
        desc="선택한 부품을 루트로 정전개·역전개 트리를 탐색하고 직접 관계를 확인하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="루트 부품 요약">
          <Field label="품번">ASSY-1000</Field>
          <Field label="품명">메인 프레임 ASS&apos;Y</Field>
          <Field label="상태"><Badge status="production" /></Field>
          <Field label="현재 리비전">Rev.4</Field>
          <Field label="카테고리">본체</Field>
        </WireBlock>
        <WireBlock title="직접 관계 요약">
          <Field label="직접 자식">18건 · 직접 관계 API 기준 1-depth 요약</Field>
          <Field label="직접 부모">2건 · Where-Used 빠른 진입</Field>
          <Field label="트리 노드 수">총 47개</Field>
          <Field label="조회 방향">정전개 기본, 역전개 전환 가능</Field>
        </WireBlock>
      </Row>

      <Row cols={2}>
        <WireBlock title="조회 방향 / 액션">
          <ButtonGroup>
            <MockButton primary>정전개</MockButton>
            <MockButton>역전개</MockButton>
            <MockButton>엑셀 내보내기</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            방향 전환 시 루트는 유지하고 트리만 다시 조회합니다. 내보내기는
            현재 루트와 현재 방향을 그대로 사용합니다.
          </div>
        </WireBlock>
        <WireBlock title="상태 안내">
          <Field label="읽기 전용">MVP에서는 탐색과 내보내기만 지원</Field>
          <Field label="빈 상태">하위 또는 상위 관계가 없으면 빈 트리 표시</Field>
          <Field label="오류 상태">잘못된 방향값, 권한 오류, 네트워크 오류</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="트리 뷰">
          <div className="space-y-1.5 text-xs font-mono leading-relaxed">
            <div>Lv0 ASSY-1000 · 메인 프레임 ASS&apos;Y · Rev.4 · Qty 1 · Production</div>
            <div className="pl-4">└ Lv1 PRT-2100 · 브라켓 · Rev.2 · Qty 2 · Production</div>
            <div className="pl-8">└ Lv2 PRT-2101 · 볼트 M8 · Rev.7 · Qty 8 · Production</div>
            <div className="pl-4">└ Lv1 PRT-2200 · 샤프트 · Rev.3 · Qty 1 · Prototype</div>
            <div className="pl-8">└ Lv2 PRT-2201 · 베어링 · Rev.1 · Qty 2 · Design</div>
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="보조 액션">
          <ButtonGroup>
            <MockButton primary>선택 노드 기준 새 루트 열기</MockButton>
            <MockButton>부품 상세로 이동</MockButton>
          </ButtonGroup>
        </WireBlock>
      </Row>
    </div>
  );
}
