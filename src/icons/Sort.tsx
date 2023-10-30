import { useThemeContext } from 'aave-ui-kit';
import type { IconProps } from './props';

export default function Icon({ color = '' }: IconProps) {
  const { isCurrentThemeDark } = useThemeContext();

  const strokeColor = color ? color : isCurrentThemeDark ? '#EBE9F2' : '#EBE9F2';

  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 7.77307L3.23712 13.0029L6.59212 7.77307H0Z" fill={strokeColor} />
      <path
        d="M6.59232 5.66647L3.35519 0.436678L0.000193115 5.66647L6.59232 5.66647Z"
        fill={strokeColor}
      />
    </svg>
  );
}
