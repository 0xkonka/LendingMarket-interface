import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TokenIcon, getAssetColor, useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { BigNumber } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import StatsInfoItem from 'components/StatsInfoItem';
import OpenArrowIcon from 'icons/OpenArrow';
import DepositFormCard from 'components/forms/DepositFormCard';
import BorrowFormCard from 'components/forms/BorrowFormCard';

interface ReserveTopInfoProps {
  symbol: string;
  reserveOverviewData: any;
  walletBalance: BigNumber;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

const INFO_TABS = ['Deposits', 'Borrows', 'Loop'];

export default function ReserveTopInfo({
  symbol,
  reserveOverviewData,
  walletBalance,
  poolReserve,
  user,
}: ReserveTopInfoProps) {
  const history = useHistory();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const symbolColor = getAssetColor(symbol);

  const [open, setOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(INFO_TABS[0]);

  const tabHandler = (tab: string) => () => {
    if (tab === INFO_TABS[2]) {
      history.push(`/loop/?symbol=${symbol}`);
      return;
    }

    setSelectedTab(tab);
  };

  return (
    <div className="ReserveTopInfo">
      <div className="ReserveTopInfo__header-container">
        <div
          className={classNames('ReserveTopInfo__header-info-container', {
            ReserveTopInfo__headerSelected: open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        >
          <TokenIcon width={32} height={32} tokenSymbol={symbol} tokenFullName={`${symbol}`} />

          <div className="ReserveTopInfo__header-info-row">
            <StatsInfoItem
              title="Reserve size"
              value={Number(reserveOverviewData.totalLiquidity)}
              dollarPrefix
            />
            <StatsInfoItem
              title="Available liquidity"
              value={Number(reserveOverviewData.availableLiquidity)}
              dollarPrefix
            />
            <StatsInfoItem
              title="Utilization rate"
              value={
                reserveOverviewData.borrowingEnabled ? reserveOverviewData.utilizationRate * 100 : 0
              }
              isPercent
            />
          </div>
          <OpenArrowIcon />
        </div>
      </div>

      {open && (
        <div>
          <div className="ReserveTopInfo__detail-top">
            {INFO_TABS.map((item) => (
              <p
                key={item}
                className={classNames(
                  'ReserveTopInfo__detail-top-item',
                  item === selectedTab && 'ReserveTopInfo__detail-top-item-selected',
                  item === INFO_TABS[2] && 'ReserveTopInfo__detail-top-item-disabled'
                )}
                onClick={tabHandler(item)}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="ReserveTopInfo__detail-content">
            {selectedTab === INFO_TABS[0] && (
              <DepositFormCard
                currencySymbol={symbol}
                poolReserve={poolReserve}
                walletBalance={walletBalance}
                user={user}
              />
            )}

            {selectedTab === INFO_TABS[1] && (
              <BorrowFormCard currencySymbol={symbol} poolReserve={poolReserve} user={user} />
            )}
          </div>
        </div>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ReserveTopInfo {
            display: flex;
            flex-direction: column;

            &__header-container {
              display: flex;
              flex-direction: column;
              padding: 24px 0;
            }

            &__header-info-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-left: 4px solid ${symbolColor};
              padding: 0 24px;
            }

            &__header-info-row {
              display: flex;
              gap: 40px;
            }

            &__headerSelected {
              & svg {
                transform: rotate(-180deg);
              }
            }

            &__detail-top {
              display: flex;
            }

            &__detail-top-item {
              cursor: pointer;
              text-align: center;
              width: 143px;
              padding: 12px 24px;
              color: ${currentTheme.text.main};
            }

            &__detail-top-item-selected {
              cursor: pointer;
              padding: 12px 24px;
              background-color: ${isCurrentThemeDark
                ? currentTheme.interface.mainTable
                : currentTheme.interface.tableBorder};
            }

            &__detail-top-item-disabled {
              color: ${currentTheme.text.main};
              background-color: rgba(71, 81, 103, 0.25);
            }

            &__detail-content {
              padding: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}
