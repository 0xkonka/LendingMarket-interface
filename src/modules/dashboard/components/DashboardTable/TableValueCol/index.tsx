import Value from 'components/basic/Value';
import TableCol from '../TableCol';
import staticStyles from './style';

interface TableValueColProps {
  value: number;
  subValue?: number;
  tooltipId?: string;
  addedClasses?: string;
  addDollar?: boolean;
  onClick?: () => void;
}

export default function TableValueCol({
  value,
  subValue,
  tooltipId,
  addedClasses,
  onClick = () => {},
}: TableValueColProps) {
  let classes = `TableValueCol__value ${addedClasses}`;

  return (
    <TableCol className={`${addedClasses}`} onClick={onClick}>
      <Value
        value={value}
        subValue={subValue}
        subSymbol="USD"
        maximumValueDecimals={2}
        minimumValueDecimals={2}
        minimumSubValueDecimals={2}
        maximumSubValueDecimals={2}
        tooltipId={tooltipId}
        className={classes}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableValueCol__value {
          .Value__line {
            display: flex;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>
    </TableCol>
  );
}
