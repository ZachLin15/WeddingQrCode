import type { CSSProperties } from "react";
import PoppyFlower from "./PoppyFlower";
import WildflowerSpray from "./WildflowerSpray";

type Item = {
  variant: "poppy" | "wildflower";
  side: "left" | "right";
  top: string;
  offset: string;
  size: string;
  rotate?: number;
  flip?: boolean;
  opacity?: number;
  petalColor?: string;
  centerColor?: string;
};

const ITEMS: Item[] = [
  { variant: "poppy", side: "right", top: "2%", offset: "-1.5rem", size: "6rem", rotate: 12, opacity: 0.9 },
  { variant: "wildflower", side: "left", top: "1%", offset: "0.5rem", size: "5rem", opacity: 0.85 },
  { variant: "wildflower", side: "right", top: "16%", offset: "-0.5rem", size: "4rem", opacity: 0.7, flip: true },
  { variant: "poppy", side: "left", top: "22%", offset: "-2rem", size: "5rem", rotate: -18, opacity: 0.75, petalColor: "#FFD3C4" },
  { variant: "poppy", side: "right", top: "34%", offset: "-1.75rem", size: "4.5rem", rotate: 24, opacity: 0.65, petalColor: "#FFE0D9" },
  { variant: "wildflower", side: "left", top: "40%", offset: "-0.75rem", size: "4.5rem", opacity: 0.7 },
  { variant: "poppy", side: "left", top: "54%", offset: "-1.5rem", size: "4.5rem", rotate: 10, opacity: 0.7 },
  { variant: "wildflower", side: "right", top: "50%", offset: "-1rem", size: "4rem", opacity: 0.6, flip: true },
  { variant: "wildflower", side: "left", top: "68%", offset: "-0.5rem", size: "5rem", opacity: 0.75 },
  { variant: "poppy", side: "right", top: "64%", offset: "-2rem", size: "5rem", rotate: -14, opacity: 0.8, petalColor: "#FFD3C4" },
  { variant: "poppy", side: "left", top: "82%", offset: "-1.75rem", size: "5rem", rotate: -12, opacity: 0.8 },
  { variant: "wildflower", side: "right", top: "80%", offset: "0.25rem", size: "6rem", opacity: 0.7, flip: true },
  { variant: "wildflower", side: "left", top: "93%", offset: "0.25rem", size: "4.5rem", opacity: 0.8 },
  { variant: "poppy", side: "right", top: "92%", offset: "-1.25rem", size: "5.5rem", rotate: 16, opacity: 0.85 },
];

export default function FloralField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ITEMS.map((item, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: item.top,
          width: item.size,
          height: item.size,
          opacity: item.opacity ?? 0.8,
          transform: [
            item.rotate ? `rotate(${item.rotate}deg)` : "",
            item.flip ? "scaleX(-1)" : "",
          ]
            .filter(Boolean)
            .join(" "),
          [item.side]: item.offset,
        };
        return item.variant === "poppy" ? (
          <PoppyFlower
            key={i}
            style={style}
            petalColor={item.petalColor}
            centerColor={item.centerColor}
          />
        ) : (
          <WildflowerSpray key={i} style={style} />
        );
      })}
    </div>
  );
}
