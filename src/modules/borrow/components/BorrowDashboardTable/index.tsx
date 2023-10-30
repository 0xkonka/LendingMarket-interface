import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import DashboardTable from 'modules/dashboard/components/DashboardTable';
import TableHeader from 'modules/dashboard/components/DashboardTable/TableHeader';
import DashboardMobileCardsWrapper from 'modules/dashboard/components/DashboardMobileCardsWrapper';
import CardWrapper from 'components/wrappers/CardWrapper';
import BorrowItem from './BorrowItem';
import BorrowMobileCard from './BorrowMobileCard';
import messages from './messages';
import { BorrowTableItem } from './types';
import NoWalletContent from 'components/NoWalletContent';

interface BorrowDashboardTableProps {
  listData: BorrowTableItem[];
}

export default function BorrowDashboardTable({ listData }: BorrowDashboardTableProps) {
  const intl = useIntl();
  const { xl, lg, md, sm } = useThemeContext();
  const { user } = useDynamicPoolDataContext();

  const head = [
    intl.formatMessage(messages.yourBorrows),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
    '',
  ];

  const colWidth = useMemo(() => (md ? ['100%', 380, 110, '100%'] : [90, 110, 160, 110]), [md]);

  return (
    <CardWrapper className="BorrowDashboardTable" header={<p>Borrows</p>}>
      {!user ? (
        <NoWalletContent padding={24} />
      ) : !sm ? (
        <>
          <TableHeader head={head} colWidth={colWidth} />

          <DashboardTable>
            {listData.map((item, index) => (
              <BorrowItem
                {...item}
                index={index}
                key={index}
                data-cy={`dashboardBorrowListItem_${item.reserve.symbol}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper>
          {listData.map((item, index) => (
            <BorrowMobileCard {...item} key={index} />
          ))}
        </DashboardMobileCardsWrapper>
      )}

      <style jsx={true} global={true}>{`
        .BorrowDashboardTable {
          .CardWrapper__children {
            padding: 24px 0 !important;

            .TableHeader__inner {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;

              .APY {
                display: flex;
                justify-content: flex-end;
              }

              .Borrowed {
                display: flex;
                align-items: start;
                max-width: 100%;
              }
            }
          }

          .BorrowTableItem {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;

            .TableButtonsWrapper {
              max-width: ${xl && !lg ? 140 : '100%'};
              align-items: end;
            }

            .TableAprCol {
              display: flex;
              align-items: end;
            }
          }
        }
      `}</style>
    </CardWrapper>
  );
}
