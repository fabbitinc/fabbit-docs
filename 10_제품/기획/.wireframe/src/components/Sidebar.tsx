import { useState } from "react";
import { ChevronRight, ChevronDown, FolderOpen, Folder, FileText } from "lucide-react";
import type { FeatureTree, Selection } from "../types";

interface Props {
  tree: FeatureTree;
  selection: Selection | null;
  onSelect: (sel: Selection) => void;
}

const MODULE_LABELS: Record<string, string> = {
  plm: "PLM",
  mes: "MES",
  site: "Site",
};

/** "04_부품관리" → "부품관리" */
function stripPrefix(name: string) {
  return name.replace(/^\d+_/, "");
}

export function Sidebar({ tree, selection, onSelect }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const mod of Object.keys(tree)) init[mod] = true;
    return init;
  });

  const toggle = (mod: string) =>
    setExpanded((prev) => ({ ...prev, [mod]: !prev[mod] }));

  const modules = Object.keys(tree).sort();

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-200 font-semibold text-sm text-gray-600 tracking-wide uppercase">
        기획 문서
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {modules.map((mod) => {
          const isExpanded = expanded[mod] ?? true;
          const features = Object.keys(tree[mod]).sort();

          return (
            <div key={mod}>
              <button
                onClick={() => toggle(mod)}
                className="flex items-center gap-1.5 w-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                ) : (
                  <Folder className="w-4 h-4 text-amber-500" />
                )}
                {MODULE_LABELS[mod] || mod}
              </button>

              {isExpanded && (
                <div className="ml-4">
                  {features.map((feat) => {
                    const isSelected =
                      selection?.module === mod && selection?.feature === feat;
                    return (
                      <button
                        key={feat}
                        onClick={() => onSelect({ module: mod, feature: feat })}
                        className={`flex items-center gap-1.5 w-full px-3 py-1.5 text-sm transition-colors rounded-md mx-1 ${
                          isSelected
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {stripPrefix(feat)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
