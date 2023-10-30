import type { IconProps } from '../icons/props';

const Icon = ({ height = 16, width = 14.667, color = '#fff', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 14.667 16"
    >
      <defs></defs>
      <g id="copy" transform="translate(-1)">
        <path
          id="Path_12785"
          d="M15.667 17.333h-8A1.669 1.669 0 016 15.667v-10A1.669 1.669 0 017.667 4h8a1.669 1.669 0 011.667 1.667v10a1.669 1.669 0 01-1.667 1.666zm-8-12.667a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1v-10a1 1 0 00-1-1z"
          fill={color}
          transform="translate(-1.667 -1.333)"
        />
        <path
          id="Path_12786"
          d="M3.333 14h-.666A1.669 1.669 0 011 12.333V1.667A1.669 1.669 0 012.667 0h8a1.669 1.669 0 011.667 1.667.333.333 0 11-.667 0 1 1 0 00-1-1h-8a1 1 0 00-1 1v10.666a1 1 0 001 1h.667a.333.333 0 010 .667z"
          fill={color}
        />
        <path
          id="Path_12787"
          d="M15.667 16.667h-5.334a.333.333 0 010-.667h5.333a.333.333 0 110 .667z"
          fill={color}
          transform="translate(-3 -5.333)"
        />
        <path
          id="Path_12788"
          d="M15.667 20.667h-5.334a.333.333 0 110-.667h5.333a.333.333 0 110 .667z"
          fill={color}
          transform="translate(-3 -6.667)"
        />
        <path
          id="Path_12789"
          d="M15.667 12.667h-5.334a.333.333 0 010-.667h5.333a.333.333 0 110 .667z"
          fill={color}
          transform="translate(-3 -4)"
        />
        <path
          id="Path_12790"
          d="M15.667 8.667h-5.334a.333.333 0 010-.667h5.333a.333.333 0 110 .667z"
          fill={color}
          transform="translate(-3 -2.667)"
        />
      </g>
    </svg>
  );
};

export default Icon;
