import type { IconProps } from './props';

export default function Icon({ width = 9, height = 9, color = '#475167' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 0V1H7.295L2.38 5.915L3.085 6.62L8 1.705V3.5H9V0M8 8H1V1H4.5V0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V4.5H8V8Z"
        fill={color}
      />
    </svg>
  );
}
