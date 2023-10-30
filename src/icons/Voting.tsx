import { useThemeContext } from 'aave-ui-kit';
import type { IconProps } from './props';

export default function Icon({ width = 20, height = 20, color = '' }: IconProps) {
  const { isCurrentThemeDark } = useThemeContext();

  const strokeColor = color ? color : isCurrentThemeDark ? '#B0B6CD' : '#475569';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 18.8672V16.8672C17 15.8063 16.5786 14.7889 15.8284 14.0388C15.0783 13.2886 14.0609 12.8672 13 12.8672H5C3.93913 12.8672 2.92172 13.2886 2.17157 14.0388C1.42143 14.7889 1 15.8063 1 16.8672V18.8672M23 18.8672V16.8672C22.9993 15.9809 22.7044 15.12 22.1614 14.4195C21.6184 13.719 20.8581 13.2188 20 12.9972M16 0.997188C16.8604 1.21749 17.623 1.71789 18.1676 2.4195C18.7122 3.12111 19.0078 3.98402 19.0078 4.87219C19.0078 5.76036 18.7122 6.62327 18.1676 7.32488C17.623 8.02649 16.8604 8.52689 16 8.74719M13 4.86719C13 7.07633 11.2091 8.86719 9 8.86719C6.79086 8.86719 5 7.07633 5 4.86719C5 2.65805 6.79086 0.867188 9 0.867188C11.2091 0.867188 13 2.65805 13 4.86719Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
