import { COUPLE_FIRST, COUPLE_SECOND } from "@/lib/config";
import { CoupleNamesZh } from "./CoupleNames";
import HeartDivider from "./motifs/HeartDivider";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

/**
 * The bubble is capped by viewport height as well as width so the capture
 * page never needs to scroll; everything inside is sized in container-width
 * units (cqw) so the text scales with the bubble.
 */
export default function GuestHeader() {
  return (
    <div className="relative aspect-[352/375] w-[min(18rem,calc(100vw-2.5rem),32dvh)] [container-type:inline-size]">
      <MickeyBubbleFrame className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* Content sits inside the head circle (below the ears), centred. */}
      <div className="absolute inset-x-0 top-[21%] bottom-[7%] flex flex-col items-center justify-center text-center">
        <h1 className="relative font-name text-gold-dark text-[11.5cqw] leading-[1.05]">
          <span className="block">{COUPLE_FIRST}</span>
          <span className="font-amp block text-[0.8em]">&amp;</span>
          <span className="block">{COUPLE_SECOND}</span>
        </h1>
        <p className="relative mt-[2.5cqw] font-zh text-[5.6cqw] font-bold text-ink">
          <CoupleNamesZh />
        </p>
        <HeartDivider className="relative mt-[2.5cqw] h-[3cqw] w-[24cqw] text-gold-light" />
      </div>
    </div>
  );
}
