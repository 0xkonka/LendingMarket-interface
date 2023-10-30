import type { IconProps } from '../../icons/props';

const Icon = ({ height = 24, width = 24, color = '#fff', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2334_16193)">
        <path
          d="M12.1999 23.6004C18.7169 23.6004 23.9999 18.4069 23.9999 12.0004C23.9999 5.59389 18.7169 0.400391 12.1999 0.400391C5.68294 0.400391 0.399902 5.59389 0.399902 12.0004C0.399902 18.4069 5.68294 23.6004 12.1999 23.6004Z"
          fill="url(#paint0_linear_2334_16193)"
        />
        <path
          d="M14.6177 13.0844L21.2 11.9998L14.6177 10.9152L18.5054 5.49441L13.0846 9.38212L12 2.7998L10.9155 9.38212L5.49466 5.49441L9.38237 10.9152L2.80005 11.9998L9.38237 13.0844L5.49466 18.5052L10.9155 14.6175L12 21.1998L13.0846 14.6175L18.5054 18.5052L14.6177 13.0844Z"
          fill={color}
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2334_16193"
          x1="12.1996"
          y1="0.493958"
          x2="12.1996"
          y2="23.5085"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1028" stopColor="#00FFAA" />
          <stop offset="0.999" stopColor="#5F00FA" />
        </linearGradient>
        <clipPath id="clip0_2334_16193">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
