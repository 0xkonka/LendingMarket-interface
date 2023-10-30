import { useCallback, useEffect, useMemo, useState } from 'react';
import { TokenIcon, getAssetColor, getAssetInfo, useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

import { ComputedReserveData, useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useTokenPrices } from 'libs/aave-protocol-js/hooks/use-token-prices';
import StatsInfoItem from 'components/StatsInfoItem';
import OpenArrowIcon from 'icons/OpenArrow';
import AssetTopListDropDown from '../AssetTopListDropDown';
import OutLinkIcon from 'icons/OutLink';

interface AssetTopInfoProps {
  symbol: string;
  poolReserve: ComputedReserveData;
}

export default function AssetTopInfo({ symbol, poolReserve }: AssetTopInfoProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { tokenPrices } = useTokenPrices();
  const symbolColor = getAssetColor(symbol);
  const { reserves } = useDynamicPoolDataContext();
  const [open, setOpen] = useState(false);
  const [assetData, setAssetData] = useState<any>();
  const asset = getAssetInfo(symbol);

  const assetPrice = useMemo(() => {
    const asset = tokenPrices.find((item) => item.symbol === symbol);
    return asset?.price || 0;
  }, [tokenPrices]);

  const getAssetData = useCallback(() => {
    const assetData = reserves
      .filter((res) => res.isActive && !res.isFrozen)
      .map((reserve) => {
        return {
          id: reserve.id,
          underlyingAsset: reserve.underlyingAsset,
          symbol: reserve.symbol,
        };
      });

    setAssetData(assetData);
  }, [reserves, setAssetData]);

  useEffect(() => {
    getAssetData();
  }, [getAssetData]);

  const symbolTokenName: Record<string, string> = {
    DAI: 'Dai Stablecoin',
    USDC: 'USD Coin',
    'USDC.e': 'Bridged USD Coin',
    USDT: 'Tether',
    ETH: 'Ethereum',
    WBTC: 'Bitcoin',
    BUSD: 'Binance USD',
    BTCB: 'Bitcoin BEP2',
    BNB: 'BNB',
    wstETH: 'Wrapped staked ETH',
    ARB: 'Arbitrum',
  };

  return (
    <div className="AssetTopInfo">
      <div className="AssetTopInfo__container">
        <div className="AssetTopInfo__assetList-container">
          <div
            className={classNames('AssetTopInfo__assetList-dropdown', {
              AssetTopInfo__headerSelected: open,
            })}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="AssetTopInfo__assetList-dropdown__selected">
              <div className="AssetTopInfo__assetList-dropdown__selected-item">
                <div className="AssetTopInfo__selected-item__tokenInfo">
                  <TokenIcon width={50} height={50} tokenSymbol={symbol} />
                  <div className="AssetTopInfo__selected-item__token">
                    <p className="AssetTopInfo__selected-item__tokenSymbol">
                      {asset.formattedSymbol || asset.symbol}
                    </p>
                    <div className="AssetTopInfo__selected-item__tokenName">
                      {symbolTokenName[symbol]}
                      <OutLinkIcon width={12} height={12} />
                    </div>
                  </div>
                </div>
                <OpenArrowIcon />
              </div>
            </div>
            {open && (
              <AssetTopListDropDown
                assetList={assetData}
                selectedSymbol={symbol}
                symbolTokenName={symbolTokenName}
              />
            )}
          </div>
        </div>

        <div className="AssetTopInfo__info-container">
          <StatsInfoItem title="Asset price" value={Number(assetPrice)} dollarPrefix />
          <StatsInfoItem
            title="Borrow APY"
            value={poolReserve.borrowingEnabled ? Number(poolReserve.variableBorrowAPY) * 100 : 0}
            isPercent
          />
          <StatsInfoItem title="Reserve size" value={Number(poolReserve.totalLiquidity)} />
          <StatsInfoItem
            title="Available liquidity"
            value={Number(poolReserve.availableLiquidity)}
          />
          <StatsInfoItem
            title="Utilization rate"
            value={poolReserve.borrowingEnabled ? Number(poolReserve.utilizationRate) * 100 : 0}
            isPercent
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AssetTopInfo {
            display: flex;
            flex-direction: column;
            background: ${isCurrentThemeDark ? currentTheme.interface.mainTable : '#ffffff'};
            border: 1px solid ${currentTheme.interface.divider};
            border-radius: 10px;
            width: 100%;

            &__container {
              display: flex;
              align-items: center;
              padding: 0px 0;
            }

            &__assetList-dropdown {
              display: flex;
              flex-direction: column;
              width: 394px;
              position: absolute;
              border-radius: 10px;
              border-top-right-radius: 0px;
              z-index: 1;

              &__selected {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 107px;
                padding: 24px 0px;
                border-radius: 10px;
                border-top-right-radius: 0px;
                cursor: pointer;

                &-item {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  align-items: center;
                  padding: 0 40px 0 25px;
                  border-left: 4px solid ${symbolColor};
                }
              }
            }

            &__selected-item__tokenInfo {
              display: flex;
              align-items: center;
              gap: 13px;
              font-family: 'PP Mori';
              font-style: normal;
              color: ${isCurrentThemeDark ? currentTheme.text.main : ''};
            }

            &__selected-item__tokenSymbol {
              font-weight: 600;
              font-size: 12px;
              line-height: 17px;
              color: ${currentTheme.text.offset2};
            }

            &__selected-item__tokenName {
              font-weight: 600;
              font-size: 20px;
              line-height: 28px;
              display: flex;
              align-items: center;
              gap: 8px;
            }

            &__info-container {
              display: flex;
              justify-content: space-between;
              width: 100%;
              gap: 40px;
              padding: 24px 24px;
            }

            &__assetList-container {
              min-width: 395px;
              border-right: 1px solid ${currentTheme.interface.divider};
              padding: 0px;
              height: 100%;
            }

            &__headerSelected {
              background: ${isCurrentThemeDark ? currentTheme.interface.mainTable : '#ffffff'};
              filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.05))
                drop-shadow(0px 10px 25px rgba(0, 0, 0, 0.1));

              & svg {
                transform: rotate(-180deg) !important;
              }

              .AssetTopInfo__selected-item__tokenName {
                svg {
                  transform: rotate(0) !important;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
}
