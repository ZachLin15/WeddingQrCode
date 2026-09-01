import "./print.css";
import { TABLE_COUNT } from "@/lib/config";
import TableCard from "@/components/TableCard";

export const metadata = {
  title: "Table Cards — Print",
};

export default function PrintCardsPage() {
  const tables = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

  return (
    <div className="print-page bg-[#f2ece4] py-10">
      <div className="no-print mx-auto mb-8 max-w-xl px-6 text-center font-sans text-sm leading-relaxed text-ink-soft">
        <p>
          <strong className="text-ink">Print instructions:</strong> press{" "}
          <kbd className="rounded border border-ink-soft/30 px-1">Ctrl/Cmd + P</kbd>, choose
          &ldquo;Save as PDF&rdquo;, paper size <strong>A4</strong>, scale <strong>100%</strong>,
          margins <strong>None</strong>. Each card is A6 size (105 × 148mm), four per sheet with
          dashed cut guides. Make sure{" "}
          <code className="rounded bg-white/60 px-1">scripts/generate-qr-codes.mjs</code> has been
          run with your real site URL before printing.
        </p>
      </div>
      <div className="card-grid">
        {tables.map((n) => (
          <TableCard key={n} table={n} />
        ))}
      </div>
    </div>
  );
}
