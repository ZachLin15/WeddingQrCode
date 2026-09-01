import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

/** Simple two-circle "ears" outline ornament, echoing the wedding decor board's name-frame motif. */
export default function MickeyEars({ className = "", style }: Props) {
  return (
    <svg
      viewBox="0 0 220 110"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="62" cy="55" r="52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="158" cy="55" r="52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
