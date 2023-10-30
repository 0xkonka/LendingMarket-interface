import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { isEmpty } from 'helpers/utility';

interface DurationButtonsProps {
  values: { value: any; label: any; lockDuration: string }[];
  selectedValue: any;
  setSelectedValue: (value: any) => void;
}

export default function DurationButtons({
  values,
  selectedValue,
  setSelectedValue,
}: DurationButtonsProps) {
  const { currentTheme } = useThemeContext();

  const handleChange = useCallback(
    (value: string) => () => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  if (isEmpty(values)) {
    return null;
  }

  return (
    <div className="DurationButtons">
      <p className="DurationButtons__bar" />
      {values.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <div key={item.value} className="DurationButtons__itemContainer">
            <button
              type="button"
              className={classNames('DurationButtons__button', {
                DurationButtons__selectedButton: isSelected,
              })}
              onClick={handleChange(item.value)}
            >
              {item.label}
            </button>
            <p className="DurationButtons__duration">{item.lockDuration}</p>
          </div>
        );
      })}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .DurationButtons {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;

          &__itemContainer {
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-items: center;
          }

          &__bar {
            top: 15px;
            left: 20px;
            position: absolute;
            height: 2px;
            width: calc(100% - 40px);
            background-color: ${currentTheme.brand.main};
          }

          &__button {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            font-size: 10px;
            border-radius: 50px;
            color: ${currentTheme.brand.main};
            border: 1px solid ${currentTheme.brand.main};
            background: ${currentTheme.interface.mainTable};

            &:hover {
              color: ${currentTheme.interface.mainTable};
              background: ${currentTheme.brand.main};
            }
          }

          &__selectedButton {
            color: ${currentTheme.interface.mainTable};
            background: ${currentTheme.brand.main};
          }

          &__duration {
            font-size: 12px;
            color: ${currentTheme.brand.main};
          }
        }
      `}</style>
    </div>
  );
}
