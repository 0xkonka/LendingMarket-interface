import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import NoData from 'components/basic/NoData';
import ValuePercent from 'components/basic/ValuePercent';
import ThirtyDayAverage from '../ThirtyDayAverage';
import LiquidityMiningAPYLine from '../LiquidityMiningAPYLine';
import StatsInfoItem from 'components/StatsInfoItem';
import staticStyles from './style';
import { useLidoApy } from 'libs/pool-data-provider/hooks/use-lido-apy';
import { useProtocolDataContext } from 'libs/protocol-data-provider';

interface LiquidityMiningCardProps {
  symbol?: string;
  type?: string;
  value?: string | number;
  thirtyDaysValue?: string | number;
  liquidityMiningValue?: string | number;
  grossValue?: string | number;
  className?: string;
  mobilePosition?: 'left' | 'right';
  noBorder?: boolean;
}

export default function LiquidityMiningCard({
  symbol,
  type,
  value = '-1',
  thirtyDaysValue,
  liquidityMiningValue,
  grossValue,
  className,
  mobilePosition = 'right',
  noBorder,
}: LiquidityMiningCardProps) {
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const helpLiquidityAPYTooltipId =
    symbol && type ? `help-liquidity-apy-${type}-${symbol}` : undefined;
  const thirtyDaysAverageTooltipId =
    symbol && type ? `show-30days-average-${type}-${symbol}` : undefined;
  const lidoApr = useLidoApy();
  let isWSTETH = false;

  let baseApy = value;

  if (currentMarketData.chainSymbol === 'ARETH' && symbol === 'wstETH' && type === 'deposit') {
    isWSTETH = true;
    if (value.toString() !== '-1') {
      baseApy = parseFloat(value.toString()) + parseFloat(lidoApr.toString());
    }
  }

  return (
    <div
      className={classNames(
        'LiquidityMiningCard',
        `LiquidityMiningCard__${mobilePosition}`,
        className
      )}
    >
      <div
        className={
          !sm && !!symbol && thirtyDaysValue && +thirtyDaysValue > 0
            ? 'LiquidityMiningCard__valueWithTooltip'
            : ''
        }
        data-tip={!!symbol}
        data-for={thirtyDaysAverageTooltipId}
      >
        {value.toString() !== '-1' ? (
          <ValuePercent maximumDecimals={2} minimumDecimals={2} value={baseApy} />
        ) : null}
      </div>

      {!sm && !!symbol && thirtyDaysValue && +thirtyDaysValue > 0 ? (
        <ReactTooltip
          className="LiquidityMiningCard__tooltip"
          id={thirtyDaysAverageTooltipId}
          effect="solid"
        >
          <ThirtyDayAverage forTooltip={true} size="small" value={+thirtyDaysValue} />
        </ReactTooltip>
      ) : undefined}

      {sm && (
        <>
          {thirtyDaysValue && +thirtyDaysValue > 0 ? (
            <ThirtyDayAverage value={+thirtyDaysValue} />
          ) : (
            <NoData className="LiquidityMiningCard__noData" color="lightBlue" />
          )}
        </>
      )}

      {isWSTETH && (
        <div className="infoIcon_wrapper">
          <StatsInfoItem
            title=" "
            infoText={
              <div>
                <div
                  className={classNames(
                    `CardWrapper__header`,
                    'MarketTableItem__coin-value',
                    'info_heading'
                  )}
                >
                  Deposit APY
                </div>
                <div className="detail_wrapper">
                  <span className="MarketTableItem__coin-value">Base APY</span>
                  <span className="detail_value">
                    <ValuePercent maximumDecimals={2} minimumDecimals={2} value={value} />
                  </span>
                </div>
                <div className="detail_wrapper">
                  <span className="MarketTableItem__coin-value">Lido Staked APR</span>
                  <span className="detail_value">
                    <ValuePercent maximumDecimals={2} minimumDecimals={2} value={lidoApr} />
                  </span>
                </div>
              </div>
            }
          />
        </div>
      )}

      <LiquidityMiningAPYLine
        symbol={symbol}
        value={liquidityMiningValue || 0}
        grossValue={grossValue || 0}
        noBorder={noBorder}
        tooltipId={helpLiquidityAPYTooltipId}
      />
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LiquidityMiningCard__tooltip {
          background: ${isCurrentThemeDark
            ? currentTheme.mainBg.hex
            : currentTheme.darkBlue.hex} !important;

          &:after {
            border-top-color: ${isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.darkBlue.hex} !important;
          }
        }
        .infoIcon_wrapper {
          position: absolute;
          margin: -28px 0px 0px -70px;
        }

        .info_heading {
          padding-left: 0px;
          font-size: 14px;
          margin: 0px 0px 10px 0px;
        }
        .detail_wrapper {
          display: flex;
          justify-content: space-between;
          padding: 4px 0px;
        }
      `}</style>
    </div>
  );
}
