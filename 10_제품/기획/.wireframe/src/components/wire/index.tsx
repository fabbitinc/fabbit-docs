import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/* ── 화면 헤더 ── */
export function ScreenHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-6">
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

/* ── 와이어프레임 블록 ── */
export function WireBlock({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 p-5 ${className}`}>
      <h4 className="mb-3 text-sm font-bold text-purple-600">{title}</h4>
      {children}
    </div>
  );
}

/* ── 필드 (읽기 전용 key:value) ── */
export function Field({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="text-sm font-mono leading-7">
      {label && <span className="text-gray-400">{label}: </span>}
      {children}
    </div>
  );
}

/* ── 상태 배지 ── */
const BADGE_COLORS: Record<string, string> = {
  design: "bg-blue-100 text-blue-700",
  prototype: "bg-green-100 text-green-700",
  production: "bg-orange-100 text-orange-700",
  eol: "bg-amber-100 text-amber-700",
  obsolete: "bg-red-100 text-red-700",
};

export function Badge({ status, label }: { status: string; label?: string }) {
  const color = BADGE_COLORS[status.toLowerCase()] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${color}`}>
      {label || status}
    </span>
  );
}

/* ── 버튼 ── */
export function MockButton({ primary, children }: { primary?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-block cursor-default rounded px-4 py-1.5 text-sm ${
        primary
          ? "bg-purple-600 text-white"
          : "border border-gray-200 text-gray-600"
      }`}
    >
      {children}
    </span>
  );
}

/* ── 폼 행 ── */
export function FormRow({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[112px_1fr] items-center gap-3 text-sm">
      <span className="text-right font-mono text-gray-400">
        {label}{required && " *"}
      </span>
      {children}
    </div>
  );
}

/* ── 입력 필드 ── */
type InputProps = InputHTMLAttributes<HTMLInputElement> & { locked?: boolean };
export function MockInput({ locked, className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded border border-gray-200 px-3 py-2 text-sm font-mono ${
        locked ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700"
      } ${className}`}
      readOnly={locked}
      {...props}
    />
  );
}

/* ── 셀렉트 ── */
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { options: string[] };
export function MockSelect({ options, className = "", ...props }: SelectProps) {
  return (
    <select className={`w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm font-mono ${className}`} {...props}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

/* ── 텍스트에어리어 ── */
export function MockTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="min-h-[80px] w-full resize-y rounded border border-gray-200 px-3 py-2 text-sm font-mono"
      {...props}
    />
  );
}

/* ── 레이아웃: 행 ── */
export function Row({ cols = 1, children, className = "" }: { cols?: 1 | 2 | 3; children: ReactNode; className?: string }) {
  const grid = cols === 1 ? "" : cols === 2 ? "grid-cols-2" : "grid-cols-3";
  return <div className={`mb-5 grid gap-5 last:mb-0 ${grid} ${className}`}>{children}</div>;
}

/* ── 버튼 그룹 ── */
export function ButtonGroup({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-wrap gap-3">{children}</div>;
}

/* ── 플로우 섹션 ── */
export function FlowSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 rounded-lg border border-gray-200 p-5 last:mb-0">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-emerald-700">{title}</h4>
        {desc && <p className="mt-1.5 text-sm text-gray-500">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

/* ── 플로우 행 ── */
export function FlowRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-stretch gap-4 ${className}`}>{children}</div>;
}

/* ── 플로우 단계 ── */
const FLOW_STEP_COLORS: Record<string, string> = {
  start: "border-blue-200 bg-blue-50",
  action: "border-gray-200 bg-white",
  decision: "border-amber-200 bg-amber-50",
  system: "border-violet-200 bg-violet-50",
  result: "border-emerald-200 bg-emerald-50",
};

export function FlowStep({
  title,
  kind = "action",
  children,
  className = "",
}: {
  title: string;
  kind?: "start" | "action" | "decision" | "system" | "result";
  children?: ReactNode;
  className?: string;
}) {
  const color = FLOW_STEP_COLORS[kind] || FLOW_STEP_COLORS.action;
  return (
    <div className={`min-w-[196px] flex-1 rounded-lg border px-4 py-4 ${color} ${className}`}>
      <div className="text-sm font-semibold text-gray-700">{title}</div>
      {children && <div className="mt-2.5 text-sm leading-6 text-gray-600">{children}</div>}
    </div>
  );
}

/* ── 플로우 연결 ── */
export function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex min-w-12 items-center justify-center text-xs font-semibold text-gray-400">
      {label ? `-${label}->` : "->"}
    </div>
  );
}

/* ── 플로우 메모 ── */
export function FlowNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
      {children}
    </div>
  );
}
