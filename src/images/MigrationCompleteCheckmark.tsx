import type { IconProps } from '../icons/props';

const Icon = ({ height = 80, width = 80, color = '#F2F2F6', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 0C17.9063 0 0 17.9063 0 40C0 62.0938 17.9063 80 40 80C62.0938 80 80 62.0938 80 40C80 17.9063 62.0938 0 40 0ZM40 68.6094C24.2031 68.6094 11.3906 55.7969 11.3906 40C11.3906 24.2031 24.2031 11.3906 40 11.3906C55.7969 11.3906 68.6094 24.2031 68.6094 40C68.6094 55.7969 55.7969 68.6094 40 68.6094Z"
        fill="url(#paint0_linear_3710_26563)"
      />
      <path
        d="M80 40C80 17.9063 62.0938 0 40 0C33.9844 0 28.2656 1.32812 23.1406 3.71875C20.125 5.28125 18.125 6.51563 18.125 6.51563C45.0469 -0.5 58.7188 18.0781 59.2812 18.8594C65.0156 24.0938 68.6094 31.625 68.6094 40C68.6094 55.7969 55.7969 68.6094 40 68.6094C32.625 68.6094 25.9063 65.8125 20.8281 61.2344C28.5938 70.375 39.75 77.6719 50.8125 78.5156C67.6563 73.8125 80 58.3438 80 40Z"
        fill="url(#paint1_linear_3710_26563)"
      />
      <path
        d="M73.3333 39.7327C73.3333 58.1422 58.4095 73.0661 40 73.0661C21.5905 73.0661 6.66666 58.1422 6.66666 39.7327C6.66666 21.3233 21.5905 6.39941 40 6.39941C58.4095 6.39941 73.3333 21.3233 73.3333 39.7327Z"
        fill={color}
      />
      <path
        d="M51.7935 32L35.4354 48.3581L27.9999 40.9226"
        stroke="#5F00FA"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3710_26563"
          x1="67.1194"
          y1="-1.83312"
          x2="11.7246"
          y2="83.6164"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1028" stopColor="#00FFAA" />
          <stop offset="0.999" stopColor="#5F00FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3710_26563"
          x1="-0.575609"
          y1="78.7594"
          x2="81.9244"
          y2="0.842733"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1028" stopColor="#00FFAA" />
          <stop offset="0.999" stopColor="#5F00FA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
