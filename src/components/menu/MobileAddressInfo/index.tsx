import { useIntl } from 'react-intl';
import { textCenterEllipsis, useThemeContext } from 'aave-ui-kit';

import { useMenuContext } from 'libs/menu';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import ConnectButton from 'components/ConnectButton';
import messages from './messages';
import OutlineButton from 'components/basic/OutlineButton';
import MobileMarketSwitcher from '../MobileMarketSwitcher';

export default function MobileAddressInfo() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();
  const { currentAccount, disconnectWallet } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <div className="MobileAddressInfo">
      {currentAccount ? (
        <div className="MobileAddressInfo__content">
          <div className="MobileAddressInfo__account-info">
            <div className="MobileAddressInfo__account-info-address-container">
              <p className="MobileAddressInfo__account-info-address">
                {textCenterEllipsis(currentAccount, 4, 4)}
                <br />
                <span>{intl.formatMessage(messages.metamask)}</span>
              </p>
            </div>

            <div className="MobileAddressInfo__switcher">
              <MobileMarketSwitcher />
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

          <div className="MobileAddressInfo__network-info">
            <div className="MobileAddressInfo__network-info-title">
              {intl.formatMessage(messages.network)}:
            </div>
            <div className="MobileAddressInfo__network-info-title">
              <div className="MobileAddressInfo__network-info-green" />
              {networkConfig.name}
            </div>
          </div>
        </div>
      ) : (
        <ConnectButton className="MobileAddressInfo__wallet-connect" />
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';
        .MobileAddressInfo {
          &__content {
            width: 100%;
          }

          &__account-info {
            display: flex;
            flex-direction: column;
            padding: 8px 12px;
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
            font-size: 15px;
            color: ${currentTheme.text.main};
            & span {
              font-weight: 400;
              font-size: 12px;
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

          &__wallet-connect {
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}
