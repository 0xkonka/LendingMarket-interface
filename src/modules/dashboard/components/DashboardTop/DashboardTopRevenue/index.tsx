import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import CardWrapper from 'components/wrappers/CardWrapper';
import GradientLine from 'components/basic/GradientLine';
import LoadingSpinner from 'components/LoadingSpinner';
import StatsInfoItem from 'components/StatsInfoItem';
import NoWalletContent from 'components/NoWalletContent';
import { isEmpty } from 'helpers/utility';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useMfdLockedBalances } from 'client/multifee-distribution-contract-queries';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import ContainedButton from 'components/basic/ContainedButton';
import ZapIcon from 'icons/Zap';
import { useThemeContext } from 'aave-ui-kit';
import ZapLPModal from 'components/ZapLPModal';
import messages from './messages';

export default function DashboardTopRevenue() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { availableForVesting } = useRdntBalanceContext();
  const { isEligible, vestHandler } = useVestHandler();
  const { prices } = useRdntPrices();
  const { getUserRewardsPerSecond } = useRdntLendingPoolRewards();
  const [loadingAction, setLoadingAction] = useState('');
  const [openZapModal, setOpenZapModal] = useState(false);
  const { lpLastDayTotal, lockedSupplyWithMultiplier } = useMFDStats();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { data: lpLockedTable = [] } = useMfdLockedBalances(
    chainId,
    currentMarketData.addresses.stakingToken
  );

  const vestButtonHandler = useCallback(
    async (event) => {
      setLoadingAction('startVesting');
      await vestHandler(event);
      setLoadingAction('');
    },
    [setLoadingAction, vestHandler]
  );

  const userRewardsPerSecond = useMemo(() => {
    let userRewardsPerSecondValue = 0;
    user?.userReservesData.forEach((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

      if (!poolReserve) {
        throw new Error('data is inconsistent pool reserve is not available');
      }

      const assetRewardsPerSecond = getUserRewardsPerSecond(userReserve, poolReserve);
      userRewardsPerSecondValue += assetRewardsPerSecond;
    });

    return userRewardsPerSecondValue;
  }, [user, reserves]);

  const userShare = useMemo(() => {
    if (!lockedSupplyWithMultiplier) {
      return 0;
    }

    let userLockedWithMultiplier = 0;
    for (const lpLocked of lpLockedTable) {
      userLockedWithMultiplier += Number(lpLocked.amount) * lpLocked.multiplier;
    }
    return userLockedWithMultiplier / lockedSupplyWithMultiplier;
  }, [lpLockedTable, lockedSupplyWithMultiplier]);

  return (
    <CardWrapper className="DashboardTopRevenue" header={<p>Rewards</p>}>
      {!user ? (
        <NoWalletContent padding={24} />
      ) : (
        <>
          <LoadingSpinner loading={isEmpty(user) || isEmpty(reserves)} />

          <div className="DashboardTopRevenue__container">
            <StatsInfoItem
              title={intl.formatMessage(messages.dailyRewards)}
              infoText={intl.formatMessage(messages.dailyRewardsDescription)}
              value={isEligible ? userRewardsPerSecond * 86400 : 0}
              subValue={
                isEligible
                  ? prices.tokenPrice
                    ? Number(userRewardsPerSecond * 86400) * prices.tokenPrice
                    : undefined
                  : 0
              }
              tokenSymbol="RDNT"
            />
            <StatsInfoItem
              title={intl.formatMessage(messages.dailyProtocolFees)}
              value={Number(userShare) * lpLastDayTotal}
              showFullNum={true}
              dollarPrefix
            >
              <p className="DashboardTopRevenue__container__dailyProtocol">
                ({intl.formatMessage(messages.paidOver)})
              </p>
            </StatsInfoItem>
          </div>

          <GradientLine size={1} />

          <div className="DashboardTopRevenue__container">
            <StatsInfoItem
              title={intl.formatMessage(messages.pendingRewards)}
              value={Number(availableForVesting)}
              subValue={
                prices.tokenPrice ? Number(availableForVesting) * prices.tokenPrice : undefined
              }
              showFullNum={true}
            >
              <div className="DashboardTopRevenue__item__pending">
                <ContainedButton
                  round
                  size="small"
                  color="fourth"
                  onClick={() => setOpenZapModal(true)}
                >
                  <ZapIcon color={currentTheme.brand.main} width={18} height={18} />
                  {intl.formatMessage(messages.zap)}
                </ContainedButton>
                <ContainedButton
                  size="small"
                  color="fourth"
                  disabled={loadingAction === 'startVesting'}
                  onClick={vestButtonHandler}
                >
                  {intl.formatMessage(
                    loadingAction !== 'startVesting' ? messages.vest : messages.vesting
                  )}
                </ContainedButton>
              </div>
            </StatsInfoItem>
            <StatsInfoItem
              title={intl.formatMessage(messages.totalAnnualRewards)}
              infoText={intl.formatMessage(messages.totalAnnualRewardsDescription)}
              value={
                Number(userShare) * lpLastDayTotal * 365 +
                (isEligible
                  ? prices.tokenPrice
                    ? Number(userRewardsPerSecond * 86400) * prices.tokenPrice
                    : 0
                  : 0) *
                  365
              }
              color="gradient"
              dollarPrefix
            />
          </div>
        </>
      )}

      {openZapModal && <ZapLPModal setOpenModal={setOpenZapModal} />}
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .DashboardTopRevenue {
            height: 100%;

            .CardWrapper__children {
              position: relative;
              display: grid;
              grid-template-columns: 1fr;
              padding: 0;
            }

            &__container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              width: 100%;
              padding: 24px;
              min-height: 200px;

              @include respond-to(sm) {
                grid-template-columns: 1fr;
              }

              &__dailyProtocol {
                font-style: italic;
                font-family: 'Inter';
                font-size: 12px;
                font-weight: 400;
                color: #475569;
              }
            }

            &__item__pending {
              display: flex;
              margin-top: 5px;
              .ContainedButton {
                margin-right: 10px;
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
