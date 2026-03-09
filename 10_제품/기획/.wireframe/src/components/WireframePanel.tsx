import { useEffect, useState, type ComponentType } from "react";

interface Props {
  module: string;
  feature: string;
  screens: string[];
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

// 기획 폴더 하위의 모든 screens TSX를 glob으로 가져옴
const wireframeModules = import.meta.glob<{ default: ComponentType }>(
  "../../../**/screens/*.tsx"
);

export function WireframePanel({ module: mod, feature, screens, activeScreen, onScreenChange }: Props) {
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    setComponent(null);
    const key = `../../../${mod}/${feature}/screens/${activeScreen}.tsx`;
    const loader = wireframeModules[key];
    if (!loader) {
      console.warn("wireframe not found:", key, "available:", Object.keys(wireframeModules));
    }
    if (loader) {
      loader().then((m) => setComponent(() => m.default));
    }
  }, [mod, feature, activeScreen]);

  return (
    <div className="flex flex-col h-full">
      {/* 화면 탭 */}
      {screens.length > 1 && (
        <div className="flex items-center border-b border-gray-200 bg-white px-6 shrink-0">
          {screens.map((screen) => (
            <button
              key={screen}
              onClick={() => onScreenChange(screen)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeScreen === screen
                  ? "border-purple-600 text-purple-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {screen}
            </button>
          ))}
        </div>
      )}

      {/* 와이어프레임 컴포넌트 */}
      <div className="flex-1 overflow-y-auto p-5">
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
