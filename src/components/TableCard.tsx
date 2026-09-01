import { COUPLE_NAMES, WEDDING_DATE_DISPLAY } from "@/lib/config";
import MickeyEars from "./motifs/MickeyEars";
import MickeySilhouette from "./motifs/MickeySilhouette";
import PoppyFlower from "./motifs/PoppyFlower";
import WildflowerSpray from "./motifs/WildflowerSpray";
import GoldButterfly from "./motifs/GoldButterfly";

export default function TableCard({ table }: { table: number }) {
  return (
    <div
      className="card flex flex-col items-center justify-between"
      style={{
        background:
          "linear-gradient(180deg, var(--color-blush-soft) 0%, var(--color-cream) 55%, var(--color-peach-soft) 100%)",
      }}
    >
      <MickeySilhouette className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 text-lilac-soft opacity-80" />
      <MickeySilhouette className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 text-pink-light opacity-25" />
      <MickeyEars className="pointer-events-none absolute right-3 bottom-24 h-8 w-14 -rotate-12 text-gold-light opacity-70" />
      <PoppyFlower className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 opacity-90 -rotate-6" />
      <WildflowerSpray className="pointer-events-none absolute right-1 top-1 h-12 w-12 opacity-80" />
      <GoldButterfly className="pointer-events-none absolute left-2 bottom-14 h-6 w-8 opacity-90" />
      <PoppyFlower
        className="pointer-events-none absolute -left-2 bottom-20 h-10 w-10 rotate-6 opacity-60"
        petalColor="#FFD3C4"
      />
      <WildflowerSpray className="pointer-events-none absolute -right-1 top-1/3 h-10 w-10 opacity-50" />
      <PoppyFlower
        className="pointer-events-none absolute -right-2 top-16 h-9 w-9 -rotate-12 opacity-55"
        petalColor="#FFE0D9"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <MickeyEars className="h-8 w-16 text-gold-light" />
        <p className="-mt-1.5 font-script text-xl leading-tight text-gold-dark">{COUPLE_NAMES}</p>
        <p className="mt-0.5 font-sans text-[8px] tracking-[0.3em] text-ink-soft uppercase">
          {WEDDING_DATE_DISPLAY}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <p className="max-w-[32mm] text-center font-display text-[11px] italic leading-snug text-ink-soft">
          Please scan the QR code to take a photo with us
        </p>
        <div className="qr-frame flex items-center justify-center rounded-full bg-white p-2 shadow-[0_6px_16px_rgba(140,106,58,0.25)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/qr/table-${table}.png`} alt={`Table ${table} QR code`} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="font-sans text-[9px] tracking-[0.35em] text-ink-soft uppercase">Table</span>
        <span className="font-display text-3xl leading-none text-gold-dark">{table}</span>
      </div>
    </div>
  );
}
