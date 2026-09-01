import { COUPLE_NAMES, WEDDING_DATE_DISPLAY } from "@/lib/config";
import MickeyEars from "./motifs/MickeyEars";

export default function GuestHeader() {
  return (
    <div className="relative flex w-full flex-col items-center px-2 pt-2 text-center">
      <MickeyEars className="h-14 w-28 shrink-0 text-gold-light sm:h-16 sm:w-32" />
      <h1 className="-mt-2 font-script text-gold-dark text-[2rem] leading-tight text-balance sm:-mt-3 sm:text-5xl">
        {COUPLE_NAMES}
      </h1>
      <p className="mt-1 font-sans text-[10px] tracking-[0.3em] text-ink-soft uppercase sm:text-xs sm:tracking-[0.35em]">
        {WEDDING_DATE_DISPLAY}
      </p>
    </div>
  );
}
