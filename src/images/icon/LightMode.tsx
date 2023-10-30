import type { IconProps } from '../../icons/props';

const Icon = ({ height = 19, width = 19, color = '#fff', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.167 14.167a5 5 0 110-10 5 5 0 010 10zM8.333 0H10v2.5H8.333V0zm0 15.833H10v2.5H8.333v-2.5zM2.096 3.274l1.178-1.178 1.768 1.767-1.179 1.179-1.767-1.768zM13.292 14.47l1.178-1.178 1.768 1.767-1.179 1.179-1.767-1.768zm1.767-12.375l1.179 1.18-1.768 1.767-1.178-1.179 1.767-1.767v-.001zM3.863 13.292l1.179 1.178-1.768 1.768-1.178-1.179 1.767-1.767zm14.47-4.959V10h-2.5V8.333h2.5zm-15.833 0V10H0V8.333h2.5z"
        fill={color}
      />
    </svg>
  );
};

export default Icon;
