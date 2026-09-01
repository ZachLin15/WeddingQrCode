"use client";

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

      <div
        className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center gap-7 px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6"
      >
        <GuestHeader />
        <TableBadge table={table} />
        <CameraCapture table={table} />
      </div>
    </main>
  );
}
