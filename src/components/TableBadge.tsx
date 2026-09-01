export default function TableBadge({ table }: { table: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-pink-light/60 bg-white/80 px-5 py-1.5 shadow-sm backdrop-blur-sm">
      <span className="font-sans text-[11px] tracking-[0.3em] text-ink-soft uppercase">Table</span>
      <span className="font-display text-xl text-pink-dark leading-none">{table}</span>
    </div>
  );
}
