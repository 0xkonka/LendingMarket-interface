import type { IconProps } from './props';
import { useThemeContext } from 'aave-ui-kit';

const Icon = ({ height = 18, width = 18, color = '#FFFFFF', className }: IconProps) => {
  const { isCurrentThemeDark } = useThemeContext();

  const stopColor1 = isCurrentThemeDark ? '#00EC9D' : '#C800FA';
  const stopColor2 = isCurrentThemeDark ? '#4C95C7' : '#5F00FA';
  const stopColor3 = isCurrentThemeDark ? '#8134FF' : '#4C00C7';

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M77.0115 77.023H0V68.4661H77.0115V77.023ZM21.3921 29.9604H4.27842V59.9093H21.3921V29.9604ZM47.0626 0.0114746H29.9489V59.9093H47.0626V0.0114746ZM72.7331 12.8467H55.6194V59.9093H72.7331V12.8467Z"
        fill="url(#hover_linear)"
      />
      <defs>
        <linearGradient
          id="hover_linear"
          x1="75.7727"
          y1="-9.44617"
          x2="-3.45157"
          y2="-7.36889"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stopColor1} />
          <stop offset="0.51007" stopColor={stopColor2} />
          <stop offset="1" stopColor={stopColor3} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
