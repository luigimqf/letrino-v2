export function IconHashtag({ size = 48, className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      {...props}
    >
      <rect x="4" y="4" width="192" height="192" rx="16" fill="#1c1c22" />

      <rect x="49" y="13" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="121" y="13" width="30" height="30" rx="8" fill="#ffffff" />

      <rect x="13" y="49" width="30" height="30" rx="8" fill="#f4c22b" />
      <rect x="49" y="49" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="85" y="49" width="30" height="30" rx="8" fill="#f4c22b" />
      <rect x="121" y="49" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="157" y="49" width="30" height="30" rx="8" fill="#ffffff" />

      <rect x="49" y="85" width="30" height="30" rx="8" fill="#ffffff" />
      <rect x="121" y="85" width="30" height="30" rx="8" fill="#f4c22b" />

      <rect x="13" y="121" width="30" height="30" rx="8" fill="#ffffff" />
      <rect x="49" y="121" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="85" y="121" width="30" height="30" rx="8" fill="#f4c22b" />
      <rect x="121" y="121" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="157" y="121" width="30" height="30" rx="8" fill="#ffffff" />

      <rect x="49" y="157" width="30" height="30" rx="8" fill="#5cb833" />
      <rect x="121" y="157" width="30" height="30" rx="8" fill="#5cb833" />

      <rect
        x="4"
        y="4"
        width="192"
        height="192"
        rx="16"
        fill="none"
        stroke="#000"
        strokeOpacity="0.35"
        strokeWidth="3"
      />
    </svg>
  );
}
