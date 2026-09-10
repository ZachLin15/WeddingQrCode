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
  const bodyId = `mickey-ears-body-${uid}`;
  const blurId = `mickey-ears-blur-${uid}`;
  const clipLeftId = `mickey-ears-clip-l-${uid}`;
  const clipRightId = `mickey-ears-clip-r-${uid}`;

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
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#7a4a2b" floodOpacity="0.2" />
        </filter>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id={bodyId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffeef3" />
        </linearGradient>
        <clipPath id={clipLeftId}>
          <circle cx="80" cy="75" r="68" />
        </clipPath>
        <clipPath id={clipRightId}>
          <circle cx="180" cy="75" r="68" />
        </clipPath>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <circle cx="80" cy="75" r="68" fill={`url(#${bodyId})`} />
        <circle cx="180" cy="75" r="68" fill={`url(#${bodyId})`} />
      </g>

      <g clipPath={`url(#${clipLeftId})`} filter={`url(#${blurId})`}>
        <ellipse cx="52" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 52 42)" />
        <ellipse cx="98" cy="118" rx="30" ry="12" fill="#ffffff" opacity="0.35" transform="rotate(-28 98 118)" />
      </g>
      <g clipPath={`url(#${clipRightId})`} filter={`url(#${blurId})`}>
        <ellipse cx="152" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 152 42)" />
        <ellipse cx="198" cy="118" rx="30" ry="12" fill="#ffffff" opacity="0.35" transform="rotate(-28 198 118)" />
      </g>

      <circle cx="80" cy="75" r="67" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1" />
      <circle cx="180" cy="75" r="67" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1" />
    </svg>
  );
}
