"use client";

import { useState } from "react";
import Link from "next/link";
import GuestHeader from "./GuestHeader";
import TableBadge from "./TableBadge";
import CameraCapture, { type Stage } from "./CameraCapture";
import GuestPageBackground from "./GuestPageBackground";

export default function TableExperience({ table }: { table: number }) {
  const [stage, setStage] = useState<Stage>("idle");

  return (
    <GuestPageBackground>
      <div className="relative mx-auto flex h-[calc(100dvh-6px)] w-full max-w-md flex-col items-center justify-between gap-3 overflow-hidden px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        {/* The bubble header only shows on the idle screen; the camera/preview
            screens need the room, so the page never has to scroll. */}
        {stage === "idle" && <GuestHeader />}
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-3">
          {stage !== "done" && <TableBadge table={table} />}
          <CameraCapture table={table} onStageChange={setStage} />
        </div>

        {stage !== "done" && (
          <Link
            href={`/t/${table}/album`}
            className="inline-flex items-center gap-2 rounded-full border border-pink-light/60 bg-white/70 px-5 py-2 font-sans text-[11px] tracking-[0.25em] text-pink-dark uppercase shadow-sm backdrop-blur-sm"
          >
            <AlbumIcon className="h-4 w-4" />
            View Album <span className="font-zh font-bold tracking-normal normal-case">相册</span>
          </Link>
        )}
      </div>
    </GuestPageBackground>
  );
}

function AlbumIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="15" height="14" rx="2" />
      <path d="M7 2h13a1 1 0 0 1 1 1v13" />
      <circle cx="8" cy="10" r="1.5" />
      <path d="M4 17l3.5-4 3 3L14 12l4 5" />
    </svg>
  );
}
