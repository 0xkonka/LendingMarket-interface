import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import BasicTable from 'components/BasicTable';
import TableColumn from 'components/BasicTable/TableColumn';
import TableHeaderButton from 'components/BasicTable/TableHeaderButton';
import messages from './messages';
import { TokenIcon } from 'aave-ui-kit';

interface MarketTableProps {
  sortName: string;
  setSortName: (value: string) => void;
  sortDesc: boolean;
  setSortDesc: (value: boolean) => void;
  otherChain: string;
  children: ReactNode;
}

export default function MarketTable({
  sortName,
  setSortName,
  sortDesc,
  setSortDesc,
  otherChain,
  children,
}: MarketTableProps) {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();

  const columns = [
    {
      title: messages.assets,
      sortKey: 'currencySymbol',
    },
    {
      title: messages.depositAPY,
      sortKey: 'depositAPY',
    },
    {
      title: messages.borrowAPY,
      sortKey: 'variableBorrowRate',
    },
    {
      title: messages.loopAPR,
      sortKey: 'loopApr',
      icon: <TokenIcon tokenSymbol={currentMarketData?.chainSymbol || ''} width={15} height={15} />,
    },
    // {
    //   title: messages.loopAPR,
    //   sortKey: 'otherLoopApr',
    //   icon: <TokenIcon tokenSymbol={otherChain} width={15} height={15} />,
    // },
  ];

  return (
    <BasicTable
      className="MarketTable"
      headerColumns={
        <React.Fragment>
          {columns.map((column, index) => (
            <TableColumn
              className={index === 0 ? 'MarketTable__coin' : 'MarketTable__value'}
              key={index}
            >
              <TableHeaderButton
                sortName={sortName}
                sortDesc={sortDesc}
                setSortName={setSortName}
                setSortDesc={setSortDesc}
                sortKey={column.sortKey}
                withSorting={true}
                title={
                  <span className="MarketTable__title">
                    {column.icon} {intl.formatMessage(column.title)}
                  </span>
                }
                size="small"
              />
            </TableColumn>
          ))}
        </React.Fragment>
      }
    >
      {children}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .MarketTable {
            &__coin {
              align-items: flex-start !important;
              min-width: 180px;

              @include respond-to(sm) {
                min-width: 120px;
              }
            }

            &__value {
              min-width: 90px;
            }

            &__title {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              line-height: 17px;
              font-weight: 400;
            }
          }
        `}
      </style>
    </BasicTable>
  );
}
