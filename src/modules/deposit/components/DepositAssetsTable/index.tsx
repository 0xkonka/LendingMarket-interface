import BasicAssetsTable from 'components/BasicAssetsTable';
import DepositItem from './DepositItem';
import { DepositTableItem } from './types';
import messages from './messages';

interface DepositAssetTableProps {
  listData: DepositTableItem[];
  userId?: string;
  sortName: string;
  setSortName: (value: string) => void;
  sortDesc: boolean;
  setSortDesc: (value: boolean) => void;
}

const columns = [
  { title: messages.asset },
  { title: messages.yourWalletBalance },
  {
    title: messages.APY,
    sortKey: 'liquidityRate',
  },
];

export default function DepositsAssetsTable({
  listData,
  userId,
  sortName,
  setSortName,
  sortDesc,
  setSortDesc,
}: DepositAssetTableProps) {
  return (
    <BasicAssetsTable
      sortName={sortName}
      setSortName={setSortName}
      sortDesc={sortDesc}
      setSortDesc={setSortDesc}
      columns={columns}
    >
      {listData.map((item) => (
        <DepositItem userId={userId} {...item} key={item.symbol} />
      ))}
    </BasicAssetsTable>
  );
}
