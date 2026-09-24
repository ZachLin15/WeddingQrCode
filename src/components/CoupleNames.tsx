import { COUPLE_FIRST, COUPLE_SECOND, COUPLE_ZH_FIRST, COUPLE_ZH_SECOND } from "@/lib/config";

/**
 * Both languages share one ampersand: the English names sit either side of a
 * Pinyon Script "&", with each Chinese name centred directly beneath its
 * English counterpart. The parent sets the English size; `zhClassName` sets
 * the Chinese size/spacing.
 */
export default function CoupleNames({ zhClassName = "" }: { zhClassName?: string }) {
  return (
    <span className="relative inline-grid grid-cols-[auto_auto_auto] items-center justify-items-center">
      <span className="font-name">{COUPLE_FIRST}</span>
      <span className="font-amp mx-[0.2em]">&amp;</span>
      <span className="font-name">{COUPLE_SECOND}</span>
      <span className={`font-zh font-bold text-ink ${zhClassName}`}>{COUPLE_ZH_FIRST}</span>
      <span aria-hidden="true" />
      <span className={`font-zh font-bold text-ink ${zhClassName}`}>{COUPLE_ZH_SECOND}</span>
    </span>
  );
}
