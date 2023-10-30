import type { IconProps } from '../../icons/props';

const Icon = ({ color = '#FFFFFF', className }: IconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 500 500"
      className={className}
      xmlSpace="preserve"
    >
      <g>
        <defs>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="251.9952"
            y1="412.9505"
            x2="251.9952"
            y2="88.3465"
            gradientTransform="matrix(-1 0 0 -1 503.9905 501.3302)"
          >
            <stop offset="0.1028" stopColor="#00FFAA" />
            <stop offset="0.999" stopColor="#5F00FA" />
          </linearGradient>
        </defs>
        <ellipse cx="252" cy="250.67" rx="166.27" ry="163.61" fill="url(#SVGID_1_)" />
      </g>
      <polygon
        style={{ fill: color }}
        points="288.11,265.79 383.94,250 288.11,234.21 344.71,155.29 265.79,211.89 250,116.06 234.21,211.89
        155.29,155.29 211.89,234.21 116.06,250 211.89,265.79 155.29,344.71 234.21,288.11 250,383.94 265.79,288.11 344.71,344.71"
      />
    </svg>
  );
};

export default Icon;
