import type { IconProps } from '../../icons/props';

const Icon = ({ height = 75, width = 75, color = '#fff', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 75 75"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="a"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="6"
        width="63"
        height="63"
      >
        <path
          d="M68.75 37.5c0 17.259-13.991 31.25-31.25 31.25S6.25 54.759 6.25 37.5 20.241 6.25 37.5 6.25 68.75 20.241 68.75 37.5z"
          fill={color}
        />
      </mask>
      <g mask="url(#a)">
        <path
          d="M56.25 5.024C38.312-5.333 15.38.812 5.024 18.75-5.332 36.688.812 59.62 18.75 69.976c17.938 10.356 40.87 4.212 51.226-13.726C80.333 38.312 74.188 15.38 56.25 5.024zM24.09 60.728c-12.826-7.405-17.222-23.813-9.818-36.639 7.405-12.825 23.814-17.222 36.639-9.817 12.825 7.405 17.222 23.813 9.817 36.639-7.404 12.825-23.813 17.222-36.638 9.817z"
          fill="url(#paint0_linear_2731_20381)"
        />
        <path
          d="M69.976 56.25C80.333 38.312 74.188 15.38 56.25 5.024A37.306 37.306 0 0040.82.14c-3.182-.145-5.384-.08-5.384-.08 25.146 6.924 27.538 28.416 27.629 29.314 2.202 6.938 1.59 14.737-2.337 21.537-7.404 12.825-23.813 17.222-36.638 9.817-5.988-3.457-10.132-8.877-12.109-14.975 2.02 11.062 7.658 22.215 16.244 28.086 15.88 4.077 33.153-2.696 41.751-17.59z"
          fill="url(#paint1_linear_2731_20381)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2731_20381"
          x1="79.128"
          y1="16.248"
          x2="-5.902"
          y2="59.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2731_20381"
          x1="-13.611"
          y1="49.949"
          x2="89.894"
          y2="25.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
