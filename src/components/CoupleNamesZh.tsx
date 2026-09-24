import { COUPLE_ZH_FIRST, COUPLE_ZH_SECOND } from "@/lib/config";

// The Chinese "和" is shown as the same Pinyon Script "&" used in the English names.
export default function CoupleNamesZh() {
  return (
    <>
      <span>{COUPLE_ZH_FIRST}</span>
      <span className="font-amp mx-[0.3em] text-[1.3em] font-normal">&amp;</span>
      <span>{COUPLE_ZH_SECOND}</span>
    </>
  );
}
