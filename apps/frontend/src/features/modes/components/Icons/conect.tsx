export default function IconConnect({ size = 48, className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      {...props}
    >
      <defs>
        <clipPath id="tileClip1">
          <rect x="4" y="4" width="192" height="192" rx="16" />
        </clipPath>
      </defs>
      <rect x="4" y="4" width="192" height="192" rx="16" fill="#1c1c22" />
      <g clipPath="url(#tileClip1)">
        <rect x="4" y="4" width="192" height="49" fill="#8a4fd6" />
        <rect x="4" y="4" width="192" height="49" fill="#000" opacity="0.12" />
        <rect x="4" y="49" width="192" height="4" fill="#000" opacity="0.25" />

        <rect x="4" y="53" width="192" height="47" fill="#159e94" />
        <rect x="4" y="96" width="192" height="4" fill="#000" opacity="0.25" />

        <rect x="4" y="100" width="192" height="47" fill="#5cb833" />
        <rect x="4" y="143" width="192" height="4" fill="#000" opacity="0.25" />

        <rect x="4" y="147" width="192" height="49" fill="#f4c22b" />
        <rect x="4" y="178" width="192" height="18" fill="#000" opacity="0.15" />
      </g>
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
