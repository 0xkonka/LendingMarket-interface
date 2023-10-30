import { useCallback } from 'react';
import { Range } from 'react-range';
import { useThemeContext } from 'aave-ui-kit';

import Value from '../Value';

interface InputBarProps {
  value: number;
  onChange: (amount: string) => void;
  label?: string;
  minAmount: string;
  maxAmount: string;
}

export default function InputBar({ value, label, onChange, minAmount, maxAmount }: InputBarProps) {
  const { currentTheme } = useThemeContext();

  const handleChange = useCallback(
    (value: number[]) => {
      onChange(value[0].toString());
    },
    [onChange]
  );

  return (
    <div className="InputBar">
      <div className="InputBar__label">
        <p>{label}</p>
        <Value value={value} color="dark" />
      </div>

      <div className="InputBar__range-container">
        <span className="InputBar__title">{minAmount}</span>
        <div className="InputBar__range-inner">
          <Range
            step={Number(maxAmount) / 100}
            min={Number(minAmount)}
            max={Number(maxAmount)}
            values={[value]}
            onChange={(values) => handleChange(values)}
            renderTrack={({ props, children }) => (
              <div className="InputBar__track" {...props}>
                {children}
              </div>
            )}
            renderThumb={({ props }) => <div className="InputBar__thumb" {...props} />}
          />
        </div>
        <span className="InputBar__title">{maxAmount}</span>
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .InputBar {
          margin: 10px 0;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;

          &__title {
            font-family: 'Inter';
            font-size: 11px;
            color: ${currentTheme.text.offset3};
          }

          &__label {
            display: flex;
            align-items: center;
            gap: 4px;
            color: ${currentTheme.text.offset2};
            margin-bottom: 8px;

            .Value .Value__value {
              font-size: $fontSizeSmall;
              color: ${currentTheme.text.offset2};
            }
          }

          &__range-container {
            display: flex;
            align-items: center;
            gap: 4px;
            width: 100%;
          }

          &__range-inner {
            width: 100%;
            border-radius: 10px;
            background-color: ${currentTheme.brand.main};
          }

          .InputBar__track {
            height: 5px;
            width: calc(100% - 14px);
            margin: 0 auto;
            border-radius: 10px;
          }

          .InputBar__thumb {
            width: 18px;
            height: 18px;
            border-radius: 28px;
            border: 2px solid ${currentTheme.text.offset2};
            outline: none !important;
            background: ${currentTheme.interface.mainTable};
          }
        }
      `}</style>
    </div>
  );
}
