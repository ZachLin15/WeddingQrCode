import { ReactNode } from "react";
import MickeySilhouette from "./motifs/MickeySilhouette";
import WildflowerSpray from "./motifs/WildflowerSpray";
import GoldButterfly from "./motifs/GoldButterfly";
import PoppyFlower from "./motifs/PoppyFlower";

/**
 * Shared page chrome for guest-facing screens: the cream/blush/peach
 * gradient, dashed border, and sparse corner accents matching the
 * printed table card's background design.
 */
export default function GuestPageBackground({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden border-[3px] border-dashed border-[#cbb89a]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-blush-soft) 0%, var(--color-cream) 55%, var(--color-peach-soft) 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flowers/spray-pink.webp"
        alt=""
        className="pointer-events-none absolute -left-4 -top-4 h-28 w-auto -rotate-[18deg] opacity-95"
      />
      <WildflowerSpray className="pointer-events-none absolute right-2 top-2 h-16 w-16 opacity-80" />

      <PoppyFlower
        className="pointer-events-none absolute -left-6 bottom-0 h-32 w-32 opacity-50 blur-[1px]"
        petalColor="#FFD3C4"
      />
      <GoldButterfly className="pointer-events-none absolute left-3 bottom-24 h-8 w-10 opacity-90" />

      <MickeySilhouette className="pointer-events-none absolute -right-4 bottom-2 h-28 w-28 text-lilac-soft opacity-80" />
      <span className="pointer-events-none absolute right-16 bottom-32 h-2.5 w-2.5 rounded-full bg-gold-light opacity-70" />

      {children}
    </main>
  );
}
