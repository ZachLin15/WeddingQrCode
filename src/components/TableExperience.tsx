"use client";

import Link from "next/link";
import GuestHeader from "./GuestHeader";
import TableBadge from "./TableBadge";
import CameraCapture from "./CameraCapture";
import MickeySilhouette from "./motifs/MickeySilhouette";
import FloralField from "./motifs/FloralField";

export default function TableExperience({ table }: { table: number }) {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, var(--color-blush) 0%, transparent 60%), radial-gradient(ellipse at 100% 20%, var(--color-peach-soft) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, var(--color-lilac-soft) 0%, transparent 50%)",
        }}
      />
      <MickeySilhouette
        className="pointer-events-none absolute -left-16 top-24 h-56 w-56 text-lilac opacity-70"
      />
      <FloralField />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flowers/spray-white-peach.webp"
        alt=""
        className="pointer-events-none absolute -right-6 top-0 h-44 w-auto rotate-[8deg] opacity-95 sm:h-52"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flowers/spray-coral-peach.webp"
        alt=""
        className="pointer-events-none absolute -left-6 bottom-0 h-44 w-auto -rotate-[10deg] scale-x-[-1] opacity-95 sm:h-52"
      />

      <div
        className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center gap-7 px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6"
      >
        <GuestHeader />
        <TableBadge table={table} />
        <CameraCapture table={table} />

        <Link
          href={`/t/${table}/album`}
          className="inline-flex items-center gap-2 rounded-full border border-pink-light/60 bg-white/70 px-5 py-2 font-sans text-[11px] tracking-[0.25em] text-pink-dark uppercase shadow-sm backdrop-blur-sm"
        >
          <AlbumIcon className="h-4 w-4" />
          View Album
        </Link>
      </div>
    </main>
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
