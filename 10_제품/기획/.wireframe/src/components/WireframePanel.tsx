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
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setComponent(null);
    setLoadError(null);
    const key = `../../../${mod}/${feature}/screens/${activeScreen}.tsx`;
    const loader = wireframeModules[key];
    if (!loader) {
      console.warn("wireframe not found:", key, "available:", Object.keys(wireframeModules));
      setLoadError(
        "와이어프레임 파일을 찾지 못했습니다. 새 screens/*.tsx 파일을 추가한 직후라면 .wireframe dev 서버를 재시작해 주세요.",
      );
    }
    if (loader) {
      loader()
        .then((m) => setComponent(() => m.default))
        .catch((error) => {
          console.error("wireframe import failed:", key, error);
          setLoadError("와이어프레임을 불러오지 못했습니다. 파일 문법 오류 또는 dev 서버 상태를 확인해 주세요.");
        });
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
