import { useIntl } from 'react-intl';

import { BorrowRateMode } from 'libs/pool-data-provider/graphql';
import TableItem from 'modules/dashboard/components/DashboardTable/TableItem';
import TableValueCol from 'modules/dashboard/components/DashboardTable/TableValueCol';
import TableButtonsWrapper from 'modules/dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from 'modules/dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from 'modules/dashboard/components/DashboardTable/TableAprCol';
import defaultMessages from 'defaultMessages';
import { BorrowTableItem } from './types';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export default function BorrowItem({
  reserve: { symbol },
  uiColor,
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  avg30DaysVariableRate,
  rdntRewardsBorrowApr,
  grossBorrowApr,
  borrowRateMode,
  onSwitchToggle,
  isActive,
  isFrozen,
  borrowingEnabled,
  stableBorrowRateEnabled,
  repayLink,
  borrowLink,
  reserveLink,
  index,
  vincentivesAPR,
  sincentivesAPR,
  ...rest
}: BorrowTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(reserveLink);
  }, [history, reserveLink]);

  return (
    <TableItem tokenSymbol={symbol} {...rest} className="BorrowTableItem">
      <TableValueCol
        onClick={handleClick}
        value={Number(currentBorrows)}
        subValue={Number(currentBorrowsUSD)}
      />

      <TableAprCol
        onClick={handleClick}
        value={Number(borrowRate)}
        thirtyDaysAverage={avg30DaysVariableRate}
        liquidityMiningValue={rdntRewardsBorrowApr || 0}
        grossValue={grossBorrowApr || 0}
        symbol={symbol}
        type={borrowRateMode === BorrowRateMode.Variable ? 'borrow-variable' : 'borrow-stable'}
      />

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive || !borrowingEnabled || isFrozen}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={borrowLink}
        />
        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.repay)}
          linkTo={repayLink}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
