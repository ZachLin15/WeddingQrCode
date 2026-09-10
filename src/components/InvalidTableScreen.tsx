import GuestHeader from "./GuestHeader";
import GuestPageBackground from "./GuestPageBackground";

export default function InvalidTableScreen() {
  return (
    <GuestPageBackground>
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-6 text-center">
        <GuestHeader />
        <p className="max-w-xs font-display text-xl text-ink/80">
          Please scan the QR code at your table to share your photos with us.
        </p>
      </div>
    </GuestPageBackground>
  );
}
