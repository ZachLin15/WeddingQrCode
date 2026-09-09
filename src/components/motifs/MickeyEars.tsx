"use client";

import { useId, type CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Glossy white "half Mickey" ears bubble frame for the couple's names,
 * matching the printed table-card template.
 */
export default function MickeyEars({ className = "", style }: Props) {
  const uid = useId();
  const shadowId = `mickey-ears-shadow-${uid}`;
  const shineId = `mickey-ears-shine-${uid}`;

  return (
    <svg
      viewBox="0 0 260 210"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#7a4a2b" floodOpacity="0.18" />
        </filter>
        <radialGradient id={shineId} cx="35%" cy="26%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g filter={`url(#${shadowId})`}>
        <circle cx="80" cy="75" r="68" fill="#ffffff" />
        <circle cx="180" cy="75" r="68" fill="#ffffff" />
      </g>
      <circle cx="80" cy="75" r="68" fill={`url(#${shineId})`} />
      <circle cx="180" cy="75" r="68" fill={`url(#${shineId})`} />
    </svg>
  );
}
