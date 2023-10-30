import type { IconProps } from './props';

export default function Icon({ width = 14, height = 14, color = '#FFFFFF', className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="11" width="18" height="10" fill={color} />
      <path
        d="M5 10.005V6.00504C4.99875 4.76509 5.45828 3.56891 6.28937 2.64871C7.12047 1.72851 8.5025 1.00001 10 1C11.5025 1 12.9725 1.4987 13.938 2.64871C14.7353 3.59836 15 4.5 15 6.00504V10.005M15 10.005H3C1.89543 10.005 1 10.9005 1 12.005V19.0051C1 20.1096 1.89543 21.0051 3 21.0051H17C18.1046 21.0051 19 20.1096 19 19.0051V12.005C19 10.9005 18.1046 10.005 17 10.005H15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
