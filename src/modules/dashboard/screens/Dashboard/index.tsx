import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InterestRate } from '@aave/protocol-js';

import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import { useIncentivesDataContext } from 'libs/pool-data-provider/hooks/use-incentives-data-context';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import MarketChain from 'components/MarketChain';
import LoadingSpinner from 'components/LoadingSpinner';
import PageMainHeader from 'components/PageMainHeader';
import { DepositTableItem } from 'modules/deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from 'modules/borrow/components/BorrowDashboardTable/types';
import MainDashboardTable from '../../components/MainDashboardTable';
import DashboardTop from '../../components/DashboardTop';
import { getAssetColor } from 'helpers/config/assets-config';
import { toggleUseAsCollateral } from 'helpers/toggle-use-as-collateral';
import { toggleBorrowRateMode } from 'helpers/toggle-borrow-rate-mode';
import { isEmpty } from 'helpers/utility';
import ZapLPModal from 'components/ZapLPModal';
import BannerClaimArbAirdrop from 'components/BannerClaimArbAirdrop';

export default function Dashboard() {
  const history = useHistory();
  const { user, reserves } = useDynamicPoolDataContext();
  const { reserveIncentives } = useIncentivesDataContext();
  const { getRewardApr } = useRdntLendingPoolRewards();

  const [loading, setLoading] = useState(false);
  const [depositedPositions, setDepositedPositions] = useState<DepositTableItem[]>([]);
  const [borrowedPositions, setBorrowedPositions] = useState<BorrowTableItem[]>([]);

  const [openZapModal, setOpenZapModal] = useState(false);

  useEffect(() => {
    if (isEmpty(user) || isEmpty(reserves)) {
      return;
    }

    const depositedPositions: DepositTableItem[] = [];
    const borrowedPositions: BorrowTableItem[] = [];

    user?.userReservesData.forEach((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
      if (!poolReserve) {
        throw new Error('data is inconsistent pool reserve is not available');
      }

      const reserveIncentiveData =
        reserveIncentives[userReserve.reserve.underlyingAsset.toLowerCase()];
      if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
        const baseListData = {
          uiColor: getAssetColor(userReserve.reserve.symbol),
          isActive: poolReserve.isActive,
          isFrozen: poolReserve.isFrozen,
          stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
          reserve: {
            ...userReserve.reserve,
            liquidityRate: poolReserve.supplyAPY,
          },
        };

        const {
          rdntRewardsDepositApr = 0,
          rdntRewardsBorrowApr = 0,
          grossDepositApr = 0,
          grossBorrowApr = 0,
        } = getRewardApr(poolReserve);

        if (userReserve.underlyingBalance !== '0') {
          depositedPositions.push({
            ...baseListData,
            rdntRewardsDepositApr,
            grossDepositApr,
            borrowingEnabled: poolReserve.borrowingEnabled,
            avg30DaysLiquidityRate: poolReserve.avg30DaysLiquidityRate,
            usageAsCollateralEnabledOnThePool: poolReserve.usageAsCollateralEnabled,
            usageAsCollateralEnabledOnUser: userReserve.usageAsCollateralEnabledOnUser,
            underlyingBalance: userReserve.underlyingBalance,
            underlyingBalanceUSD: userReserve.underlyingBalanceUSD,
            aincentivesAPR: reserveIncentiveData
              ? reserveIncentiveData.aIncentives.incentiveAPR
              : '0',
            onToggleSwitch: () =>
              toggleUseAsCollateral(
                history,
                poolReserve.id,
                !userReserve.usageAsCollateralEnabledOnUser,
                poolReserve.underlyingAsset
              ),
          });
        }

        if (userReserve.variableBorrows !== '0') {
          borrowedPositions.push({
            ...baseListData,
            rdntRewardsBorrowApr,
            grossBorrowApr,
            borrowingEnabled: poolReserve.borrowingEnabled,
            currentBorrows: userReserve.variableBorrows,
            currentBorrowsUSD: userReserve.variableBorrowsUSD,
            borrowRateMode: InterestRate.Variable,
            borrowRate: poolReserve.variableBorrowAPY,
            vincentivesAPR: reserveIncentiveData
              ? reserveIncentiveData.vIncentives.incentiveAPR
              : '0',
            sincentivesAPR: reserveIncentiveData
              ? reserveIncentiveData.sIncentives.incentiveAPR
              : '0',
            avg30DaysVariableRate: poolReserve.avg30DaysVariableBorrowRate,
            repayLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}-Repay`,
            borrowLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}-Borrow`,
            reserveLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}`,
            onSwitchToggle: () =>
              toggleBorrowRateMode(
                history,
                poolReserve.id,
                InterestRate.Variable,
                poolReserve.underlyingAsset
              ),
          });
        }
        if (userReserve.stableBorrows !== '0') {
          borrowedPositions.push({
            ...baseListData,
            borrowingEnabled: poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled,
            currentBorrows: userReserve.stableBorrows,
            currentBorrowsUSD: userReserve.stableBorrowsUSD,
            borrowRateMode: InterestRate.Stable,
            borrowRate: userReserve.stableBorrowAPY,
            vincentivesAPR: reserveIncentiveData
              ? reserveIncentiveData.vIncentives.incentiveAPR
              : '0',
            sincentivesAPR: reserveIncentiveData
              ? reserveIncentiveData.sIncentives.incentiveAPR
              : '0',
            repayLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}-Repay`,
            borrowLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}-Borrow`,
            reserveLink: `/asset-detail/${poolReserve.underlyingAsset}-${poolReserve.id}`,
            onSwitchToggle: () =>
              toggleBorrowRateMode(
                history,
                poolReserve.id,
                InterestRate.Stable,
                poolReserve.underlyingAsset
              ),
          });
        }
      }
    });

    setDepositedPositions(depositedPositions);
    setBorrowedPositions(borrowedPositions);
    setLoading(false);
  }, [user, reserves, getRewardApr]);

  return (
    <div className="Dashboard">
      {loading && <LoadingSpinner loading={loading} />}
      {openZapModal && <ZapLPModal setOpenModal={setOpenZapModal} />}

      <PageMainHeader />

      <div className="Dashboard__container">
        <BannerClaimArbAirdrop openZapModal={setOpenZapModal} />

        <MarketChain />

        <DashboardTop />

        <MainDashboardTable
          borrowedPositions={borrowedPositions}
          depositedPositions={depositedPositions}
          isBorrow={false}
        />
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .Dashboard {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 16px;

          &__container {
            padding-top: 16px;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: $maxDeskWidth;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
