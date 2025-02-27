import type { IconProps } from '../icons/props';

const Icon = ({ height = 20, width = 23.015, color = '#fff', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 23.015 20"
    >
      <g id="Group_14217" transform="translate(-486.758 -684.759)">
        <path
          id="Path_6424"
          fill="#ffac4d"
          d="M32.3 79.6a2.235 2.235 0 01-1.989-1.154 2.279 2.279 0 01.024-2.328l9.2-15.4a2.3 2.3 0 013.954.01l9.2 15.4a2.274 2.274 0 01.016 2.316 2.235 2.235 0 01-1.989 1.156z"
          transform="translate(456.759 625.161)"
        />
        <path
          id="Path_6426"
          d="M229.027 123.593v6.116a1.529 1.529 0 11-3.058 0v-6.116a1.529 1.529 0 113.058 0z"
          fill={color}
          transform="translate(270.767 565.877)"
        />
        <path
          id="Path_6428"
          d="M213.247 332.278a2.294 2.294 0 102.294 2.294 2.291 2.291 0 00-2.294-2.294z"
          fill={color}
          transform="translate(285.018 366.366)"
        />
      </g>
    </svg>
  );
};

export default Icon;
