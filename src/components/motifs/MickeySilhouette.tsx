type Props = {
  className?: string;
  color?: string;
};

/** Solid three-circle Mickey silhouette used as a soft watermark shape. */
export default function MickeySilhouette({ className = "", color = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 240 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="52" r="40" fill={color} />
      <circle cx="180" cy="52" r="40" fill={color} />
      <circle cx="120" cy="140" r="80" fill={color} />
    </svg>
  );
}
