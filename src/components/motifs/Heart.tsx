type Props = {
  className?: string;
  color?: string;
};

export default function Heart({ className = "", color = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 100 90"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 88 C20 65, 5 44, 5 27 C5 12, 17 2, 31 2 C41 2, 50 9, 50 19 C50 9, 59 2, 69 2 C83 2, 95 12, 95 27 C95 44, 80 65, 50 88 Z"
        fill={color}
      />
    </svg>
  );
}
