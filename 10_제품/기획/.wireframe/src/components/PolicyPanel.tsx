import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { FeatureInfo } from "../types";

interface Props {
  module: string;
  feature: string;
  info: FeatureInfo;
}

export function PolicyPanel({ module: mod, feature, info }: Props) {
  const [mainPolicy, setMainPolicy] = useState("");
  const [policies, setPolicies] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<string>("main");

  useEffect(() => {
    setActiveTab("main");
    setMainPolicy("");
    setPolicies({});

    if (info.policy) {
      fetch(`/files/${encodeURIComponent(mod)}/${encodeURIComponent(feature)}/정책.md`)
        .then((r) => r.text())
        .then(setMainPolicy);
    }

    for (const p of info.policies) {
      fetch(
        `/files/${encodeURIComponent(mod)}/${encodeURIComponent(feature)}/policies/${encodeURIComponent(p)}`
      )
        .then((r) => r.text())
        .then((text) => setPolicies((prev) => ({ ...prev, [p]: text })));
    }
  }, [mod, feature, info]);

  const tabs = [
    ...(info.policy ? [{ key: "main", label: "정책" }] : []),
    ...info.policies.map((p) => ({
      key: p,
      label: p.replace(/\.md$/, ""),
    })),
  ];

  const content = activeTab === "main" ? mainPolicy : policies[activeTab] || "";

  if (tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        정책 문서가 없습니다
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 탭 */}
      {tabs.length > 1 && (
        <div className="flex border-b border-gray-200 bg-white px-2 pt-2 gap-1 overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-white border border-b-white border-gray-200 text-blue-700 -mb-px"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* 마크다운 렌더링 */}
      <div className="flex-1 overflow-y-auto p-4">
        <article className="prose prose-sm prose-gray max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
