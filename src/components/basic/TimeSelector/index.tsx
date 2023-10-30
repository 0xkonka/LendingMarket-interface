import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { isEmpty } from 'helpers/utility';
import CompactNumber from '../CompactNumber';

interface TimeSelectorProps {
  values: { value: any; label: any; lockDuration: string }[];
  selectedValue: any;
  setSelectedValue: (value: any) => void;
  onChangeHandler?: (value: any) => void;
  isMobile?: boolean;
  isSelectable?: boolean;
  aprLabels?: number[];
}

export default function TimeSelector({
  values,
  selectedValue,
  aprLabels,
  setSelectedValue,
}: TimeSelectorProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const handleChange = useCallback(
    (value: string) => () => {
      setSelectedValue(value);
      console.log(value);
    },
    [setSelectedValue]
  );

  if (isEmpty(values)) {
    return null;
  }

  return (
    <div>
      <div className="TimeSelector">
        {values.map((item) => {
          const isSelected = selectedValue === item.value;
          return (
            <div
              key={item.value}
              className={classNames('TimeSelector__itemContainer', `TimeSelector__${item.label}`, {
                TimeSelector__selectedButton: isSelected,
              })}
            >
              <button
                type="button"
                className="TimeSelector__button"
                onClick={handleChange(item.value)}
              >
                {item.label === '25X'
                  ? '12 months'
                  : item.label === '10X'
                  ? '6 months'
                  : item.label === '4X'
                  ? '3 months'
                  : item.label === '1X'
                  ? '1 month'
                  : null}
              </button>
            </div>
          );
        })}
      </div>
      <div className="TimeSelector__Labels">
        {aprLabels &&
          aprLabels.map((label, index) => {
            const isSelected = selectedValue === index;
            return (
              <div
                key={index}
                className={classNames(
                  'TimeSelector__Labels__itemContainer',
                  `TimeSelector__Labels__${index}`,
                  {
                    TimeSelector__Labels__selectedButton: isSelected,
                  }
                )}
              >
                <label>
                  <CompactNumber
                    value={label * 100}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                  % APR
                </label>
              </div>
            );
          })}
      </div>

      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TimeSelector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row-reverse;
          background: ${isCurrentThemeDark
            ? 'rgba(71,81,103,0.25)'
            : currentTheme.interface.divider};
          height: 36px;
          border-radius: 60px;
          width: 100%;
          padding: 4px;

          &__itemContainer {
            width: 100%;
            border-radius: 50px;
          }

          &__button {
            width: 100%;
            height: 28px;
            font-size: 12px;
            font-weight: 600;
            color: ${currentTheme.text.offset3};
          }

          &__button:hover {
            color: ${currentTheme.text.offset1};
          }

          &__selectedButton {
            background-color: ${currentTheme.background.main};
            box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
            .TimeSelector__button {
              color: ${currentTheme.text.offset1};
            }
          }

          &__25X.TimeSelector__selectedButton {
            background: ${isCurrentThemeDark
              ? currentTheme.gradient.main
              : 'linear-gradient(to left, #c800fa 1.25%, #5f00fa 50%, #4c00c7 101%)'};
            box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
            .TimeSelector__button {
              color: #fff;
            }
          }
        }

        .TimeSelector__Labels {
          display: flex;
          justify-content: space-around;
          flex-direction: row-reverse;
          width: 100%;
          margin-top: 8px;

          label {
            width: 100%;
            font-family: 'Inter';
            font-size: 11px;
            font-weight: 600;
            margin-top: 8px;
            color: ${currentTheme.text.offset3};
          }

          &__selectedButton {
            label {
              color: ${currentTheme.text.offset1};
            }
          }

          &__3.TimeSelector__Labels__selectedButton {
            label {
              background-image: ${isCurrentThemeDark
                ? currentTheme.gradient.main
                : 'linear-gradient(to left, #c800fa 1.25%, #5f00fa 50%, #4c00c7 101%)'};
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      `}</style>
    </div>
  );
}
