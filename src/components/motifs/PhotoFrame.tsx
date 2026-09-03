import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Soft-cornered square frame for the camera view and captured photo. */
export default function PhotoFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_-18px_rgba(140,106,58,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}
