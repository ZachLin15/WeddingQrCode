type Props = {
  className?: string;
  color?: string;
};

export default function GoldButterfly({ className = "", color = "#B98A4C" }: Props) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.18">
        <path d="M40 30 C 30 6, 4 4, 4 20 C 4 34, 24 34, 40 30 Z" />
        <path d="M40 30 C 50 6, 76 4, 76 20 C 76 34, 56 34, 40 30 Z" />
        <path d="M40 30 C 32 40, 12 46, 14 54 C 16 60, 32 52, 40 34 Z" />
        <path d="M40 30 C 48 40, 68 46, 66 54 C 64 60, 48 52, 40 34 Z" />
      </g>
      <line x1="40" y1="18" x2="40" y2="40" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}
