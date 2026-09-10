import { COUPLE_NAMES, COUPLE_NAMES_ZH, WEDDING_DATE_DISPLAY } from "@/lib/config";
import HeartDivider from "./motifs/HeartDivider";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

export default function GuestHeader() {
  return (
    <div className="relative flex w-full flex-col items-center px-2 pt-2 text-center">
      <div className="relative inline-block px-2 py-1">
        <MickeyBubbleFrame className="pointer-events-none absolute -inset-x-6 -inset-y-5 h-[calc(100%+2.5rem)] w-[calc(100%+3rem)]" />
        <h1 className="relative whitespace-nowrap font-script text-gold-dark text-[clamp(1.35rem,7.2vw,2.75rem)] leading-tight">
          {COUPLE_NAMES}
        </h1>
      </div>
      <p className="mt-1 font-zh text-lg font-bold text-ink sm:text-xl">{COUPLE_NAMES_ZH}</p>
      <HeartDivider className="mt-2 h-2.5 w-20 text-gold-light sm:w-24" />
      <p className="mt-1.5 font-sans text-[10px] tracking-[0.3em] text-ink-soft uppercase sm:text-xs sm:tracking-[0.35em]">
        {WEDDING_DATE_DISPLAY}
      </p>
    </div>
  );
}
