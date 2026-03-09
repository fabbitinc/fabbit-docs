import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { WireframePanel } from "./components/WireframePanel";
import { PolicyPanel } from "./components/PolicyPanel";
import { MarkdownView } from "./components/MarkdownView";
import { Monitor, FileText, ScrollText } from "lucide-react";
import type { FeatureTree, Selection, CenterTab } from "./types";

const CENTER_TABS: { key: CenterTab; label: string; icon: typeof Monitor }[] = [
  { key: "wireframe", label: "와이어프레임", icon: Monitor },
  { key: "planning", label: "기획", icon: FileText },
  { key: "policy", label: "정책", icon: ScrollText },
];

export default function App() {
  const [tree, setTree] = useState<FeatureTree>({});
  const [selection, setSelection] = useState<Selection | null>(null);
  const [centerTab, setCenterTab] = useState<CenterTab>("wireframe");
  const [activeScreen, setActiveScreen] = useState<string>("");

  useEffect(() => {
    fetch("/api/tree")
      .then((r) => r.json())
      .then((data: FeatureTree) => {
        setTree(data);
        const firstMod = Object.keys(data)[0];
        if (firstMod) {
          const firstFeat = Object.keys(data[firstMod])[0];
          if (firstFeat) setSelection({ module: firstMod, feature: firstFeat });
        }
      });
  }, []);

  const info = selection ? tree[selection.module]?.[selection.feature] : null;
  const screenNames = info ? Object.keys(info.screens) : [];
  const hasScreens = screenNames.length > 0;

  // 선택된 기능이 바뀌면 탭/화면 초기화
  useEffect(() => {
    if (!info) return;
    if (hasScreens) {
      setCenterTab("wireframe");
      setActiveScreen(screenNames[0]);
    } else if (info.planning) {
      setCenterTab("planning");
    } else if (info.policy) {
      setCenterTab("policy");
    }
  }, [selection]);

  const availableTabs = info
    ? CENTER_TABS.filter((t) => {
        if (t.key === "wireframe") return hasScreens;
        if (t.key === "planning") return info.planning;
        if (t.key === "policy") return info.policy;
        return false;
      })
    : [];

  const currentScreenInfo = info && activeScreen ? info.screens[activeScreen] : null;
  const showRightPanel = centerTab === "wireframe" && currentScreenInfo && currentScreenInfo.policies.length > 0;

  return (
    <div className="flex h-full bg-gray-50 text-gray-900">
      <Sidebar tree={tree} selection={selection} onSelect={setSelection} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 상단 탭 바 */}
        {selection && availableTabs.length > 0 && (
          <div className="flex items-center border-b border-gray-200 bg-white px-4 shrink-0">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = centerTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setCenterTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* 콘텐츠 영역 */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* 가운데 패널 */}
          <div className={`flex-1 min-w-0 overflow-hidden ${showRightPanel ? "border-r border-gray-200" : ""}`}>
            {!selection ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                기능을 선택하세요
              </div>
            ) : centerTab === "wireframe" && hasScreens ? (
              <WireframePanel
                module={selection.module}
                feature={selection.feature}
                screens={screenNames}
                activeScreen={activeScreen}
                onScreenChange={setActiveScreen}
              />
            ) : centerTab === "planning" && info?.planning ? (
              <MarkdownView
                url={`/files/${encodeURIComponent(selection.module)}/${encodeURIComponent(selection.feature)}/기획.md`}
              />
            ) : centerTab === "policy" && info?.policy ? (
              <MarkdownView
                url={`/files/${encodeURIComponent(selection.module)}/${encodeURIComponent(selection.feature)}/정책.md`}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                문서가 없습니다
              </div>
            )}
          </div>

          {/* 오른쪽: 화면별 정책 (와이어프레임 탭일 때만) */}
          {showRightPanel && selection && currentScreenInfo && (
            <div className="w-[420px] shrink-0 h-full overflow-hidden">
              <PolicyPanel
                module={selection.module}
                feature={selection.feature}
                screen={activeScreen}
                policies={currentScreenInfo.policies}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
