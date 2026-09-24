import { COUPLE_FIRST, COUPLE_SECOND } from "@/lib/config";

/** Inline couple names: Allura for the names, Pinyon Script for the ampersand. */
export default function CoupleNames() {
  return (
    <>
      <span className="font-name">{COUPLE_FIRST}</span>
      <span className="font-amp mx-[0.2em]">&amp;</span>
      <span className="font-name">{COUPLE_SECOND}</span>
    </>
  );
}
