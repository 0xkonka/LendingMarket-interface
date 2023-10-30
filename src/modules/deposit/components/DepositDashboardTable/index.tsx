import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import NoWalletContent from 'components/NoWalletContent';
import CardWrapper from 'components/wrappers/CardWrapper';
import DashboardTable from 'modules/dashboard/components/DashboardTable';
import TableHeader from 'modules/dashboard/components/DashboardTable/TableHeader';
import DashboardMobileCardsWrapper from 'modules/dashboard/components/DashboardMobileCardsWrapper';
import DepositItem from './DepositItem';
import DepositMobileCard from './DepositMobileCard';
import messages from './messages';
import { DepositTableItem } from './types';

interface DepositDashboardTableProps {
  listData: DepositTableItem[];
}

export default function DepositDashboardTable({ listData }: DepositDashboardTableProps) {
  const intl = useIntl();
  const { md, sm } = useThemeContext();
  const { user } = useDynamicPoolDataContext();

  const head = [
    intl.formatMessage(messages.yourDeposits),
    intl.formatMessage(messages.secondTableColumnTitle),
    intl.formatMessage(messages.apyRowTitle),
    intl.formatMessage(messages.collateral),
  ];

  const colWidth = useMemo(() => (md ? ['100%', 380, 110, '100%'] : [90, 110, 118, 110]), [md]);

  return (
    <CardWrapper header={<p>Deposits</p>} className="DepositDashboardTable">
      {!user ? (
        <NoWalletContent padding={24} />
      ) : !sm ? (
        <>
          <TableHeader head={head} colWidth={colWidth} />

          <DashboardTable>
            {listData.map((item, index) => (
              <DepositItem
                {...item}
                index={index}
                key={index}
                data-cy={`dashboardDespositListItem${item.reserve.symbol}`}
              />
            ))}
          </DashboardTable>
        </>
      ) : (
        <DashboardMobileCardsWrapper>
          {listData.map((item, index) => (
            <DepositMobileCard {...item} key={index} />
          ))}
        </DashboardMobileCardsWrapper>
      )}

      <style jsx={true} global={true}>{`
        .DepositDashboardTable {
          .CardWrapper__children {
            padding: 24px 0px !important;
          }
          .TableHeader__inner {
            display: ${(md || sm) && 'grid'};
            grid-template-columns: ${md && '1fr 1fr 1fr 1fr 1fr'};

            .APY,
            .Collateral {
              display: flex;
              justify-content: flex-end;
              max-width: ${(md || sm) && '100% !important'};
            }
          }
          .DepositItem {
          }
        }
      `}</style>
    </CardWrapper>
  );
}
