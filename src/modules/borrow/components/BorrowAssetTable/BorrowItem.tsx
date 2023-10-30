import TableItem from 'components/BasicAssetsTable/TableItem';
import TableColumn from 'components/BasicTable/TableColumn';
import Value from 'components/basic/Value';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import NoData from 'components/basic/NoData';
import { isAssetStable } from 'helpers/config/assets-config';
import { BorrowTableItem } from './types';

export default function BorrowItem({
  id,
  symbol,
  underlyingAsset,
  availableBorrows,
  availableBorrowsInUSD,
  variableBorrowRate,
  avg30DaysVariableRate,
  rdntRewardsBorrowApr,
  grossBorrowApr,
  userId,
  isFreezed,
}: BorrowTableItem) {
  const url = `/borrow/${underlyingAsset}-${id}`;

  return (
    <TableItem
      symbol={symbol}
      url={url}
      isFreezed={isFreezed}
      isBorrow={true}
      darkOnDarkMode={true}
    >
      <TableColumn>
        {!userId || Number(availableBorrows) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(availableBorrows)}
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
          />
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <LiquidityMiningCard
            value={variableBorrowRate}
            thirtyDaysValue={avg30DaysVariableRate}
            liquidityMiningValue={rdntRewardsBorrowApr}
            grossValue={grossBorrowApr}
            symbol={symbol}
            type="borrow-variable"
          />
        </TableColumn>
      )}
    </TableItem>
  );
}
