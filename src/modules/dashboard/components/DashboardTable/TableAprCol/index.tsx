import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import TableCol from '../TableCol';
import staticStyles from './style';

interface TableAprColProps {
  value: number;
  thirtyDaysAverage?: string;
  liquidityMiningValue: string | number;
  grossValue?: string | number;
  condition?: boolean;
  symbol?: string;
  type?: string;
  onClick?: () => void;
}

export default function TableAprCol({
  value,
  thirtyDaysAverage,
  liquidityMiningValue,
  grossValue,
  type,
  symbol,
  onClick = () => {},
}: TableAprColProps) {
  return (
    <TableCol onClick={onClick} className="TableAprCol">
      <LiquidityMiningCard
        value={value}
        thirtyDaysValue={thirtyDaysAverage}
        liquidityMiningValue={liquidityMiningValue}
        grossValue={grossValue}
        symbol={symbol}
        type={type}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
