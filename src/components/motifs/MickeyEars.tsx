"use client";

import { useId, type CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

// One continuous outline (2 ear circles + 1 head circle, boolean-unioned via
// precise circle-intersection geometry) so the silhouette has no seams where
// the shapes overlap — reads as a single Mickey head, not two crossed circles.
const MICKEY_SILHOUETTE_D =
  "M 47.35 123.03 A 60 60 0 1 1 124.82 54.16 A 84 84 0 0 1 135.18 54.16 A 60 60 0 1 1 212.65 123.03 A 84 84 0 1 1 47.35 123.03 Z";

/**
 * Glossy white unified Mickey-head silhouette frame for the couple's names,
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
      viewBox="0 0 260 230"
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
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffeef3" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={MICKEY_SILHOUETTE_D} />
        </clipPath>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <path d={MICKEY_SILHOUETTE_D} fill={`url(#${bodyId})`} />
      </g>

      <g clipPath={`url(#${clipId})`} filter={`url(#${blurId})`}>
        <ellipse cx="52" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 52 42)" />
        <ellipse cx="152" cy="42" rx="36" ry="17" fill="#ffffff" opacity="0.95" transform="rotate(-28 152 42)" />
        <ellipse cx="130" cy="150" rx="55" ry="20" fill="#ffffff" opacity="0.3" transform="rotate(-10 130 150)" />
      </g>

      <path d={MICKEY_SILHOUETTE_D} fill="none" stroke="#d9a66c" strokeOpacity="0.55" strokeWidth="2" />
    </svg>
  );
}
