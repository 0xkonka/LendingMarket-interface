import type { IconProps } from '../icons/props';

const Icon = ({ height = 200, width = 96, color = '', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 96 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4677_29458)">
        <path
          d="M380 100.5C380-10.797 289.797-101 178.5-101S-23-10.797-23 100.5 67.203 302 178.5 302 380 211.797 380 100.5zm-345.62 0c0-79.577 64.543-144.12 144.12-144.12S322.62 20.923 322.62 100.5 258.077 244.62 178.5 244.62 34.38 180.077 34.38 100.5z"
          fill="url(#paint0_linear_4677_29458)"
        />
        <path
          d="M178.5 302C289.797 302 380 211.797 380 100.5c0-30.304-6.69-59.112-18.733-84.93C353.396.38 347.178-9.694 347.178-9.694c35.341 135.619-58.247 204.491-62.182 207.324-26.368 28.887-64.307 46.991-106.496 46.991-79.577 0-144.12-64.543-144.12-144.12 0-37.152 14.09-70.997 37.152-96.578C25.486 43.04-11.272 99.24-15.522 154.968 8.17 239.818 86.093 302 178.5 302z"
          fill="url(#paint1_linear_4677_29458)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4677_29458"
          x1="389.234"
          y1="237.114"
          x2="-41.217"
          y2="-41.938"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4677_29458"
          x1="-16.75"
          y1="-103.9"
          x2="375.755"
          y2="311.694"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <clipPath id="clip0_4677_29458">
          <path fill="#fff" transform="rotate(90 48 48)" d="M0 0h200v96H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
