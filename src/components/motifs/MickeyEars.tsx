type Props = {
  className?: string;
};

/** Simple two-circle "ears" outline ornament, echoing the wedding decor board's name-frame motif. */
export default function MickeyEars({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 220 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="62" cy="55" r="52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="158" cy="55" r="52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
