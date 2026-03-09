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

  useEffect(() => {
    setComponent(null);
    const key = `../../../${mod}/${feature}/flows/${activeFlow}.tsx`;
    const loader = flowModules[key];
    if (!loader) {
      console.warn("flow not found:", key, "available:", Object.keys(flowModules));
    }
    if (loader) {
      loader().then((m) => setComponent(() => m.default));
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            로딩 중...
          </div>
        )}
      </div>
    </div>
  );
}
