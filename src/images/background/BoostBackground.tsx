import type { IconProps } from '../../icons/props';

const Icon = ({ height = 170, width = 411, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 411 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="400.5"
        y="158.841"
        width="389.651"
        height="148"
        rx="9.5"
        transform="rotate(180 400.5 158.841)"
        fill="#000"
        fillOpacity=".7"
      />
      <g filter="url(#filter0_f_1773_12248)">
        <path
          d="M391 157.841H20a8.5 8.5 0 01-8.5-8.5v-129a8.5 8.5 0 018.5-8.5h371a8.5 8.5 0 018.5 8.5v129a8.5 8.5 0 01-8.5 8.5z"
          stroke="url(#paint0_linear_1773_12248)"
          strokeWidth="3"
        />
      </g>
      <rect
        x="400.5"
        y="158.841"
        width="389.651"
        height="148"
        rx="9.5"
        transform="rotate(180 400.5 158.841)"
        stroke="#EAEFF5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1773_12248"
          x1="16.289"
          y1="177.639"
          x2="416.904"
          y2="150.074"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0FA" />
          <stop offset="1" stopColor="#4C00C7" />
        </linearGradient>
        <filter
          id="filter0_f_1773_12248"
          x="0"
          y=".341"
          width="411"
          height="169"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1773_12248" />
        </filter>
      </defs>
    </svg>
  );
};

export default Icon;
