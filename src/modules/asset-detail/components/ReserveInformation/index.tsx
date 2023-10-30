import { valueToBigNumber, BigNumber } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import GradientLine from 'components/basic/GradientLine';
import CardWrapper from 'components/wrappers/CardWrapper';
import ReserveSupplyInfo from './ReserveSupplyInfo';
import ReserveBorrowInfo from './ReserveBorrowInfo';
import ReserveInterestRate from './ReserveInterestRate';

interface ReserveInformationProps {
  symbol: string;
  marketRefPriceInUsd: string;
  walletBalance: BigNumber;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

export default function ReserveInformation({
  symbol,
  marketRefPriceInUsd,
  walletBalance,
  poolReserve,
  userReserve,
  user,
}: ReserveInformationProps) {
  const { getRewardApr, getLoopApr } = useRdntLendingPoolRewards();

  const totalLiquidityInUsd = valueToBigNumber(poolReserve.totalLiquidity)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();
  const totalBorrowsInUsd = valueToBigNumber(poolReserve.totalDebt)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();
  const availableLiquidityInUsd = valueToBigNumber(poolReserve.availableLiquidity)
    .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
    .multipliedBy(marketRefPriceInUsd)
    .toString();

  const reserveOverviewData = {
    totalLiquidityInUsd,
    totalBorrowsInUsd,
    availableLiquidityInUsd,
    totalLiquidity: poolReserve.totalLiquidity,
    totalBorrows: poolReserve.totalDebt,
    availableLiquidity: poolReserve.availableLiquidity,
    supplyAPY: Number(poolReserve.supplyAPY),
    supplyAPR: Number(poolReserve.supplyAPR),
    avg30DaysLiquidityRate: Number(poolReserve.avg30DaysLiquidityRate),
    stableAPY: Number(poolReserve.stableBorrowAPY),
    stableAPR: Number(poolReserve.stableBorrowAPR),
    variableAPY: Number(poolReserve.variableBorrowAPY),
    variableAPR: Number(poolReserve.variableBorrowAPR),
    stableOverTotal: valueToBigNumber(poolReserve.totalStableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
    variableOverTotal: valueToBigNumber(poolReserve.totalVariableDebt)
      .dividedBy(poolReserve.totalDebt)
      .toNumber(),
    avg30DaysVariableRate: Number(poolReserve.avg30DaysVariableBorrowRate),
    utilizationRate: Number(poolReserve.utilizationRate),
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    borrowingEnabled: poolReserve.borrowingEnabled,
    underlyingAsset: poolReserve.underlyingAsset,
    id: poolReserve.id,
  };

  const { rdntRewardsDepositApr = 0, rdntRewardsBorrowApr = 0 } = getRewardApr(poolReserve);
  const loopApr = getLoopApr(poolReserve, rdntRewardsDepositApr, rdntRewardsBorrowApr);

  return (
    <CardWrapper header={<p>Reserve Status & Configuration</p>} className="ReserveInformation">
      <ReserveSupplyInfo
        symbol={symbol}
        reserveOverviewData={reserveOverviewData}
        loopApr={loopApr}
        rdntRewardsDepositApr={rdntRewardsDepositApr}
      />

      <GradientLine size={1} />

      <ReserveBorrowInfo reserveOverviewData={reserveOverviewData} />

      <GradientLine size={1} />

      <ReserveInterestRate reserveOverviewData={reserveOverviewData} />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ReserveInformation {
            width: 100%;

            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0;
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
