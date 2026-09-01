import type { CSSProperties } from "react";
import MickeyEars from "./MickeyEars";
import MickeySilhouette from "./MickeySilhouette";

type Item = {
  variant: "ears" | "silhouette";
  side: "left" | "right";
  top: string;
  offset: string;
  size: string;
  rotate?: number;
  flip?: boolean;
  opacity?: number;
  color?: string;
};

const ITEMS: Item[] = [
  { variant: "silhouette", side: "right", top: "9%", offset: "-3rem", size: "8rem", opacity: 0.35, color: "var(--color-pink-light)" },
  { variant: "ears", side: "left", top: "28%", offset: "-2.5rem", size: "6rem", opacity: 0.5, rotate: -8 },
  { variant: "silhouette", side: "left", top: "46%", offset: "-3.5rem", size: "7rem", opacity: 0.3, color: "var(--color-lilac)" },
  { variant: "ears", side: "right", top: "60%", offset: "-2rem", size: "5.5rem", opacity: 0.55, rotate: 10 },
  { variant: "silhouette", side: "right", top: "76%", offset: "-2.75rem", size: "6.5rem", opacity: 0.3, color: "var(--color-blush)" },
  { variant: "ears", side: "left", top: "88%", offset: "-2rem", size: "5.5rem", opacity: 0.5, rotate: -6, flip: true },
];

export default function MickeyField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ITEMS.map((item, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: item.top,
          width: item.size,
          height: item.size,
          opacity: item.opacity ?? 0.4,
          transform: [
            item.rotate ? `rotate(${item.rotate}deg)` : "",
            item.flip ? "scaleX(-1)" : "",
          ]
            .filter(Boolean)
            .join(" "),
          [item.side]: item.offset,
        };
        return item.variant === "ears" ? (
          <MickeyEars key={i} style={{ ...style, color: item.color ?? "var(--color-gold-light)" }} />
        ) : (
          <MickeySilhouette key={i} style={style} color={item.color ?? "var(--color-gold-light)"} />
        );
      })}
    </div>
  );
}
