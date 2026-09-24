import { COUPLE_NAMES_ZH } from "@/lib/config";
import CoupleNames from "./CoupleNames";
import HeartDivider from "./motifs/HeartDivider";
import MickeyBubbleFrame from "./motifs/MickeyBubbleFrame";

export default function GuestHeader() {
  return (
    <div className="relative mb-28 flex w-full flex-col items-center px-2 pt-2 text-center">
      <div className="relative top-px mt-4 inline-flex flex-col items-center px-8 py-8">
        <MickeyBubbleFrame className="pointer-events-none absolute -inset-x-5 -top-20 -bottom-40 h-[calc(100%+15rem)] w-[calc(100%+2.5rem)]" />
        <h1 className="relative whitespace-nowrap font-script text-gold-dark text-[clamp(1.875rem,9.75vw,3.75rem)] leading-tight">
          <CoupleNames />
        </h1>
        <div className="relative top-5 flex flex-col items-center">
          <p className="relative mt-1 font-zh text-xl font-bold text-ink sm:text-2xl">{COUPLE_NAMES_ZH}</p>
          <HeartDivider className="relative mt-2 h-2.5 w-20 text-gold-light sm:w-24" />
        </div>
      </div>
    </div>
  );
}
