import type { IconProps } from './props';

export default function Icon({ width = 14, height = 14, color = 'white', className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.21513 8.4449V5.41702C4.21419 4.47841 4.56204 3.57294 5.19115 2.87638C5.82026 2.17981 6.68576 1.74186 7.61961 1.64753C8.55346 1.5532 9.48905 1.80923 10.2448 2.36591C11.0005 2.92259 11.5224 3.74021 11.7091 4.66005M2.7012 8.4449H13.2988C14.1349 8.4449 14.8127 9.12271 14.8127 9.95884V15.2576C14.8127 16.0938 14.1349 16.7716 13.2988 16.7716H2.7012C1.86507 16.7716 1.18726 16.0938 1.18726 15.2576V9.95884C1.18726 9.12271 1.86507 8.4449 2.7012 8.4449Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
