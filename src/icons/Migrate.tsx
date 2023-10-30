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
        d="M15 18.8672V2.86719C15 2.33675 14.7893 1.82805 14.4142 1.45297C14.0391 1.0779 13.5304 0.867188 13 0.867188H9C8.46957 0.867188 7.96086 1.0779 7.58579 1.45297C7.21071 1.82805 7 2.33675 7 2.86719V18.8672M3 4.86719H19C20.1046 4.86719 21 5.76262 21 6.86719V16.8672C21 17.9718 20.1046 18.8672 19 18.8672H3C1.89543 18.8672 1 17.9718 1 16.8672V6.86719C1 5.76262 1.89543 4.86719 3 4.86719Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
