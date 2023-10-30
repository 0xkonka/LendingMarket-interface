import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

import { useLanguageContext } from 'libs/language-provider';
import DesktopPageTitle from 'components/DesktopPageTitle';
import { useHeaderTitle } from '../ScreensWrapper';
import staticStyles from './style';

// Pages where the banners should be displayed
export const DISPLAY_BRIDGE_BANNER_PAGES = [];

interface ScreenWrapperProps {
  pageTitle?: string;
  isTitleOnDesktop?: boolean;
  titleComponent?: ReactNode;
  className?: string;
  withMobileGrayBg?: boolean;
  subTitle?: string | ReactNode;
  subHeaderNode?: ReactNode;
  children: ReactNode;
}

export default function ScreenWrapper({
  pageTitle,
  isTitleOnDesktop,
  titleComponent,
  className,
  withMobileGrayBg,
  subTitle,
  subHeaderNode,
  children,
}: ScreenWrapperProps) {
  const { currentLangSlug } = useLanguageContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const location = useLocation();
  const { setTitle } = useHeaderTitle();

  useEffect(() => {
    pageTitle && setTitle(pageTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangSlug, location.pathname]);

  // @ts-ignore
  return (
    <section
      className={classNames('ScreenWrapper', className, {
        ScreenWrapper__withDesktopTitle: isTitleOnDesktop,
      })}
    >
      {subHeaderNode && subHeaderNode}
      <br />
      {isTitleOnDesktop && (pageTitle || titleComponent) && (
        <DesktopPageTitle
          title={!!titleComponent ? titleComponent : pageTitle}
          subTitle={subTitle}
        />
      )}
      {subTitle && <div className="ScreenWrapper__mobileSubTitle">{subTitle}</div>}

      {children}

      <div className="ScreenWrapper__mobile-bottomBorder">
        <p>i</p>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>
        {`
          @import 'src/_mixins/screen-size';
          .ScreenWrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            @include respond-to(sm) {
              background: ${withMobileGrayBg
                ? currentTheme.mainBg.hex
                : isCurrentThemeDark
                ? currentTheme.mainBg.hex
                : currentTheme.white.hex};
            }

            &__mobileSubTitle {
              color: ${currentTheme.textDarkBlue.hex};
              background: ${currentTheme.whiteElement.hex};
            }
          }
        `}
      </style>
    </section>
  );
}
