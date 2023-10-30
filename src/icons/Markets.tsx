import type { IconProps } from './props';
import { useThemeContext } from 'aave-ui-kit';
export default function Icon({ width = 20, height = 20, color = '' }: IconProps) {
  const { isCurrentThemeDark } = useThemeContext();

  const strokeColor = color ? color : isCurrentThemeDark ? '#B0B6CD' : '#475569';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 11C21 16.5228 16.5228 21 11 21M21 11C21 5.47715 16.5228 1 11 1M21 11H1M11 21C5.47715 21 1 16.5228 1 11M11 21C13.5013 18.2616 14.9228 14.708 15 11C14.9228 7.29203 13.5013 3.73835 11 1M11 21C8.49872 18.2616 7.07725 14.708 7 11C7.07725 7.29203 8.49872 3.73835 11 1M1 11C1 5.47715 5.47715 1 11 1"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
