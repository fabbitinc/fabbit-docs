import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { WireframePanel } from "./components/WireframePanel";
import { PolicyPanel } from "./components/PolicyPanel";
import type { FeatureTree, Selection } from "./types";

export default function App() {
  const [tree, setTree] = useState<FeatureTree>({});
  const [selection, setSelection] = useState<Selection | null>(null);

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

  return (
    <div className="flex h-full bg-gray-50 text-gray-900">
      <Sidebar tree={tree} selection={selection} onSelect={setSelection} />

      <div className="flex flex-1 min-w-0 overflow-hidden">
        <div className="flex-1 min-w-0 border-r border-gray-200">
          {selection && info?.wireframe ? (
            <WireframePanel module={selection.module} feature={selection.feature} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              {selection ? "와이어프레임이 없습니다" : "기능을 선택하세요"}
            </div>
          )}
        </div>

        <div className="w-[420px] shrink-0 h-full overflow-hidden">
          {selection && info ? (
            <PolicyPanel module={selection.module} feature={selection.feature} info={info} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
