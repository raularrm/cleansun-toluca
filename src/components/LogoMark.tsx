export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Simple solar-sun mark: disc + eight rays, unmistakably "sun". */}
      <circle cx="15" cy="15" r="6.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <path d="M15 1.5V5.5" />
        <path d="M15 24.5V28.5" />
        <path d="M28.5 15H24.5" />
        <path d="M5.5 15H1.5" />
        <path d="M24.55 5.45L21.9 8.1" />
        <path d="M8.1 21.9L5.45 24.55" />
        <path d="M24.55 24.55L21.9 21.9" />
        <path d="M8.1 8.1L5.45 5.45" />
      </g>
    </svg>
  );
}
