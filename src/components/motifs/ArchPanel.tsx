import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Rounded-top "arch" frame, echoing the white arch shapes on the decor board. */
export default function ArchPanel({ children, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden bg-white shadow-[0_18px_40px_-18px_rgba(140,106,58,0.35)] ${className}`}
      style={{ borderRadius: "999px 999px 24px 24px" }}
    >
      {children}
    </div>
  );
}
