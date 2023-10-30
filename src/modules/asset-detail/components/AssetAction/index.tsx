import { useState } from 'react';
import { ComputedUserReserve } from '@aave/math-utils';
import { BigNumber } from '@aave/protocol-js';

import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import CardWrapper from 'components/wrappers/CardWrapper';
import AssetBorrowAction from './AssetBorrowAction';
import AssetDepositAction from './AssetDepositAction';
import AssetWithdrawAction from './AssetWithdrawAction';
import AssetRepayAction from './AssetRepayAction';
import SegmentedController from 'components/basic/SegmentedController';

const ASSET_TABS: { value: string; label: string }[] = [
  { value: 'Borrow', label: 'Borrow' },
  { value: 'Deposit', label: 'Deposit' },
  { value: 'Withdraw', label: 'Withdraw' },
  { value: 'Repay', label: 'Repay' },
];

interface AssetActionProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  currencySymbol: string;
  walletBalance: BigNumber;
  selectedTab?: string;
}

function AssetAction({
  poolReserve,
  userReserve,
  currencySymbol,
  walletBalance,
  user,
  selectedTab,
}: AssetActionProps) {
  const [selectTab, setSelectTab] = useState(selectedTab ? selectedTab : ASSET_TABS[0].value);

  return (
    <CardWrapper className="AssetAction">
      <div className="AssetAction__container">
        <SegmentedController
          values={ASSET_TABS}
          selectedValue={selectTab}
          setSelectedValue={(value) => setSelectTab(value)}
          className="AssetAction__tabs"
        />

        {ASSET_TABS[0].value === selectTab && (
          <AssetBorrowAction
            currencySymbol={currencySymbol}
            user={user}
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
          />
        )}

        {ASSET_TABS[1].value === selectTab && (
          <AssetDepositAction
            currencySymbol={currencySymbol}
            user={user}
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
          />
        )}

        {ASSET_TABS[2].value === selectTab && (
          <AssetWithdrawAction
            currencySymbol={currencySymbol}
            user={user}
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
          />
        )}

        {ASSET_TABS[3].value === selectTab && (
          <AssetRepayAction
            currencySymbol={currencySymbol}
            user={user}
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
          />
        )}
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetAction {
          width: 100%;

          &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            width: 100%;
          }

          &__tabs {
            max-width: 360px;
          }

          &__action-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 70px;
            width: 100%;

            @include respond-to(sm) {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </CardWrapper>
  );
}

export default AssetAction;
