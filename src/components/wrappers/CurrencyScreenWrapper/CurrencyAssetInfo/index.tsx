import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import Row from 'components/basic/Row';
import ValuePercent from 'components/basic/ValuePercent';
import LiquidationThresholdHelpModal from 'components/HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from 'components/HelpModal/LiquidationBonusHelpModal';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import messages from './messages';
import HealthFactor from 'components/HealthFactor';
import InfoRowItem from '../InfoRowItem';
import CompactNumber from 'components/basic/CompactNumber';

interface CurrencyAssetInfoProps
  extends Pick<ValidationWrapperComponentProps, 'poolReserve' | 'currencySymbol' | 'user'> {
  type: 'deposit' | 'borrow';
  children?: JSX.Element;
}

export default function CurrencyAssetInfo({
  user,
  poolReserve,
  currencySymbol,
  type,
}: CurrencyAssetInfoProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { getRewardApr } = useRdntLendingPoolRewards();

  const { rdntRewardsDepositApr = 0, rdntRewardsBorrowApr = 0 } = getRewardApr(poolReserve);

  const overviewData = {
    utilizationRate: Number(poolReserve.utilizationRate),
    availableLiquidity: poolReserve.availableLiquidity,
    priceInUsd: valueToBigNumber(poolReserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketRefPriceInUsd)
      .toNumber(),
    depositApy: Number(poolReserve.supplyAPY),
    avg30DaysLiquidityRate: Number(poolReserve.avg30DaysLiquidityRate) || 0,
    stableRate: Number(poolReserve.stableBorrowAPY),
    variableRate: Number(poolReserve.variableBorrowAPY),
    avg30DaysVariableRate: Number(poolReserve.avg30DaysVariableBorrowRate),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    borrowingEnabled: poolReserve.borrowingEnabled,
    rdntRewardsDepositApr,
    rdntRewardsBorrowApr,
  };

  const isDeposit = type === 'deposit';

  const LeftInformation = () => {
    return (
      <>
        {user && Number(user?.healthFactor) > 0 && (
          <HealthFactor
            className="TopInfoPanel__healthFactor"
            value={user?.healthFactor || '-1'}
            helpIconSize={12}
          />
        )}

        <InfoRowItem
          title={intl.formatMessage(messages.utilizationRate)}
          value={<ValuePercent value={overviewData.utilizationRate} />}
        />

        <InfoRowItem
          title={intl.formatMessage(messages.availableLiquidity)}
          value={
            overviewData.availableLiquidity ? (
              <>
                <CompactNumber
                  value={overviewData.availableLiquidity}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum
                />
                {` ${currencySymbol}`}
              </>
            ) : (
              '—'
            )
          }
        />

        {isDeposit ? (
          <>
            <InfoRowItem
              title={intl.formatMessage(messages.depositAPY)}
              value={
                <>
                  <CompactNumber
                    value={overviewData.depositApy * 100}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                    showFullNum
                  />
                  {`%`}
                </>
              }
            />

            <InfoRowItem
              title={intl.formatMessage(messages.rdntRewardsApr)}
              value={<ValuePercent value={overviewData.rdntRewardsDepositApr} />}
            />
          </>
        ) : (
          <>
            <InfoRowItem
              title={intl.formatMessage(messages.totalCollateral)}
              value={
                <>
                  {user && Number(user?.totalCollateralUSD) > 0 ? (
                    <>
                      <CompactNumber
                        value={user?.totalCollateralUSD}
                        maximumFractionDigits={4}
                        minimumFractionDigits={4}
                      />
                      {' USD'}
                    </>
                  ) : (
                    '-'
                  )}
                </>
              }
            />

            <InfoRowItem
              title={intl.formatMessage(messages.loanToValue)}
              value={
                <>
                  {user && Number(user?.currentLoanToValue) > 0 ? (
                    <ValuePercent value={user?.currentLoanToValue} />
                  ) : (
                    '-'
                  )}
                </>
              }
            />
          </>
        )}
      </>
    );
  };

  const RightInformation = () => {
    return (
      <>
        {isDeposit ? (
          <>
            <InfoRowItem
              title={intl.formatMessage(messages.canBeUsedAsCollateral)}
              value={intl.formatMessage(
                overviewData.usageAsCollateralEnabled ? messages.yes : messages.no
              )}
            />

            <InfoRowItem
              title={intl.formatMessage(messages.assetPrice)}
              value={
                <>
                  <CompactNumber
                    value={overviewData.priceInUsd}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                  {' USD'}
                </>
              }
            />

            <InfoRowItem
              title={intl.formatMessage(messages.maximumLTV)}
              value={
                overviewData.baseLTVasCollateral === 0 ? (
                  '-'
                ) : (
                  <ValuePercent value={overviewData.baseLTVasCollateral} />
                )
              }
            />

            <Row
              className="CurrencyAssetInfo__row"
              title={
                <LiquidationThresholdHelpModal
                  text={intl.formatMessage(messages.liquidationThreshold)}
                />
              }
              isColumn={false}
            >
              {overviewData.liquidationThreshold <= 0 ? (
                <span className="CurrencyAssetInfo__no-data">—</span>
              ) : (
                <ValuePercent value={overviewData.liquidationThreshold} />
              )}
            </Row>

            <Row
              className="CurrencyAssetInfo__row"
              title={
                <LiquidationBonusHelpModal text={intl.formatMessage(messages.liquidationPenalty)} />
              }
              isColumn={false}
            >
              {overviewData.liquidationBonus <= 0 ? (
                <span className="CurrencyAssetInfo__no-data">—</span>
              ) : (
                <ValuePercent value={overviewData.liquidationBonus} />
              )}
            </Row>
          </>
        ) : (
          <>
            <InfoRowItem
              title={intl.formatMessage(messages.assetPrice)}
              value={
                <>
                  <CompactNumber
                    value={overviewData.priceInUsd}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                  {' USD'}
                </>
              }
            />

            <InfoRowItem
              title={intl.formatMessage(messages.variableAPY)}
              value={<ValuePercent value={overviewData.variableRate} />}
            />

            <InfoRowItem
              title={intl.formatMessage(messages.rdntRewardsApr)}
              value={<ValuePercent value={overviewData.rdntRewardsBorrowApr} />}
            />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="CurrencyAssetInfo__item">
        <LeftInformation />
      </div>

      <div className="CurrencyAssetInfo__item">
        <RightInformation />
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .CurrencyAssetInfo {
          &__item {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
