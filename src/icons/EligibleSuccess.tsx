import type { IconProps } from './props';
export default function Icon({ width = 16, height = 16, color = '#039855', className }: IconProps) {
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
        d="M15 7.36V8.004C14.9991 9.5135 14.5103 10.9823 13.6065 12.1913C12.7027 13.4003 11.4323 14.2847 9.98475 14.7127C8.5372 15.1407 6.99008 15.0893 5.57413 14.5662C4.15818 14.0431 2.94926 13.0763 2.12767 11.8099C1.30609 10.5436 0.915854 9.04565 1.01517 7.53942C1.11449 6.0332 1.69804 4.59943 2.6788 3.45196C3.65955 2.30448 4.98495 1.50477 6.45733 1.17211C7.92971 0.839444 9.47019 0.991643 10.849 1.60601M15 2.40401L8 9.411L5.9 7.311"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
