import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  petalColor?: string;
  centerColor?: string;
};

/** Stylized poppy-style flower, matching the pastel florals on the decor board. */
export default function PoppyFlower({
  className = "",
  style,
  petalColor = "#FFB3CC",
  centerColor = "#C79256",
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.95">
        <ellipse cx="50" cy="24" rx="18" ry="22" fill={petalColor} />
        <ellipse cx="50" cy="76" rx="18" ry="22" fill={petalColor} />
        <ellipse cx="24" cy="50" rx="22" ry="18" fill={petalColor} />
        <ellipse cx="76" cy="50" rx="22" ry="18" fill={petalColor} />
        <ellipse cx="32" cy="32" rx="18" ry="15" fill={petalColor} transform="rotate(-45 32 32)" />
        <ellipse cx="68" cy="68" rx="18" ry="15" fill={petalColor} transform="rotate(-45 68 68)" />
        <ellipse cx="68" cy="32" rx="18" ry="15" fill={petalColor} transform="rotate(45 68 32)" />
        <ellipse cx="32" cy="68" rx="18" ry="15" fill={petalColor} transform="rotate(45 32 68)" />
        <circle cx="50" cy="50" r="12" fill={centerColor} />
      </g>
    </svg>
  );
}
