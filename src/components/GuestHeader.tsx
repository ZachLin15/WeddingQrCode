import { COUPLE_NAMES, COUPLE_NAMES_ZH, WEDDING_DATE_DISPLAY } from "@/lib/config";
import HeartDivider from "./motifs/HeartDivider";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

export default function GuestHeader() {
  return (
    <div className="relative flex w-full flex-col items-center px-2 pt-2 text-center">
      <div className="relative mt-4 inline-flex flex-col items-center px-8 py-8">
        <MickeyBubbleFrame className="pointer-events-none absolute -inset-x-5 -inset-y-6 h-[calc(100%+3rem)] w-[calc(100%+2.5rem)]" />
        <h1 className="relative whitespace-nowrap font-script text-gold-dark text-[clamp(1.5rem,7.8vw,3rem)] leading-tight">
          {COUPLE_NAMES}
        </h1>
        <p className="relative mt-1 font-zh text-xl font-bold text-ink sm:text-2xl">{COUPLE_NAMES_ZH}</p>
        <HeartDivider className="relative mt-2 h-2.5 w-20 text-gold-light sm:w-24" />
        <p className="relative mt-1.5 font-sans text-[10px] tracking-[0.3em] text-ink-soft uppercase sm:text-xs sm:tracking-[0.35em]">
          {WEDDING_DATE_DISPLAY}
        </p>
      </div>
    </div>
  );
}
