import type { IconProps } from './props';
import { useThemeContext } from 'aave-ui-kit';

const Icon = ({ height = 20, width = 20, color = '', className }: IconProps) => {
  const { isCurrentThemeDark } = useThemeContext();

  const strokeColor = color ? color : isCurrentThemeDark ? '#B0B6CD' : '#475569';

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.42202 3.02521C11.2986 0.147291 15.964 0.148403 18.8417 3.02521C21.7194 5.90202 21.7194 10.5678 18.8417 13.4457M15.7374 13.4979C15.7374 17.5679 12.4383 20.8672 8.36868 20.8672C4.29907 20.8672 1 17.5679 1 13.4979C1 9.42802 4.29907 6.12869 8.36868 6.12869C12.4383 6.12869 15.7374 9.42802 15.7374 13.4979Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
