import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import Background from 'images/BackgroundSvg';
import BackgroundDark from 'images/BackgroundDark';
import messages from './messages';
import staticStyles from './style';

interface PreloaderProps {
  withText?: boolean;
  caption?: string;
  subCaption?: string;
  subDescription?: string;
  smallSize?: boolean;
  forwardRef?: React.Ref<any>;
  withBackground?: boolean;
}

export default function Preloader({
  withText,
  caption,
  subCaption,
  subDescription,
  smallSize,
  forwardRef,
  withBackground,
}: PreloaderProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div
      className={classNames('Preloader', {
        PreloaderSmall: smallSize,
        Preloader__withBackground: withBackground,
      })}
      ref={forwardRef}
    >
      {withText && (
        <div className="Preloader__text">
          <h4>{intl.formatMessage(messages.caption)}</h4>
          <p>{intl.formatMessage(messages.description)}</p>
        </div>
      )}

      {!!caption && (
        <div className="Preloader__text">
          <h4>{caption}</h4>
        </div>
      )}

      <div className="Preloader__dots">
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
      </div>

      {!!subCaption && !!subDescription && (
        <div className="Preloader__sub-text">
          <h4>{subCaption}</h4>
          <p>{subDescription}</p>
        </div>
      )}

      {withBackground && (
        <div className="Preloader__background">
          {isCurrentThemeDark ? <BackgroundDark /> : <Background />}
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Preloader {
          &__withBackground {
            background: ${currentTheme.mainBg.hex};
          }

          &__text {
            h4 {
              color: ${currentTheme.brand.main};
            }
            p {
              color: ${currentTheme.text.main};
            }
          }

          &__dot {
            background: ${currentTheme.brand.main};

            &:nth-child(1) {
              animation: animation 3s linear infinite 0s;
            }
            &:nth-child(2) {
              animation: animation 3s linear infinite 0.15s;
            }
            &:nth-child(3) {
              animation: animation 3s linear infinite 0.3s;
            }
            &:nth-child(4) {
              animation: animation 3s linear infinite 0.45s;
            }
          }

          &__sub-text {
            h4 {
              color: ${currentTheme.text.main};
            }
            p {
              color: ${currentTheme.text.main};
            }
          }
        }

        @keyframes animation {
          0% {
            opacity: 0;
            transform: scale(0.5);
            background: ${currentTheme.brand.mainOffset1};
          }
          25% {
            opacity: 1;
            transform: scale(1.25);
            background: ${currentTheme.brand.main};
          }
          50% {
            opacity: 0;
            transform: scale(0.5);
            background: ${currentTheme.brand.mainOffset1};
          }
          75% {
            opacity: 1;
            transform: scale(1.25);
            background: ${currentTheme.brand.main};
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
