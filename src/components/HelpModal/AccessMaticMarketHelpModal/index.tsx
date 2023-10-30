import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import Link from 'components/basic/Link';
import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';
import LinkIcon from 'images/BlueLinkIcon';
import messages from './messages';
import staticStyles from './style';

export default function AccessMaticMarketHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
}: HelpModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <HelpModalWrapper
        text={text}
        iconSize={iconSize}
        className={classNames('AccessMaticMarketHelpModal', className)}
        caption={intl.formatMessage(messages.caption)}
        modalClassName="AccessMaticMarketHelpModal__modal"
        description={
          <div className="AccessMaticMarketHelpModal__content">
            <p>{intl.formatMessage(messages.description)}</p>

            <Link
              to="https://docs.matic.network/docs/develop/metamask/config-matic/"
              absolute={true}
              inNewWindow={true}
              color="dark"
            >
              <p>{intl.formatMessage(messages.steps)}</p>
              <LinkIcon />
            </Link>
          </div>
        }
        color={color}
        lightWeight={lightWeight}
        onWhiteBackground={false}
        clickOnText={true}
        captionColor="dark"
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ReactModal__Content.AccessMaticMarketHelpModal__modal {
          background: ${currentTheme.whiteElement.hex};
        }

        .AccessMaticMarketHelpModal__content {
          .Link {
            background: ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </>
  );
}
