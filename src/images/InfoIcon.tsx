import type { IconProps } from '../icons/props';

const Icon = ({ height = 16, width = 16, color = '#5F00FA', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00008 12.8337C3.77833 12.8337 1.16675 10.2221 1.16675 7.00033C1.16675 3.77858 3.77833 1.16699 7.00008 1.16699C10.2218 1.16699 12.8334 3.77858 12.8334 7.00033C12.8334 10.2221 10.2218 12.8337 7.00008 12.8337ZM6.41675 6.41699V9.91699H7.58341V6.41699H6.41675ZM6.41675 4.08366V5.25033H7.58341V4.08366H6.41675Z"
        fill={color}
      />
    </svg>
  );
};

export default Icon;
