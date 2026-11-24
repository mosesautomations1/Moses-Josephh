import type { SVGProps } from 'react';

interface MJLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function MJLogo({ size = 40, className = '', ...props }: MJLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MJ Monogram Logo"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="mj-blue-grad" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65A9FF" />
          <stop offset="55%" stopColor="#1677FF" />
          <stop offset="100%" stopColor="#2457C5" />
        </linearGradient>
        <linearGradient id="mj-silver-grad" x1="10" y1="14" x2="40" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE5F0" />
        </linearGradient>
        <linearGradient id="mj-swoosh-grad" x1="8" y1="48" x2="58" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="48%" stopColor="#65A9FF" />
          <stop offset="100%" stopColor="#1677FF" />
        </linearGradient>
      </defs>

      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="14"
        fill="#0B1D38"
        stroke="rgba(101, 169, 255, 0.28)"
        strokeWidth="1.5"
      />

      {/* Crisp geometric M */}
      <path
        d="M14 44V20H20.5L27 32.5L33.5 20H39.5V44H34V29.5L28.2 40.5H25.8L20 29.5V44H14Z"
        fill="url(#mj-silver-grad)"
      />

      {/* Integrated architectural J */}
      <path
        d="M41.5 20H48V37.2C48 43.4 44.1 47 37.8 47C35.4 47 33.4 46.5 31.8 45.6L33.6 40.8C34.8 41.4 36 41.7 37.4 41.7C40.1 41.7 41.5 40.1 41.5 36.8V20Z"
        fill="url(#mj-blue-grad)"
      />

      {/* Dynamic forward arc echoing Moses Joseph's MJ swoosh */}
      <path
        d="M11 47.5C21 52.5 38.5 47.5 52.5 27.5"
        stroke="url(#mj-swoosh-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M48.5 25.5L54 24.5L53.5 30"
        stroke="#65A9FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
