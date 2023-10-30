import type { IconProps } from './props';
import { useThemeContext } from 'aave-ui-kit';

const Icon = ({ width = 20, height = 20, color = '', className }: IconProps) => {
  const { isCurrentThemeDark } = useThemeContext();
  const strokeColor = color ? color : isCurrentThemeDark ? '#B0B6CD' : '#475569';

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 0.867188H3C2.46957 0.867188 1.96086 1.0779 1.58579 1.45297C1.21071 1.82805 1 2.33675 1 2.86719V18.8672C1 19.3976 1.21071 19.9063 1.58579 20.2814C1.96086 20.6565 2.46957 20.8672 3 20.8672H15C15.5304 20.8672 16.0391 20.6565 16.4142 20.2814C16.7893 19.9063 17 19.3976 17 18.8672V6.86719M11 0.867188L17 6.86719M11 0.867188V6.86719H17M13 11.8672H5M13 15.8672H5M7 7.86719H5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
