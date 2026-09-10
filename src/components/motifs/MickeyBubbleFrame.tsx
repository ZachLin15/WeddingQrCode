"use client";

import { useId, type CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

// Two ears + head, boolean-unioned via circle-intersection geometry into one
// seamless outline (same technique as the earlier Mickey silhouette work).
const MICKEY_D =
  "M 47.35 123.03 A 60 60 0 1 1 124.82 54.16 A 84 84 0 0 1 135.18 54.16 A 60 60 0 1 1 212.65 123.03 A 84 84 0 1 1 47.35 123.03 Z";

/**
 * Very pale, translucent "soap bubble" Mickey silhouette with an iridescent
 * rim, meant to sit behind the couple's names like a faint watermark frame.
 */
export default function MickeyBubbleFrame({ className = "", style }: Props) {
  const uid = useId();
  const rimId = `bubble-rim-${uid}`;
  const fillId = `bubble-fill-${uid}`;
  const blurId = `bubble-blur-${uid}`;
  const clipId = `bubble-clip-${uid}`;

  return (
    <svg
      viewBox="0 0 260 230"
      preserveAspectRatio="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={rimId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffc4e0" />
          <stop offset="25%" stopColor="#c9e4ff" />
          <stop offset="50%" stopColor="#fff6c4" />
          <stop offset="75%" stopColor="#d6c9ff" />
          <stop offset="100%" stopColor="#c4ffe8" />
        </linearGradient>
        <radialGradient id={fillId} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </radialGradient>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id={clipId}>
          <path d={MICKEY_D} />
        </clipPath>
      </defs>

      <path d={MICKEY_D} fill={`url(#${fillId})`} />

      <g clipPath={`url(#${clipId})`} filter={`url(#${blurId})`}>
        <ellipse cx="60" cy="45" rx="40" ry="18" fill="#ffffff" opacity="0.6" transform="rotate(-25 60 45)" />
      </g>

      <path d={MICKEY_D} fill="none" stroke={`url(#${rimId})`} strokeOpacity="0.65" strokeWidth="2" />
    </svg>
  );
}
