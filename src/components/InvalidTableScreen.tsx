import GuestHeader from "./GuestHeader";
import FloralField from "./motifs/FloralField";

export default function InvalidTableScreen() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-6 overflow-hidden bg-cream px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, var(--color-blush) 0%, transparent 60%), radial-gradient(ellipse at 100% 20%, var(--color-peach-soft) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, var(--color-lilac-soft) 0%, transparent 50%)",
        }}
      />
      <FloralField />
      <div className="relative flex flex-col items-center gap-6">
        <GuestHeader />
        <p className="max-w-xs font-display text-xl text-ink/80">
          Please scan the QR code at your table to share your photos with us.
        </p>
      </div>
    </main>
  );
}
