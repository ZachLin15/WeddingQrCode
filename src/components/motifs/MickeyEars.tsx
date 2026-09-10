"use client";

import { useId, type CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

// Two ear circles boolean-unioned (via circle-intersection geometry) into one
// seamless blob, matching the ears-with-a-valley shape from the decor board —
// no separate round head, which was an over-correction in an earlier pass.
const EARS_D = "M 130.00 121.09 A 68 68 0 1 1 130.00 28.91 A 68 68 0 1 1 130.00 121.09 Z";
const TAIL_LEFT_D = "M123 121 C132 143, 130 165, 140 185 C142 190, 137 192, 133 189";
const TAIL_RIGHT_D = "M137 121 C128 143, 130 165, 120 185 C118 190, 123 192, 127 189";

/**
 * Glossy white "half Mickey" ears bubble with curling flourish tails,
 * matching the printed table-card template.
 */
export default function MickeyEars({ className = "", style }: Props) {
  const uid = useId();
  const shadowId = `mickey-shadow-${uid}`;
  const bodyId = `mickey-body-${uid}`;
  const blurId = `mickey-blur-${uid}`;
  const clipId = `mickey-clip-${uid}`;

  return (
    <svg
      viewBox="0 0 260 200"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#7a4a2b" floodOpacity="0.2" />
        </filter>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffeef3" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={EARS_D} />
        </clipPath>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <path d={EARS_D} fill={`url(#${bodyId})`} />
        <path
          d={TAIL_LEFT_D}
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d={TAIL_RIGHT_D}
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>

      <g clipPath={`url(#${clipId})`} filter={`url(#${blurId})`}>
        <ellipse cx="52" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 52 42)" />
        <ellipse cx="152" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 152 42)" />
      </g>

      <path d={EARS_D} fill="none" stroke="#d9a66c" strokeOpacity="0.55" strokeWidth="2" />
      <path d={TAIL_LEFT_D} fill="none" stroke="#d9a66c" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
      <path d={TAIL_RIGHT_D} fill="none" stroke="#d9a66c" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
