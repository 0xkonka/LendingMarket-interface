import { useEffect } from 'react';
import { BigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import CardWrapper from 'components/wrappers/CardWrapper';
import NoWalletContent from 'components/NoWalletContent';
import ContentLockingItem from '../ContentLockingItem';

interface ContentLockingProps {
  hideLockRdnt: boolean;
  locked: BigNumber;
  unlockable: BigNumber;
  lpLocked: BigNumber;
  lpUnlockable: BigNumber;
  lockedTable: { amount: string; expiryDate: Date; unlockTime: string; multiplier: number }[];
  lpLockedTable: { amount: string; expiryDate: Date; unlockTime: string; multiplier: number }[];
  rdntTokenInfo: {
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  };
  stakingTokenInfo: {
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  };
  statsRerender: Number;
  setStatsRerender: (value: Number) => void;
}

export function ContentLocking({
  hideLockRdnt,
  locked,
  lpLocked,
  unlockable,
  lpUnlockable,
  lockedTable,
  lpLockedTable,
  rdntTokenInfo,
  stakingTokenInfo,
  statsRerender,
  setStatsRerender,
}: ContentLockingProps) {
  const { user } = useDynamicPoolDataContext();
  const { lockingApr, lpLockingApr, fetchMFDData } = useMFDStats();

  useEffect(() => fetchMFDData(), [statsRerender]);

  return (
    <CardWrapper
      header={<p>dLP overview</p>}
      size="small"
      className="ManageRadiant__content-locking"
    >
      {!user ? (
        <NoWalletContent padding={24} />
      ) : (
        <>
          {!hideLockRdnt ? (
            <ContentLockingItem
              isLP={false}
              locked={locked}
              unlockable={unlockable}
              lockedTable={lockedTable}
              lockingApr={lockingApr}
              tokenInfo={rdntTokenInfo}
              setStatsRerender={setStatsRerender}
            />
          ) : null}

          <ContentLockingItem
            isLP={true}
            locked={lpLocked}
            unlockable={lpUnlockable}
            lockedTable={lpLockedTable}
            lockingApr={lpLockingApr}
            tokenInfo={stakingTokenInfo}
            setStatsRerender={setStatsRerender}
          />
        </>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiant__content-locking {
            height: 100%;

            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              height: 100%;
              min-height: 350px;
              padding: 0;
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}

export default ContentLocking;
