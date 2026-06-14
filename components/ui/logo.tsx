export function BosLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main B shape */}
      <path
        d="M18 8 L18 82 L56 82 C74 82 86 71 86 57 C86 47 80 39 70 36 C78 32 83 24 83 14 C83 -1 73 8 56 8 Z"
        fill="currentColor"
      />
      {/* Organic tail/bubble at bottom left */}
      <path
        d="M18 68 C18 68 14 85 18 95 C22 105 34 112 46 110 C30 108 20 96 18 68 Z"
        fill="currentColor"
      />
    </svg>
  )
}
