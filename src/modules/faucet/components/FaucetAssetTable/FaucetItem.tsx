import TableItem from 'components/BasicAssetsTable/TableItem';
import TableColumn from 'components/BasicTable/TableColumn';
import Value from 'components/basic/Value';
import { FaucetTableItem } from './types';

export default function FaucetItem({ symbol, userId, walletBalance, faucetUrl }: FaucetTableItem) {
  return (
    <TableItem symbol={symbol} url={faucetUrl}>
      <TableColumn>
        {!userId ? (
          <span>—</span>
        ) : (
          <Value value={Number(walletBalance)} maximumValueDecimals={5} minimumValueDecimals={5} />
        )}
      </TableColumn>
    </TableItem>
  );
}
