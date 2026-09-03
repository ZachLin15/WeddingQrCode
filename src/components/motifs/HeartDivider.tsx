type Props = {
  className?: string;
};

/** Short line — heart — short line, matching the underline beneath the couple's names on the decor board. */
export default function HeartDivider({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 100 14"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="7" x2="38" y2="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M50 11 C46 7, 42 4, 46 2 C48 1, 50 2, 50 4 C50 2, 52 1, 54 2 C58 4, 54 7, 50 11 Z"
        fill="currentColor"
      />
      <line x1="62" y1="7" x2="100" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
