import { SCAN_INSTRUCTION_EN, SCAN_INSTRUCTION_ZH } from "@/lib/config";
import GuestHeader from "./GuestHeader";
import GuestPageBackground from "./GuestPageBackground";

export default function InvalidTableScreen() {
  return (
    <GuestPageBackground>
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-6 text-center">
        <GuestHeader />
        <div className="flex max-w-xs flex-col items-center gap-2">
          <p className="font-display text-xl text-ink/80">{SCAN_INSTRUCTION_EN}</p>
          <p className="font-zh text-base text-ink-soft">{SCAN_INSTRUCTION_ZH}</p>
        </div>
      </div>
    </GuestPageBackground>
  );
}
