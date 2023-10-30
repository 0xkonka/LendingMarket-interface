import { useMemo } from 'react';
import classNames from 'classnames';
import { BigNumberValue } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import CompactNumber from 'components/basic/CompactNumber';
interface ValuePercentProps {
  value: BigNumberValue;
  percentSymbol?: boolean;
  maximumDecimals?: number;
  minimumDecimals?: number;
  color?: 'dark' | 'primary' | 'secondary' | 'green' | 'red' | 'darkOrange' | 'white' | 'lightBlue';
  valueColor?: string;
  percentColor?: string;
  className?: string;
  onWhiteBackground?: boolean;
  showFullNum?: boolean;
}

export default function ValuePercent({
  value,
  percentSymbol = true,
  maximumDecimals,
  minimumDecimals,
  color = 'dark',
  percentColor,
  className,
  valueColor,
  onWhiteBackground,
  showFullNum = false,
}: ValuePercentProps) {
  const { currentTheme } = useThemeContext();

  const formattedValue = useMemo(() => {
    const result = percentSymbol ? Number(value) * 100 : Number(value);
    return result;
  }, [percentSymbol, value]);

  return (
    <p
      className={classNames('ValuePercent', `ValuePercent__${color}`, className)}
      style={{ color: valueColor }}
    >
      <CompactNumber
        value={formattedValue}
        maximumFractionDigits={formattedValue >= 100 ? 0 : maximumDecimals || 2}
        minimumFractionDigits={formattedValue >= 100 ? 0 : minimumDecimals || undefined}
        showFullNum={false}
      />

      {percentSymbol && <span style={{ color: percentColor }}>%</span>}

      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ValuePercent {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 16.94px;
          color: ${currentTheme.text.main};
          font-family: 'Inter';
        }
      `}</style>
    </p>
  );
}
