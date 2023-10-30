import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';
import { useIntl } from 'react-intl';
import OpenArrow from 'icons/OpenArrow';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  CustomMarket,
} from 'helpers/config/markets-and-network-config';
import CheckIcon from 'icons/Check';
import switchNetwork from 'components/TxConfirmationView/NetworkMismatch/switchNetwork';
import useIsNetworkAddable from 'components/TxConfirmationView/NetworkMismatch/useIsNetworkAddable';
import { ADD_CONFIG } from 'components/TxConfirmationView/NetworkMismatch';
import { CHAIN_ID_TO_NETWORKNAME } from 'ui-config/markets';
import messages from './messages';

interface MarketSwitcherProps {
  toTop?: boolean;
  className?: string;
}

export default function MarketSwitcher({ toTop, className }: MarketSwitcherProps) {
  const intl = useIntl();
  const { isCurrentThemeDark, currentTheme, sm } = useThemeContext();
  const { currentMarket, setCurrentMarket, currentMarketData, networkConfig } =
    useProtocolDataContext();
  const { currentProviderName } = useUserWalletDataContext();
  const isAddable = useIsNetworkAddable(currentProviderName);

  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, [setVisible]);

  const { ethereum } = window as any;
  if (ethereum && ethereum.on) {
    const handleChainChanged = (_chainId: string) => {
      let chainId = parseInt(_chainId, 16);

      if (localStorage.getItem('currentProvider') === 'wallet-connect') {
        chainId = parseInt(localStorage.getItem('wallet-connect-chain-id') ?? chainId.toString());
      }

      if (CHAIN_ID_TO_NETWORKNAME[chainId]) {
        setCurrentMarket(CHAIN_ID_TO_NETWORKNAME[chainId]);
      }
    };

    ethereum.request({ method: 'eth_chainId' }).then(handleChainChanged);
    ethereum.on('chainChanged', handleChainChanged);
  }

  const handleSetCurrentMarket = useCallback(
    (market: CustomMarket) => {
      setCurrentMarket(market);
      setVisible(false);

      const neededChainId = marketsData[market].chainId;
      const config = ADD_CONFIG[neededChainId];

      const { publicJsonRPCWSUrl, rpcUrl } = getNetworkConfig(neededChainId);
      if (isAddable && config) {
        switchNetwork({
          neededChainId,
          chainName: config.name,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: [...rpcUrl, publicJsonRPCWSUrl],
          blockExplorerUrls: config.explorerUrls,
        });
      }
    },
    [isAddable, setCurrentMarket, setVisible]
  );

  return (
    <DropdownWrapper
      className={classNames('MarketSwitcher', className)}
      horizontalPosition={sm ? 'center' : 'right'}
      verticalPosition={toTop ? 'top' : 'bottom'}
      visible={visible}
      setVisible={setVisible}
      buttonComponent={
        <button
          className={classNames('MarketSwitcher__button', {
            MarketSwitcher__buttonActive: visible,
          })}
          onClick={toggleVisible}
          type="button"
        >
          <img
            className="MarketSwitcher__button-subLogo"
            src={currentMarketData.subLogo}
            alt="chain-logo"
          />
          <span>{networkConfig.name}</span>
          <div className="MarketSwitcher__button-horizontalDivider"></div>
          <OpenArrow
            className={visible ? 'MarketSwitcher__button-arrowExpanded' : ''}
            color={currentTheme.text.offset1}
            width={10}
            height={10}
          ></OpenArrow>
        </button>
      }
    >
      <div className="MarketSwitcher__content">
        <p className="MarketSwitcher__title">{intl.formatMessage(messages.selectNetwork)}:</p>

        {availableMarkets.map((market) => {
          const marketData = marketsData[market];
          const config = getNetworkConfig(marketData.chainId);
          const isSelected = currentMarket === market;

          return (
            <button
              onClick={() => handleSetCurrentMarket(market)}
              className={'MarketSwitcher__market'}
              type="button"
              disabled={isSelected}
              key={market}
            >
              <div className="MarketSwitcher__market-content">
                <div className="MarketSwitcher__market-inner">
                  <img
                    className="MarketSwitcher__subLogo"
                    src={marketData.subLogo}
                    alt="chain-logo"
                  />
                  {config.name}
                </div>

                {isSelected ? <CheckIcon /> : null}
              </div>
            </button>
          );
        })}
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/screen-size';
          @import 'src/_mixins/variables';

          .MarketSwitcher {
            z-index: 99;

            .DropdownWrapper__icon {
              border-color: ${currentTheme.text.offset2};
            }

            &__button {
              display: flex;
              align-items: center;
              position: relative;
              color: ${isCurrentThemeDark ? currentTheme.text.offset1 : currentTheme.text.offset2};
              padding: 12px 16px;
              border-radius: 32px;
              border: 1px solid ${currentTheme.interface.tableBorder};
              font-family: 'Inter';
              font-weight: 500;
              font-size: 14px;
              line-height: 14px;
              gap: 8px;

              &:hover {
                background: ${currentTheme.background.main};
              }

              @include respond-to(sm) {
                width: 100%;
              }
            }

            &__button-horizontalDivider {
              content: '';
              position: relative;
              height: 14px;
              width: 1px;
              background: ${currentTheme.interface.tableBorder};
            }

            &__button-arrowExpanded {
              position: relative;
              transform: rotate(180deg);
            }

            &__buttonActive {
              .MarketSwitcher__button-content {
                border-color: ${currentTheme.green.hex};
              }
            }

            &__button-subLogo {
              height: 14px;
              object-fit: contain;
            }

            &__content {
              width: 180px;
              z-index: 6;
              position: relative;
              background: ${isCurrentThemeDark ? '#090d0f' : '#f8fafc'};
            }

            &__title {
              font-size: $fontSizeSmall;
              padding: 8px 12px;
              font-weight: 300;
              width: 100%;
              background: ${isCurrentThemeDark ? '#090d0f' : '#f8fafc'};
              color: ${currentTheme.text.main};
            }

            &__market {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 12px 15px;
              width: 100%;
              border-top: 1px solid ${currentTheme.interface.tableBorder};
              &:hover {
                background: ${currentTheme.background.main};
              }
            }

            &__market-content {
              display: flex;
              align-items: center;
              justify-content: space-between;
              text-align: center;
              width: 100%;
            }

            &__market-inner {
              display: flex;
              align-items: center;
              gap: 16px;
              font-size: 14px;
              color: ${currentTheme.text.main};
            }

            &__subLogo {
              height: 16px;
              object-fit: contain;
            }
          }
        `}
      </style>
    </DropdownWrapper>
  );
}
