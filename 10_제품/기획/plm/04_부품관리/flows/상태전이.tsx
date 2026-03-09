import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote, Badge } from "@wire";

export default function 상태전이플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 상태 전이"
        desc="부품 수명주기 상태를 순방향으로 이동시키는 규칙과 검증 포인트"
      />

      <FlowSection title="순방향 전이" desc="MVP에서는 되돌림 없이 다음 단계로만 이동한다">
        <FlowRow>
          <FlowStep kind="start" title="초기 상태">
            <Badge status="design" label="Design" />
          </FlowStep>
          <FlowArrow label="Released 1+" />
          <FlowStep kind="action" title="시제 단계">
            <Badge status="prototype" label="Prototype" />
          </FlowStep>
          <FlowArrow label="필수 속성 완료" />
          <FlowStep kind="action" title="양산 단계">
            <Badge status="production" label="Production" />
          </FlowStep>
          <FlowArrow label="생산 종료 결정" />
          <FlowStep kind="action" title="단종 예고">
            <Badge status="eol" label="EOL" />
          </FlowStep>
          <FlowArrow label="작업지시 없음" />
          <FlowStep kind="result" title="폐기">
            <Badge status="obsolete" label="Obsolete" />
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="검증 포인트" desc="상태 전이 버튼 노출과 서버 검증이 일치해야 한다">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>Design에서 Production으로 건너뛰는 전이는 허용하지 않는다.</FlowNote>
          <FlowNote>Prototype에서 Production으로 갈 때 필수 속성이 비어 있으면 실패한다.</FlowNote>
          <FlowNote>EOL에서는 신규 작업지시 연결을 막고 대체 부품 정보 입력을 권장한다.</FlowNote>
          <FlowNote>되돌림과 Obsolete 복원은 후속 범위이며 관리자 전용 정책이다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
