import { useThemeContext } from 'aave-ui-kit';
import type { IconProps } from './props';
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
        d="M21 9.86719H17L14 18.8672L8 0.867188L5 9.86719H1"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
