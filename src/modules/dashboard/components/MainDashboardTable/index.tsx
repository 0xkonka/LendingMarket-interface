import classNames from 'classnames';

import BorrowDashboardTable from 'modules/borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from 'modules/borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from 'modules/deposit/components/DepositDashboardTable';
import { DepositTableItem } from 'modules/deposit/components/DepositDashboardTable/types';
import staticStyles from './style';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
}: MainDashboardTableProps) {
  return (
    <div
      className={classNames('MainDashboardTable', {
        MainDashboardTable__onlyOne: isBorrow,
        MainDashboardTable__noBorrows: !borrowedPositions.length,
      })}
    >
      <div className="MainDashboardTable__inner">
        <div className="MainDashboardTable__left-inner">
          <DepositDashboardTable listData={depositedPositions} />
        </div>

        <div className="MainDashboardTable__right-inner">
          <BorrowDashboardTable listData={borrowedPositions} />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
