import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";

interface Props {
  module: string;
  feature: string;
  screen: string;
  policies: string[];
}

export function PolicyPanel({ module: mod, feature, screen, policies }: Props) {
  const [contents, setContents] = useState<Record<string, string>>({});

  useEffect(() => {
    setContents({});
    for (const p of policies) {
      fetch(
        `/files/${encodeURIComponent(mod)}/${encodeURIComponent(feature)}/screens/${encodeURIComponent(p)}`
      )
        .then((r) => r.text())
        .then((text) => setContents((prev) => ({ ...prev, [p]: text })));
    }
  }, [mod, feature, screen, policies]);

  if (policies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        상세 정책이 없습니다
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b border-gray-200 bg-white px-4 py-2 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          정책 — {screen}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {policies.map((p, i) => (
          <div key={p}>
            {i > 0 && <hr className="my-4 border-gray-200" />}
            <h3 className="text-xs font-semibold text-purple-600 tracking-wide mb-2">
              {p.replace(/\.md$/, "").replace(/^[^-]+-/, "")}
            </h3>
            <div className="policy-content text-sm text-gray-700 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkFrontmatter]}
              >
                {contents[p] || ""}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
