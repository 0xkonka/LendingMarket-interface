import type { IconProps } from './props';

export default function Icon({ width = 20, height = 20, color = '#9199A5' }: IconProps) {
  return (
    <div className="SettingIcon">
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6667 5.83325H9.16666M11.6667 14.1666H4.16666"
          className="settingIconPath"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1667 16.6665C15.5474 16.6665 16.6667 15.5472 16.6667 14.1665C16.6667 12.7858 15.5474 11.6665 14.1667 11.6665C12.786 11.6665 11.6667 12.7858 11.6667 14.1665C11.6667 15.5472 12.786 16.6665 14.1667 16.6665Z"
          className="settingIconPath"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83333 8.33325C7.21404 8.33325 8.33333 7.21396 8.33333 5.83325C8.33333 4.45254 7.21404 3.33325 5.83333 3.33325C4.45262 3.33325 3.33333 4.45254 3.33333 5.83325C3.33333 7.21396 4.45262 8.33325 5.83333 8.33325Z"
          className="settingIconPath"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .SettingIcon:hover {
            cursor: pointer;

            .settingIconPath {
              stroke: #5f00fa;
            }
          }
        `}
      </style>
    </div>
  );
}
