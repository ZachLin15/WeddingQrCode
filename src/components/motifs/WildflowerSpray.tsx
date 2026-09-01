import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  color?: string;
};

/** A loose spray of tiny blossoms, standing in for the baby's-breath accents on the decor board. */
export default function WildflowerSpray({ className = "", style, color = "#FFCCDE" }: Props) {
  const dots = [
    [20, 70], [30, 55], [42, 62], [16, 40], [34, 30], [50, 40],
    [10, 20], [26, 12], [44, 18], [56, 24],
  ];
  return (
    <svg
      viewBox="0 0 70 90"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M35 88 C 30 60, 25 40, 12 18"
        stroke="#C9B7A8"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3.4 : 2.2} fill={color} />
      ))}
    </svg>
  );
}
