import { useEffect, useState, type ComponentType } from "react";

interface Props {
  module: string;
  feature: string;
  flows: string[];
  activeFlow: string;
  onFlowChange: (flow: string) => void;
}

const flowModules = import.meta.glob<{ default: ComponentType }>(
  "../../../**/flows/*.tsx"
);

export function FlowPanel({ module: mod, feature, flows, activeFlow, onFlowChange }: Props) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setComponent(null);
    setLoadError(null);
    const key = `../../../${mod}/${feature}/flows/${activeFlow}.tsx`;
    const loader = flowModules[key];
    if (!loader) {
      console.warn("flow not found:", key, "available:", Object.keys(flowModules));
      setLoadError(
        "플로우 파일을 찾지 못했습니다. 새 flows/*.tsx 파일을 추가한 직후라면 .wireframe dev 서버를 재시작해 주세요.",
      );
    }
    if (loader) {
      loader()
        .then((m) => setComponent(() => m.default))
        .catch((error) => {
          console.error("flow import failed:", key, error);
          setLoadError("플로우를 불러오지 못했습니다. 파일 문법 오류 또는 dev 서버 상태를 확인해 주세요.");
        });
    }
  }, [mod, feature, activeFlow]);

  return (
    <div className="flex flex-col h-full">
      {flows.length > 1 && (
        <div className="flex items-center border-b border-gray-200 bg-white px-6 shrink-0">
          {flows.map((flow) => (
            <button
              key={flow}
              onClick={() => onFlowChange(flow)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeFlow === flow
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {flow}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {Component ? (
          <Component />
        ) : loadError ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-lg rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
              {loadError}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            로딩 중...
          </div>
        )}
      </div>
    </div>
  );
}
