import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond, Jost, Noto_Serif_SC } from "next/font/google";
import { COUPLE_NAMES, WEDDING_DATE_DISPLAY } from "@/lib/config";
import "./globals.css";

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: `${COUPLE_NAMES} | ${WEDDING_DATE_DISPLAY}`,
  description: `Share your photos from ${COUPLE_NAMES}'s wedding celebration.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${parisienne.variable} ${cormorant.variable} ${jost.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
