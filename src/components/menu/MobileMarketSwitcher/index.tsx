import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';

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
import GradientButton from 'components/basic/GradientButton';

interface MobileMarketSwitcherProps {
  toTop?: boolean;
  className?: string;
}

export default function MobileMarketSwitcher({ toTop, className }: MobileMarketSwitcherProps) {
  const { isCurrentThemeDark, currentTheme, sm } = useThemeContext();
  const { currentMarket, setCurrentMarket } = useProtocolDataContext();
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
      className={classNames('MobileMarketSwitcher', className)}
      horizontalPosition={sm ? 'center' : 'right'}
      verticalPosition={toTop ? 'top' : 'bottom'}
      visible={visible}
      setVisible={setVisible}
      buttonComponent={
        <GradientButton
          className={classNames('MobileMarketSwitcher__button', {
            MarketSwitcher__buttonActive: visible,
          })}
          onClick={toggleVisible}
          type="button"
        >
          <p>Switch Network</p>
        </GradientButton>
      }
    >
      <div className="MobileMarketSwitcher__content">
        <p className="MobileMarketSwitcher__title">Select network:</p>

        {availableMarkets.map((market) => {
          const marketData = marketsData[market];
          const config = getNetworkConfig(marketData.chainId);
          const isSelected = currentMarket === market;

          return (
            <button
              onClick={() => handleSetCurrentMarket(market)}
              className={'MobileMarketSwitcher__market'}
              type="button"
              disabled={isSelected}
              key={market}
            >
              <div className="MobileMarketSwitcher__market-content">
                <div className="MobileMarketSwitcher__market-inner">
                  <img
                    className="MobileMarketSwitcher__subLogo"
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

          .MobileMarketSwitcher {
            margin-bottom: 10px;

            .DropdownWrapper__content {
              width: 100%;
              top: calc(100% + 1px);
            }
            .DropdownWrapper__icon {
              display: none;
            }

            &__button {
              border-radius: 5px;
              position: relative;
              font-size: 14px;
              font-weight: 500;
            }

            &__buttonActive {
              .MobileMarketSwitcher__button-content {
                border-color: ${currentTheme.green.hex};
              }
            }

            &__button-subLogo {
              height: 14px;
              object-fit: contain;
            }

            &__content {
              width: 100%;
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
