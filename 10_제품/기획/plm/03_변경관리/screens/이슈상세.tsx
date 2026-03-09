import { ScreenHeader, WireBlock, Field, MockButton, Row, ButtonGroup } from "@wire";

export default function 이슈상세() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="이슈 상세"
        desc="개별 이슈의 본문, 연결 부품, 연결 변경요청, 타임라인을 조회하는 화면"
      />

      <Row cols={2}>
        <WireBlock title="기본 정보">
          <Field label="번호">#241</Field>
          <Field label="상태">OPEN</Field>
          <Field label="제목">조립 공차 이슈로 실린더 헤드 간섭 발생</Field>
          <Field label="작성자">김설계</Field>
          <Field label="담당자">박품질, 생산기술팀</Field>
        </WireBlock>
        <WireBlock title="연결 부품 / 라벨 / 파일">
          <Field label="부품">ENG-2210, ENG-2210-HEAD</Field>
          <Field label="라벨">조립성, 양산, 긴급</Field>
          <Field label="첨부파일">간섭사진-1.png, 측정결과.xlsx</Field>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="연결 변경요청">
          <Field>#247 · DRAFT · 헤드 체결부 두께 보정</Field>
          <Field>#249 · SUBMITTED · 체결 순서 변경 요청</Field>
          <div className="mt-3 text-[11px] text-gray-500">
            다른 미해결 변경요청이 남아 있으면 현재 이슈는 자동 종결되지 않는다.
          </div>
        </WireBlock>
      </Row>

      <Row>
        <WireBlock title="타임라인">
          <Field>03-08 10:12 · activity · issue:part_changed · ENG-2210 연결</Field>
          <Field>03-08 10:40 · comment · 박품질 · 현장 조립 시 2회 재현됨</Field>
          <Field>03-09 14:05 · activity · issue:cr_changed · #249 연결</Field>
        </WireBlock>
      </Row>

      <ButtonGroup>
        <MockButton primary>변경요청 생성</MockButton>
        <MockButton>이슈 수정</MockButton>
        <MockButton>닫기</MockButton>
      </ButtonGroup>
    </div>
  );
}
