import { ReactNode } from 'react';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';

interface DesktopPageTitleProps {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
}

export default function DesktopPageTitle({ title, subTitle }: DesktopPageTitleProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="DesktopPageTitle">
      <h2>
        <div>{title}</div> <span className="DesktopPageTitle__subTitle">{subTitle}</span>
      </h2>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .DesktopPageTitle {
          h2 {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
