import type { IconProps } from './props';

export default function Icon({ width = 15, height = 15, color = '#475569' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55556 14.7803C1.12778 14.7803 0.761444 14.6281 0.456555 14.3237C0.152185 14.0188 0 13.6525 0 13.2247V10.1136H1.55556V13.2247H12.4444V2.33583H1.55556V5.44694H0V2.33583C0 1.90805 0.152185 1.54172 0.456555 1.23683C0.761444 0.932459 1.12778 0.780273 1.55556 0.780273H12.4444C12.8722 0.780273 13.2386 0.932459 13.5434 1.23683C13.8478 1.54172 14 1.90805 14 2.33583V13.2247C14 13.6525 13.8478 14.0188 13.5434 14.3237C13.2386 14.6281 12.8722 14.7803 12.4444 14.7803H1.55556ZM5.83333 11.6692L4.74444 10.5414L6.72778 8.55805H0V7.0025H6.72778L4.74444 5.01916L5.83333 3.89138L9.72222 7.78027L5.83333 11.6692Z"
        fill={color}
      />
    </svg>
  );
}
