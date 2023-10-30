import { useThemeContext, ThemeNames } from 'aave-ui-kit';

import DARK_MODE_ICON from 'images/icon/DarkMode';
import LIGHT_MODE_ICON from 'images/icon/LightMode';

export default function ThemeSwitch() {
  const { isCurrentThemeDark, changeTheme } = useThemeContext();

  return (
    <>
      <div
        className="ThemeSwitch"
        onClick={() => changeTheme(isCurrentThemeDark ? ThemeNames.default : ThemeNames.dark)}
      >
        {isCurrentThemeDark ? (
          <LIGHT_MODE_ICON className="theme-icon" />
        ) : (
          <DARK_MODE_ICON className="theme-icon" />
        )}
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';

          .ThemeSwitch {
            display: flex;
            padding: 8px;
            cursor: pointer;
            opacity: 0.9;

            &:hover {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
