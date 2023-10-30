import { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { DropdownWrapper, textCenterEllipsis, useThemeContext } from 'aave-ui-kit';

import { useMenuContext } from 'libs/menu';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import ConnectButton from 'components/ConnectButton';
import messages from './messages';
import OutlineButton from 'components/basic/OutlineButton';
import CircleCopyIcon from 'icons/CircleCopy';
import CircleOutLinkIcon from 'icons/CircleOutLink';
import LangSwitcher from 'components/basic/LangSwitcher';

export default function AddressInfo() {
  const intl = useIntl();
  const { isCurrentThemeDark, currentTheme } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();
  const { currentAccount, disconnectWallet } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  const [visible, setVisible] = useState(false);

  return (
    <div className="AddressInfo">
      {currentAccount ? (
        <DropdownWrapper
          visible={visible}
          setVisible={setVisible}
          horizontalPosition="right"
          verticalPosition="bottom"
          className="AddressInfo__dropdownWrapper"
          buttonComponent={
            <button
              className={classNames('AddressInfo__button', {
                AddressInfo__buttonActive: visible,
              })}
              onClick={() => setVisible(!visible)}
              type="button"
            >
              {textCenterEllipsis(currentAccount, 4, 4)}
            </button>
          }
        >
          <div className="AddressInfo__content">
            <div className="AddressInfo__account-info">
              <div className="AddressInfo__account-info-header">
                <p className="AddressInfo__account-info-header-title">
                  {intl.formatMessage(messages.account)}
                </p>
                <div className="AddressInfo__account-info-header-action">
                  <CircleCopyIcon />
                  <CircleOutLinkIcon />
                </div>
              </div>

              <div className="AddressInfo__account-info-address-container">
                <p className="AddressInfo__account-info-address">
                  {textCenterEllipsis(currentAccount, 4, 4)}
                  <br />
                  <span>{intl.formatMessage(messages.metamask)}</span>
                </p>
              </div>

              <OutlineButton
                type="button"
                color="third"
                size="small"
                fullWidth
                onClick={() => {
                  disconnectWallet();
                  closeMobileMenu();
                }}
              >
                {intl.formatMessage(messages.disconnect)}
              </OutlineButton>
            </div>

            <div className="AddressInfo__network-info">
              <div className="AddressInfo__network-info-title">
                {intl.formatMessage(messages.network)}:
              </div>
              <div className="AddressInfo__network-info-title">
                <div className="AddressInfo__network-info-green" />
                {networkConfig.name}
              </div>
            </div>

            <LangSwitcher />
          </div>
        </DropdownWrapper>
      ) : (
        <ConnectButton />
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';
        .AddressInfo {
          z-index: 99;

          &__button {
            color: ${isCurrentThemeDark ? currentTheme.text.offset1 : currentTheme.text.offset2};
            padding: 12px 16px;
            border-radius: 32px;
            border: 1px solid ${currentTheme.interface.tableBorder};
            font-family: 'Inter';
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;

            &:hover {
              background: ${currentTheme.background.main};
            }
          }

          &__content {
            width: 214px;
            border-radius: $borderRadius;
            border: 1px solid ${currentTheme.interface.divider};
            background: ${isCurrentThemeDark ? '#090d0f' : '#f8fafc'};
          }

          &__account-info {
            display: flex;
            flex-direction: column;
            padding: 8px 12px;
            border-bottom: 1px solid ${currentTheme.interface.divider};
          }

          &__account-info-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
          }

          &__account-info-header-title {
            font-weight: 600;
            font-size: 11px;
            color: ${currentTheme.text.offset2};
          }

          &__account-info-header-action {
            display: flex;
            gap: 3px;
          }

          &__account-info-address-container {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
          }

          &__account-info-address {
            font-weight: 600;
            font-size: 12px;
            color: ${currentTheme.text.main};
            & span {
              font-weight: 400;
              font-size: 10px;
              color: ${currentTheme.text.offset2};
            }
          }

          &__network-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
          }

          &__network-info-title {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 600;
            font-size: 11px;
            color: ${currentTheme.text.offset2};
          }

          &__network-info-green {
            width: 5px;
            height: 5px;
            border-radius: $borderRadius;
            background-color: ${currentTheme.text.positive};
          }
        }
      `}</style>
    </div>
  );
}
