import {
  COUPLE_NAMES,
  COUPLE_NAMES_ZH,
  CAPTURE_PROMPT_EN,
  CAPTURE_PROMPT_ZH,
  WEDDING_DATE_DISPLAY,
} from "@/lib/config";
import MickeySilhouette from "./motifs/MickeySilhouette";
import WildflowerSpray from "./motifs/WildflowerSpray";
import GoldButterfly from "./motifs/GoldButterfly";
import HeartDivider from "./motifs/HeartDivider";
import Heart from "./motifs/Heart";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

export default function TableCard({ table }: { table: number }) {
  return (
    <div
      className="card flex flex-col items-center justify-between"
      style={{
        background:
          "linear-gradient(180deg, var(--color-blush-soft) 0%, var(--color-cream) 55%, var(--color-peach-soft) 100%)",
      }}
    >
      <MickeySilhouette className="pointer-events-none absolute right-1 bottom-1 h-24 w-24 text-lilac-soft opacity-80" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flowers/spray-pink.webp"
        alt=""
        className="pointer-events-none absolute -left-4 -top-4 h-24 w-auto -rotate-[18deg] opacity-95"
      />
      <WildflowerSpray className="pointer-events-none absolute right-1 top-1 h-12 w-12 opacity-80" />
      <GoldButterfly className="pointer-events-none absolute left-2 bottom-14 h-6 w-8 opacity-90" />

      <div className="relative z-10 mt-3 inline-flex flex-col items-center px-5 py-4 text-center">
        <MickeyBubbleFrame className="pointer-events-none absolute -inset-x-3 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" />
        <p className="relative font-script text-2xl leading-tight text-gold-dark">{COUPLE_NAMES}</p>
        <p className="relative mt-0.5 font-zh text-base font-bold text-ink">{COUPLE_NAMES_ZH}</p>
        <HeartDivider className="relative mt-1 h-2 w-12 text-gold-light" />
        <p className="relative mt-0.5 font-sans text-[8px] tracking-[0.3em] text-ink-soft uppercase">
          {WEDDING_DATE_DISPLAY}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1 px-3">
        <p className="text-center font-display text-[14px] italic leading-snug text-burgundy">
          {CAPTURE_PROMPT_EN}
        </p>
        <p className="text-center font-zh text-[14px] font-bold leading-snug text-burgundy">
          {CAPTURE_PROMPT_ZH}
        </p>
      </div>

      <div className="qr-frame relative z-10 flex items-center justify-center rounded-[22%] bg-white p-2 shadow-[0_10px_24px_-10px_rgba(140,106,58,0.4)]">
        <div className="flex h-full w-full items-center justify-center rounded-[16%] border-[3px] border-navy p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/qr/table-${table}.png`} alt={`Table ${table} QR code`} />
        </div>
        <Heart className="pointer-events-none absolute -top-3 -right-2 h-6 w-7 text-pink" />
        <Heart className="pointer-events-none absolute -top-1 right-3 h-3.5 w-4 text-pink-dark" />
        <Heart className="pointer-events-none absolute -bottom-2 -left-3 h-6 w-7 text-pink-dark" />
        <Heart className="pointer-events-none absolute bottom-1 left-4 h-3 w-3.5 text-pink" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="font-sans text-[9px] tracking-[0.35em] text-ink-soft uppercase">Table</span>
        <span className="font-display text-3xl leading-none text-pink-dark">{table}</span>
      </div>
    </div>
  );
}
