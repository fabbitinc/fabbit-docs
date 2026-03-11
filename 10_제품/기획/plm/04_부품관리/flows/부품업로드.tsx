import { ScreenHeader, FlowSection, FlowRow, FlowStep, FlowArrow, FlowNote } from "@wire";

export default function 부품업로드플로우() {
  return (
    <div className="p-6 bg-white min-h-full">
      <ScreenHeader
        title="플로우 · 부품 업로드"
        desc="목록에서 업로드를 시작해 매핑 검증과 배치 반영 결과를 확인하는 현재 운영 핵심 흐름"
      />

      <FlowSection title="기본 흐름" desc="매핑 선택부터 배치 완료 확인까지의 기준 절차">
        <FlowRow>
          <FlowStep kind="start" title="목록에서 부품 업로드 클릭">
            목록 상단 액션에서 업로드 다이얼로그를 연다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="매핑 선택">
            최근 생성된 매핑을 기본값으로 고르고 필요 시 다른 버전으로 바꾼다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="파일 추가">
            xlsx, xls, csv 파일을 여러 개 올린다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="system" title="헤더 검증">
            필수 컬럼 누락 여부를 판정하고 추가 컬럼은 경고로만 남긴다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="업로드 실행">
            조건이 충족되면 배치 작업을 시작하고 진행률 화면으로 전환한다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="ROOT BOM 보강" desc="파일만으로 대상을 특정할 수 없을 때 사용자가 직접 연결 대상을 지정한다">
        <FlowRow>
          <FlowStep kind="decision" title="루트 컨텍스트가 필요한가?">
            relation column만 있는 대상 라벨이 있으면 추가 입력이 필요하다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="action" title="파일별 루트 컨텍스트 입력">
            부품, 공급사, 도면, 프로젝트 중 필요한 라벨 값을 지정한다.
          </FlowStep>
          <FlowArrow />
          <FlowStep kind="result" title="모두 적용 또는 개별 저장">
            같은 라벨 값은 다른 완료 파일에 일괄 적용할 수 있다.
          </FlowStep>
        </FlowRow>
      </FlowSection>

      <FlowSection title="예외와 완료" desc="업로드 전 차단 조건과 배치 완료 후 처리">
        <div className="grid gap-3 md:grid-cols-2">
          <FlowNote>매핑이 없거나 조회에 실패하면 속성 분석 화면으로 이동시킨다.</FlowNote>
          <FlowNote>필수 컬럼이 누락된 파일은 실패 상태로 남기고 업로드 대상에서 제외한다.</FlowNote>
          <FlowNote>추가 컬럼은 경고만 표시하며 업로드 자체는 허용한다.</FlowNote>
          <FlowNote>overwrite가 꺼져 있으면 기존 값이 있는 필드는 유지한다.</FlowNote>
          <FlowNote>배치 완료 후에는 목록, 상세, BOM 관련 캐시를 무효화한다.</FlowNote>
          <FlowNote>실패 파일이나 실패 작업이 있으면 성공 대신 경고 토스트를 노출한다.</FlowNote>
        </div>
      </FlowSection>
    </div>
  );
}
