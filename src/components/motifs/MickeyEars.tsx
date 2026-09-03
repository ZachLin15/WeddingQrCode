import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

/**
 * "Half Mickey" ears-only outline with inward-curling flourish tails, matching
 * the name-frame motif from the wedding decor board (page 1 of the design PDF)
 * — two ear circles with no lower head, each trailing a thin calligraphic tail.
 */
export default function MickeyEars({ className = "", style }: Props) {
  return (
    <svg
      viewBox="0 0 260 210"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="80" cy="75" r="68" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="180" cy="75" r="68" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M123 128 C132 150, 130 172, 140 192 C142 197, 137 199, 133 196"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M137 128 C128 150, 130 172, 120 192 C118 197, 123 199, 127 196"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
