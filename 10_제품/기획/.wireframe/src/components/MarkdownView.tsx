import { useEffect, useState, useRef, useCallback, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import type { Components } from "react-markdown";

interface Props {
  url: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function MarkdownView({ url }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        setContent(text);
        // 마크다운에서 헤딩 추출
        const headings: TocItem[] = [];
        for (const line of text.split("\n")) {
          const match = line.match(/^(#{1,4})\s+(.+)$/);
          if (match) {
            const text = match[2].trim();
            const id = text
              .toLowerCase()
              .replace(/[^\w가-힣\s-]/g, "")
              .replace(/\s+/g, "-");
            headings.push({ id, text, level: match[1].length });
          }
        }
        setToc(headings);
        setLoading(false);
      });
  }, [url]);

  // 스크롤 시 활성 헤딩 추적
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h1, h2, h3, h4");
    let current = "";
    for (const el of headings) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100) current = el.id;
    }
    setActiveId(current);
  }, []);

  // 헤딩 클릭 시 스크롤
  const scrollTo = (id: string) => {
    const el = contentRef.current?.querySelector(`#${CSS.escape(id)}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 헤딩에 id를 부여하는 커스텀 컴포넌트
  const components: Components = {
    h1: ({ children }) => <h1 id={headingId(children)}>{children}</h1>,
    h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
    h4: ({ children }) => <h4 id={headingId(children)}>{children}</h4>,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* 본문 */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-8"
      >
        <article className="prose prose-gray max-w-4xl mx-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkFrontmatter]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>

      {/* 목차 */}
      {toc.length > 0 && (
        <nav className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto py-4 px-3 bg-white">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
            목차
          </div>
          <ul className="space-y-0.5">
            {toc.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left text-xs py-1 px-2 rounded transition-colors truncate ${
                    activeId === item.id
                      ? "text-blue-700 bg-blue-50 font-medium"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function headingId(children: ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}
