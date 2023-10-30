import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

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
import messages from './messages';

export default function MarketChainSelector() {
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
      withArrow={true}
      className="MarketChainSelector"
      horizontalPosition={sm ? 'center' : 'left'}
      verticalPosition={'bottom'}
      visible={visible}
      setVisible={setVisible}
      buttonComponent={
        <button
          className={classNames('MarketChainSelector__button', {
            MarketChainSelector__buttonActive: visible,
          })}
          onClick={toggleVisible}
          type="button"
        >
          <div className="MarketChainSelector__button-content">
            <img
              className="MarketChainSelector__button-subLogo"
              src={currentMarketData.subLogo}
              alt="chain-logo"
            />
            {networkConfig.name}
          </div>
        </button>
      }
    >
      <div className="MarketChainSelector__content">
        <p className="MarketChainSelector__title">{intl.formatMessage(messages.selectNetwork)}</p>

        {availableMarkets.map((market) => {
          const marketData = marketsData[market];
          const config = getNetworkConfig(marketData.chainId);
          const isSelected = currentMarket === market;

          return (
            <button
              onClick={() => handleSetCurrentMarket(market)}
              className={'MarketChainSelector__market'}
              type="button"
              disabled={isSelected}
              key={market}
            >
              <div className="MarketChainSelector__market-content">
                <div className="MarketChainSelector__market-inner">
                  <img
                    className="MarketChainSelector__subLogo"
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

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/screen-size';
          @import 'src/_mixins/variables';

          .MarketChainSelector {
            .DropdownWrapper__icon {
              border-color: ${currentTheme.text.main};
            }

            &__button {
              border-radius: 4px;
              position: relative;
            }

            &__button-content {
              display: flex;
              align-items: center;
              position: relative;
              z-index: 2;
              gap: 6px;
              font-size: 20px;
              font-weight: 600;
              padding-right: 30px;
              color: ${currentTheme.text.main};
              &:hover {
                background: unset;
              }
            }

            &__buttonActive {
              .MarketChainSelector__button-content {
                border-color: ${currentTheme.green.hex};
              }
            }

            &__button-subLogo {
              width: 25px;
              height: 25px;
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
