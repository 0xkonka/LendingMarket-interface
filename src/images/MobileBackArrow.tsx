import type { IconProps } from '../icons/props';

const Icon = ({ height = 20, width = 20, color = '#fff', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
    >
      <g fill="none" stroke={color}>
        <rect width="20" height="20" rx="10" stroke="none" />
        <rect width="19" height="19" x=".5" y=".5" rx="9.5" />
      </g>
      <path
        fill={color}
        d="M7.001 9.999a.559.559 0 01.164-.4l3.436-3.435a.563.563 0 01.8.792L8.353 9.999l3.048 3.044a.56.56 0 01-.792.792l-3.44-3.44a.559.559 0 01-.168-.396z"
      />
    </svg>
  );
};

export default Icon;
