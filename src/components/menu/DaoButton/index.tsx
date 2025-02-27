import { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import OutLinkIcon from 'icons/OutLink';
import Link from 'components/basic/Link';
import { daoNavigation } from '../navigation';
import messages from './messages';

export default function DaoButton() {
  const intl = useIntl();
  const { isCurrentThemeDark, currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const [visible, setVisible] = useState(false);

  return (
    <DropdownWrapper
      withArrow={true}
      visible={visible}
      setVisible={setVisible}
      className="DaoButton"
      horizontalPosition="right"
      verticalPosition="bottom"
      buttonComponent={
        <button
          className={classNames('DaoButton__button', { DaoButton__buttonActive: visible })}
          onClick={() => setVisible(!visible)}
          type="button"
        >
          <i />
          {intl.formatMessage(messages.dao)}
        </button>
      }
    >
      <div className="DaoButton__content">
        <div className="DaoButton__links">
          {daoNavigation.map((link, index) => (
            <div
              key={index}
              className={classNames('DaoButton__link-inner', {
                DaoButton__linkHidden:
                  (!currentAccount && link.hiddenWithoutWallet) ||
                  (link.isVisible && !link.isVisible(currentMarketData)),
              })}
            >
              <Link
                className="DaoButton__link"
                to={link.link}
                inNewWindow={link.external}
                absolute={link.external}
                onClick={() => setVisible(false)}
              >
                {intl.formatMessage(link.title)}
                <OutLinkIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .DaoButton {
          .DropdownWrapper__content {
            top: calc(100% + 0px);
            right: unset;
            left: 0px;
          }
          .DropdownWrapper__icon {
            border-color: ${isCurrentThemeDark
              ? currentTheme.text.offset3
              : currentTheme.text.offset2};
            top: 26px;
          }

          .DropdownWrapper__icon__up {
            top: 30px;
          }

          &__button {
            font-size: 13px;
            position: relative;
            text-transform: capitalize;
            padding-right: 25px;
            padding-left: 10px;
            height: 64px;
            color: ${isCurrentThemeDark ? currentTheme.text.offset3 : currentTheme.text.offset2};

            i {
              position: absolute;
              left: 50%;
              transform: translateY(-4px) translateX(-50%);
              width: 0;
              top: 0;
              height: 4px;
              background: ${currentTheme.brand.main} !important;
              transition: all 0.4s ease;
              &:after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: inherit;
                transition: $transition;
              }
            }

            &:hover {
              font-weight: 600;
              color: ${isCurrentThemeDark ? currentTheme.text.main : currentTheme.text.offset2};
            }
          }

          &__buttonActive {
            font-weight: 600;
            i {
              width: 100% !important;
            }
          }

          &__content {
            width: 157px;
            padding: 10px 0;
            border-radius: $borderRadius;
            border: 1px solid ${currentTheme.interface.divider};
            background: ${isCurrentThemeDark ? '#090d0f' : '#f8fafc'};
          }

          &__links {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          &__link-inner {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 10px 20px;

            &:hover {
              background-color: ${currentTheme.background.main};
            }
          }

          &__linkHidden {
            display: none;
          }

          &__link {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 400;
            text-transform: capitalize;
            font-size: 14px;
            color: ${isCurrentThemeDark ? currentTheme.text.offset3 : currentTheme.text.offset2};

            & path {
              fill: ${currentTheme.text.offset2};
            }

            &:hover {
              color: ${currentTheme.text.main};
              font-weight: 600;
              & path {
                fill: ${currentTheme.text.main};
              }
            }
          }
        }
        .DaoButton:hover {
          .DropdownWrapper__icon {
            border-color: ${currentTheme.text.main};
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
