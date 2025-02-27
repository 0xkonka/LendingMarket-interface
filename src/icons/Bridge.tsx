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
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.94356 11.9336C9.37301 12.5077 9.92092 12.9827 10.5501 13.3265C11.1793 13.6703 11.8751 13.8747 12.5902 13.9259C13.3054 13.9771 14.0231 13.8739 14.6949 13.6233C15.3667 13.3728 15.9767 12.9806 16.4836 12.4736L19.4836 9.47356C20.3944 8.53055 20.8983 7.26754 20.8869 5.95655C20.8755 4.64557 20.3497 3.39151 19.4227 2.46447C18.4956 1.53743 17.2415 1.01158 15.9306 1.00019C14.6196 0.988797 13.3566 1.49277 12.4136 2.40356L10.6936 4.11356M12.9436 9.93356C12.5141 9.35943 11.9662 8.88438 11.337 8.54062C10.7078 8.19686 10.0121 7.99244 9.29691 7.94123C8.58177 7.89001 7.86397 7.99319 7.19221 8.24378C6.52045 8.49436 5.91044 8.88649 5.40356 9.39356L2.40356 12.3936C1.49277 13.3366 0.988797 14.5996 1.00019 15.9106C1.01158 17.2216 1.53743 18.4756 2.46447 19.4027C3.39151 20.3297 4.64557 20.8555 5.95655 20.8669C7.26754 20.8783 8.53055 20.3744 9.47356 19.4636L11.1836 17.7536"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
