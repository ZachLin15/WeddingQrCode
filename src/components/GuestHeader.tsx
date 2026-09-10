import { COUPLE_NAMES, COUPLE_NAMES_ZH, WEDDING_DATE_DISPLAY } from "@/lib/config";
import MickeyEars from "./motifs/MickeyEars";
import HeartDivider from "./motifs/HeartDivider";

export default function GuestHeader() {
  return (
    <div className="relative flex w-full flex-col items-center px-2 pt-2 text-center">
      <MickeyEars className="h-20 w-[6.5rem] shrink-0 sm:h-24 sm:w-[7.8rem]" />
      <h1 className="-mt-4 whitespace-nowrap font-script text-gold-dark text-[clamp(1.35rem,7.2vw,2.75rem)] leading-tight sm:-mt-5">
        {COUPLE_NAMES}
      </h1>
      <p className="mt-1 font-zh text-lg font-bold text-ink sm:text-xl">{COUPLE_NAMES_ZH}</p>
      <HeartDivider className="mt-2 h-2.5 w-20 text-gold-light sm:w-24" />
      <p className="mt-1.5 font-sans text-[10px] tracking-[0.3em] text-ink-soft uppercase sm:text-xs sm:tracking-[0.35em]">
        {WEDDING_DATE_DISPLAY}
      </p>
    </div>
  );
}
