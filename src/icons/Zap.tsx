import type { IconProps } from './props';

export default function Icon({ width = 14, height = 14, color = 'white' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.755371 16.6216L13.4947 0L8.80125 13.3784H13.4947L0.755371 30L5.11356 16.6216H0.755371Z"
        fill={color}
      />
    </svg>
  );
}
