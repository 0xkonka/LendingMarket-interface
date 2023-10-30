import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import LoadingSpinner from 'components/LoadingSpinner';
import CompactNumber from 'components/basic/CompactNumber';
import StatsInfoItem from 'components/StatsInfoItem';
import GradientLine from 'components/basic/GradientLine';
import CardWrapper from 'components/wrappers/CardWrapper';
import { isEmpty } from 'helpers/utility';
import messages from './messages';
import NoWalletContent from 'components/NoWalletContent';
import AutoRelockStatus from 'components/basic/AutoRelockStatus';

interface ManageRadiantMainTopProps {
  hideLockRdnt: boolean;
  loading: boolean;
  lpLocked: BigNumber;
  earned: BigNumber;
  lpLockedTable: { amount: string; expiryDate: Date; unlockTime: string; multiplier: number }[];
  statsRerender: Number;
}

export function ManageRadiantMainTop({
  hideLockRdnt,
  loading,
  lpLocked,
  earned,
  lpLockedTable,
  statsRerender,
}: ManageRadiantMainTopProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { prices } = useRdntPrices();
  const { user } = useDynamicPoolDataContext();

  const {
    loading: MFDStatsLoading,
    lpLastDayTotal,
    totalLockedLP,
    lockedSupplyWithMultiplier,
    fetchMFDData,
  } = useMFDStats();
  // const { loading: userRankLoading, userRank, fetchUserRankData } = useUserRank();

  useEffect(() => {
    fetchMFDData();
    // fetchUserRankData();
  }, [statsRerender]);

  const userTvl =
    lpLocked.toNumber() * (prices.lpTokenPrice || 0) + earned.toNumber() * (prices.tokenPrice || 0);

  const averageMultiplier = useMemo(() => {
    if (isEmpty(lpLockedTable)) {
      return 0;
    }
    let totalPower = 0;
    let totalLocked = 0;
    for (const lpLocked of lpLockedTable) {
      totalPower += lpLocked.multiplier * parseFloat(lpLocked.amount);
      totalLocked += parseFloat(lpLocked.amount);
    }
    let avgMulti = totalPower / totalLocked;
    return avgMulti;
  }, [lpLockedTable]);

  const userShare = useMemo(() => {
    if (!lockedSupplyWithMultiplier) {
      return 0;
    }

    let userLockedAmount = 0;
    for (const lpLocked of lpLockedTable) {
      userLockedAmount += Number(lpLocked.amount);
    }

    return (userLockedAmount * averageMultiplier) / lockedSupplyWithMultiplier;
  }, [lpLockedTable, lockedSupplyWithMultiplier]);

  return (
    <CardWrapper className="ManageRadiantMainTop__CardWraper">
      <div className="ManageRadiantMainTop">
        {!user ? (
          <NoWalletContent padding={50} />
        ) : (
          <>
            <LoadingSpinner loading={loading || MFDStatsLoading} />

            <StatsInfoItem
              title={intl.formatMessage(messages.yourLockedDLP)}
              value={Number(lpLocked)}
              subValue={Number(lpLocked) * (prices.lpTokenPrice || 0)}
              tokenSymbol="DLP"
            >
              <div className="ManageRadiantMainTop__StatsInfoItem__AutoRelock">
                {intl.formatMessage(messages.autoRelock)}:
                <AutoRelockStatus />
              </div>
            </StatsInfoItem>

            <StatsInfoItem
              title={intl.formatMessage(messages.dLPLocked)}
              value={Number(totalLockedLP)}
              subValue={Number(totalLockedLP) * (prices.lpTokenPrice || 0)}
            />

            <StatsInfoItem
              title={intl.formatMessage(messages.dailyPlatformFees)}
              value={lpLastDayTotal}
              dollarPrefix={true}
            >
              <p className="ManageRadiantMainTop__italic-label">
                {intl.formatMessage(messages.paidOver)}
              </p>
            </StatsInfoItem>

            <StatsInfoItem
              title={intl.formatMessage(messages.yourShare)}
              value={userShare * 100}
              isPercent
              decimals={userShare * 100 < 0.001 ? 5 : 2}
            >
              {/* <p className="ManageRadiantMainTop__label">
                Global rank: <span>{userRank}</span>
              </p> */}
              <p className="ManageRadiantMainTop__label">
                {intl.formatMessage(messages.averageMultiplier)}:{' '}
                <span>{averageMultiplier.toFixed(2)}x</span>
              </p>
            </StatsInfoItem>

            <div className="ManageRadiantMainTop__topAnnual">
              <GradientLine size={1} direction="vertical" />

              <StatsInfoItem
                title={intl.formatMessage(messages.totalAnnualPlatformFees)}
                value={Number(userShare) * lpLastDayTotal * 365}
                color="gradient"
                dollarPrefix
              >
                {/* <p className="ManageRadiantMainTop__label">
                  Daily rewards:{' '}
                  <span>
                    $
                    <CompactNumber
                      value={Number(userShare) * lpLastDayTotal}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  </span>
                </p> */}
              </StatsInfoItem>

              {!hideLockRdnt && (
                <div className="ManageRadiantMainTop__item">
                  <StatsInfoItem
                    title={intl.formatMessage(messages.lockedStakedGeist)}
                    infoText={intl.formatMessage(messages.helpIconLockedStaked)}
                    value={prices.tokenPrice ? userTvl : undefined}
                    isLP
                  />

                  <p>
                    {intl.formatMessage(messages.vesting)}:
                    <span>
                      <CompactNumber value={earned.toString()} />
                    </span>
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantMainTop__CardWraper {
            .CardWrapper__children {
              padding: 22px 24px 20px 24px;
            }
          }

          .ManageRadiantMainTop {
            display: flex;
            justify-content: space-between;
            gap: 20px;

            &__StatsInfoItem__AutoRelock {
              display: flex;
              gap: 4px;
              font-family: 'PP Mori';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 17px;
              color: ${currentTheme.text.offset2};
            }

            &__topAnnual {
              display: flex;
              min-width: 238px;
              gap: 31px;
            }

            @include respond-to(md) {
              flex-direction: column;
            }

            &__italic-label {
              font-family: 'Inter';
              font-size: 12px;
              font-style: italic;
              color: ${currentTheme.text.offset2};
            }

            &__label {
              font-family: 'Inter';
              font-size: 12px;
              color: ${currentTheme.text.offset2};

              & span {
                font-weight: 600;
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}

export default ManageRadiantMainTop;
