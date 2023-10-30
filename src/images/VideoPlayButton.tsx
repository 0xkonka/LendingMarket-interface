import type { IconProps } from '../icons/props';

const Icon = ({ height = 56, width = 56, color = '', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="28" fill="white" fill-opacity="0.8" />
      <rect
        width="56"
        height="56"
        rx="28"
        fill="url(#paint0_radial_2084_18134)"
        fill-opacity="0.3"
      />
      <rect
        width="56"
        height="56"
        rx="28"
        fill="url(#paint1_radial_2084_18134)"
        fill-opacity="0.8"
      />
      <rect
        width="56"
        height="56"
        rx="28"
        fill="url(#paint2_radial_2084_18134)"
        fill-opacity="0.3"
      />
      <path
        d="M20.2221 19.2984C20.2221 17.7588 21.8888 16.7965 23.2221 17.5663L37.7554 25.9571C39.0888 26.7269 39.0888 28.6514 37.7555 29.4212L23.2221 37.8121C21.8888 38.5819 20.2221 37.6196 20.2221 36.08L20.2221 19.2984Z"
        fill="black"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2084_18134"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(27.2222 1.10178e-06) rotate(90) scale(32.7617)"
        >
          <stop stopColor="#0896FD" />
          <stop offset="1" stopColor="white" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_2084_18134"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(70.38 39.95) rotate(171.699) scale(46.9833 119.787)"
        >
          <stop stopColor="#5274F2" />
          <stop offset="1" stopColor="white" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_2084_18134"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.66667 27.1731) rotate(43.9919) scale(24.0157 41.0541)"
        >
          <stop stopColor="#03DDAD" />
          <stop offset="1" stopColor="white" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Icon;
