import type { ReactNode } from "react";

/** Inline Chinese companion for an English label (same line, e.g. "Cancel 取消"). */
export function Zh({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-zh font-bold tracking-normal normal-case ${className}`}>{children}</span>
  );
}

/** English line with the Chinese translation stacked underneath, both centred. */
export function Bi({
  en,
  zh,
  enClassName = "",
  zhClassName = "text-xs",
  className = "",
}: {
  en: ReactNode;
  zh: ReactNode;
  enClassName?: string;
  zhClassName?: string;
  className?: string;
}) {
  return (
    <span className={`flex flex-col items-center ${className}`}>
      <span className={enClassName}>{en}</span>
      <span className={`font-zh ${zhClassName}`}>{zh}</span>
    </span>
  );
}

/** Messages are "English | 中文"; a message with no "|" (e.g. from the server) shows as-is. */
export function BilingualMessage({
  text,
  enClassName = "font-display text-lg text-ink/80",
  zhClassName = "font-zh text-sm text-ink-soft",
}: {
  text: string;
  enClassName?: string;
  zhClassName?: string;
}) {
  const [en, zh] = text.split(" | ");
  return (
    <div className="flex flex-col items-center gap-1 px-4">
      <p className={enClassName}>{en}</p>
      {zh && <p className={zhClassName}>{zh}</p>}
    </div>
  );
}
