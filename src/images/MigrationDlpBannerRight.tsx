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
      <g clipPath="url(#clip0_4677_29455)">
        <path
          d="M118 100.5C118-10.797 27.797-101-83.5-101S-285-10.797-285 100.5-194.797 302-83.5 302 118 211.797 118 100.5zm-345.62 0c0-79.577 64.543-144.12 144.12-144.12S60.62 20.923 60.62 100.5-3.923 244.62-83.5 244.62s-144.12-64.543-144.12-144.12z"
          fill="url(#paint0_linear_4677_29455)"
        />
        <path
          d="M-83.5 302C27.797 302 118 211.797 118 100.5c0-30.304-6.69-59.112-18.733-84.93C91.396.38 85.177-9.694 85.177-9.694c35.342 135.619-58.246 204.491-62.181 207.324-26.368 28.886-64.307 46.99-106.496 46.99-79.577 0-144.12-64.543-144.12-144.12 0-37.152 14.09-70.997 37.152-96.578-46.046 39.119-82.804 95.319-87.054 151.046C-253.83 239.818-175.907 302-83.5 302z"
          fill="url(#paint1_linear_4677_29455)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4677_29455"
          x1="127.234"
          y1="237.114"
          x2="-303.217"
          y2="-41.938"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4677_29455"
          x1="-278.75"
          y1="-103.9"
          x2="113.755"
          y2="311.694"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <clipPath id="clip0_4677_29455">
          <path fill="#fff" transform="rotate(90 48 48)" d="M0 0h200v96H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
