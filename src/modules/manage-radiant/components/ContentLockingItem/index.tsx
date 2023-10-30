import { useMemo, useState, useEffect } from 'react';
import { BigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import GradientLine from 'components/basic/GradientLine';
import { Table } from '../Table';
import ContentItemLock from './ContentItemLock';
import AutoRelock from './AutoRelock';
import RedeemLock from './RedeemLock';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import { isEmpty } from 'helpers/utility';
import messages from './messages';

interface ContentLockingItemProps {
  isLP: boolean;
  locked: BigNumber;
  unlockable: BigNumber;
  lockedTable: { amount: string; expiryDate: Date; unlockTime: string; multiplier: number }[];
  lockingApr: number;
  tokenInfo: {
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  };
  setStatsRerender: (value: Number) => void;
}

const COMPOUNDS_PER_YEAR = 365;

function isValidNumber(value: number) {
  return !isNaN(value) && isFinite(value);
}

export function ContentLockingItem({
  isLP,
  locked,
  unlockable,
  lockedTable,
  lockingApr,
  tokenInfo,
  setStatsRerender,
}: ContentLockingItemProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { getVestData } = useVestHandler();
  const { lockDurations } = useMFDStats();
  const { lpAutocompoundEnabled } = useUserMFDStats();
  const [aprLabels, setAprLabels] = useState<number[]>();

  useEffect(() => {
    if (!isEmpty(lockDurations) && lockDurations[0].hasOwnProperty('multiplier')) {
      const labels = lockDurations.map((duration) => {
        return duration.multiplier * lockingApr;
      });
      setAprLabels(labels);
    }
  }, [lockDurations, lockingApr]);

  const averageMultiplier = useMemo(() => {
    if (isEmpty(lockedTable)) {
      return 0;
    }
    let totalPower = 0;
    let totalLocked = 0;
    for (const lpLocked of lockedTable) {
      const amount = parseFloat(lpLocked.amount);
      if (isValidNumber(amount)) {
        totalPower += lpLocked.multiplier * amount;
        totalLocked += amount;
      }
    }
    return totalLocked !== 0 ? totalPower / totalLocked : 0;
  }, [lockedTable]);

  const lockingAprCalc = useMemo(
    () =>
      lpAutocompoundEnabled
        ? (1 + (lockingApr * averageMultiplier) / COMPOUNDS_PER_YEAR) ** COMPOUNDS_PER_YEAR - 1
        : averageMultiplier * lockingApr,
    [lpAutocompoundEnabled, lockingApr, averageMultiplier]
  );

  const symbol = isLP ? 'dLP' : 'RDNT';

  return (
    <>
      <div className="ManageRadiantContentLockingItem">
        <div className="ManageRadiantContentLockingItem__container">
          <p className="ManageRadiantContentLockingItem__description">
            {intl.formatMessage(messages.lockDescription, { symbol })}
          </p>

          <ContentItemLock
            isLP={isLP}
            maxAmount={tokenInfo.walletBalance.toString()}
            currencySymbol={symbol}
            walletBalance={tokenInfo.walletBalance}
            lockingAprCalc={lockingAprCalc}
            aprLabels={aprLabels}
            onMainTxConfirmed={() => {
              getVestData();
              setStatsRerender(Math.random());
            }}
          />
        </div>

        <GradientLine size={1} />

        <AutoRelock isLP={isLP} setStatsRerender={setStatsRerender} />

        <GradientLine size={1} />

        <RedeemLock isLP={isLP} unlockable={unlockable} setStatsRerender={setStatsRerender} />

        <GradientLine size={1} />

        <Table
          title={intl.formatMessage(messages.locks)}
          action="Locked"
          value={locked.toString()}
          table={lockedTable}
          onUnlockConfirmed={() => setStatsRerender(Math.random())}
        />
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantContentLockingItem {
            display: flex;
            flex-direction: column;

            &__container {
              display: flex;
              flex-direction: column;
              gap: 32px;
              padding: 15px 24px 24px 24px;
            }

            &__description {
              font-size: 12px;
              color: ${currentTheme.text.offset2};
            }

            &__apr {
              font-weight: 700;
              font-size: 15px;
              text-align: right;
              color: ${currentTheme.text.main};
            }

            &__badge {
              font-size: 12px;
              font-weight: 400;
              width: fit-content;
              margin-left: auto;

              background: ${currentTheme.interface.divider};
              padding: 2px 5px;
              border-radius: 15px;
            }
          }
        `}
      </style>
    </>
  );
}

export default ContentLockingItem;
