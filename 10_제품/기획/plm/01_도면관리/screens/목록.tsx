import { ScreenHeader, WireBlock, Field, Badge, MockButton, Row, ButtonGroup } from "@wire";

export default function 목록() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="목록 화면"
        desc="도면번호, 상태, 변환 상태, 대표 연결 부품을 기준으로 최신 도면을 찾는 화면"
      />

      <Row>
        <WireBlock title="검색 / 필터">
          <Field label="검색">도면번호, 도면명, 부품번호 통합 검색</Field>
          <Field label="상태">Draft · In Review · Approved · Released · Obsolete</Field>
          <Field label="변환">Pending · Processing · Completed · Failed</Field>
          <Field label="유형">2D / 3D · CAD / PDF / 이미지</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="도면 목록 테이블">
          <div className="mb-2 text-[10px] text-gray-400">
            도면번호 · 도면명 · 버전 · 상태 · 변환 · 대표 부품 · 뷰어 · 최종수정일
          </div>
          <Field>
            D-ENG-001 · 엔진 블록 가공도 · Rev.A · <Badge status="design" label="Draft" />
            &nbsp; <Badge status="prototype" label="Processing" /> · ENG-BLK-001 · PDF
          </Field>
          <Field>
            D-ENG-002 · 실린더 헤드 조립도 · Rev.B · <Badge status="production" label="Released" />
            &nbsp; <Badge status="production" label="Completed" /> · ENG-HEAD-002 · PDF
          </Field>
          <Field>
            D-JIG-003 · 지그 조립 3D · Rev.C · <Badge status="prototype" label="In Review" />
            &nbsp; <Badge status="obsolete" label="Failed" /> · JIG-ASM-003 · GLB
          </Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="액션">
          <ButtonGroup>
            <MockButton primary>새 도면 등록</MockButton>
            <MockButton>상세 보기</MockButton>
          </ButtonGroup>
          <div className="mt-3 text-[11px] text-gray-500">
            대량 업로드와 일괄 배포는 후속 범위다. 목록에서는 실패 배지와 대표
            부품 연결 여부를 먼저 보여 준다.
          </div>
        </WireBlock>
      </Row>
    </div>
  );
}
