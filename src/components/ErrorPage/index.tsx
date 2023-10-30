import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import ContainedButton from 'components/basic/ContainedButton';
import Background from 'images/BackgroundSvg';
import BackgroundDark from 'images/BackgroundDark';
import errorImage from './images/errorImage.svg';
import mobileErrorImage from './images/mobileErrorImage.svg';
import messages from './messages';
import staticStyles from './style';

type ErrorPageProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  buttonType?: 'reload' | 'back';
  image?: boolean;
};

export default function ErrorPage({
  image,
  title,
  description,
  buttonType,
  children,
}: ErrorPageProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="ErrorPage">
      <div className="ErrorPage__content">
        {image && (
          <div className="ErrorPage__image-inner">
            <img src={sm ? mobileErrorImage : errorImage} alt="Error" />
          </div>
        )}

        {title && <h2 className="ErrorPage__title">{title}</h2>}

        {description && <p className="ErrorPage__description">{description}</p>}

        {children}

        <div className="ErrorPage__buttons-inner">
          {buttonType === 'reload' && (
            <ContainedButton onClick={() => window.location.reload()}>
              {intl.formatMessage(messages.buttonReload)}
            </ContainedButton>
          )}
          {buttonType === 'back' && (
            <ContainedButton onClick={history.goBack}>
              {intl.formatMessage(messages.buttonBack)}
            </ContainedButton>
          )}
        </div>
      </div>

      <div className="ErrorPage__background">
        {isCurrentThemeDark ? <BackgroundDark /> : <Background />}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ErrorPage {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.mainBg.hex};
          &__title {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
