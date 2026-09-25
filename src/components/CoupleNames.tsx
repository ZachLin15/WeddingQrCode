import { COUPLE_FIRST, COUPLE_SECOND, COUPLE_ZH_FIRST, COUPLE_ZH_SECOND } from "@/lib/config";

/**
 * Default (`shared`): both languages share one Pinyon Script "&" — the English
 * names sit either side of it with each Chinese name centred beneath its
 * English counterpart. The parent sets the English size; `zhClassName` sets
 * the Chinese size/spacing.
 *
 * The website header instead stacks `CoupleNamesEn` and `CoupleNamesZh`, each
 * language with its own "&".
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

/** English names inline: Allura for the names, Pinyon Script for the ampersand. */
export function CoupleNamesEn() {
  return (
    <>
      <span className="font-name">{COUPLE_FIRST}</span>
      <span className="font-amp mx-[0.2em]">&amp;</span>
      <span className="font-name">{COUPLE_SECOND}</span>
    </>
  );
}

/** Chinese names inline with the same Pinyon Script "&" in place of 和. */
export function CoupleNamesZh() {
  return (
    <>
      <span>{COUPLE_ZH_FIRST}</span>
      <span className="font-amp mx-[0.3em] text-[1.3em] font-normal">&amp;</span>
      <span>{COUPLE_ZH_SECOND}</span>
    </>
  );
}
