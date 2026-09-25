import { COUPLE_FIRST, COUPLE_SECOND } from "@/lib/config";
import { CoupleNamesZh } from "./CoupleNames";
import HeartDivider from "./motifs/HeartDivider";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

export default function GuestHeader() {
  return (
    <div className="relative -mt-3 -mb-3 w-[min(22rem,calc(100vw-2.5rem))] aspect-[352/375]">
      <MickeyBubbleFrame className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* Content sits inside the head circle (below the ears), centred. */}
      <div className="absolute inset-x-0 top-[24%] bottom-[4%] flex flex-col items-center justify-center text-center">
        <h1 className="relative font-name text-gold-dark text-[clamp(2rem,10.5vw,2.75rem)] leading-[1.05]">
          <span className="block">{COUPLE_FIRST}</span>
          <span className="font-amp block text-[0.8em]">&amp;</span>
          <span className="block">{COUPLE_SECOND}</span>
        </h1>
        <p className="relative mt-2 font-zh text-lg font-bold text-ink sm:text-xl">
          <CoupleNamesZh />
        </p>
        <HeartDivider className="relative mt-2 h-2.5 w-20 text-gold-light" />
      </div>
    </div>
  );
}
