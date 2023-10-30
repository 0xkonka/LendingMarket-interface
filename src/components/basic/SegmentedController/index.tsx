import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

interface SegmentedControllerProps {
  values: { value: string; label: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}

export default function SegmentedController({
  values,
  selectedValue,
  setSelectedValue,
  className,
}: SegmentedControllerProps) {
  const { currentTheme } = useThemeContext();

  const handleChange = useCallback(
    (value: string) => () => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  return (
    <div className={classNames('SegmentedController', className)}>
      {values.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <button
            type="button"
            key={item.label}
            className={classNames('SegmentedController__button', {
              SegmentedController__selectedButton: isSelected,
            })}
            onClick={handleChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .SegmentedController {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
          border-radius: 50px;
          padding: 4px;
          margin-top: 10px;
          background-color: rgba(71, 81, 103, 0.25);

          &__button {
            width: 100%;
            height: 32px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 50px;
            color: ${currentTheme.text.offset3};
          }

          &__button:hover {
            color: ${currentTheme.text.offset1};
          }

          &__selectedButton {
            background: ${currentTheme.interface.mainTable};
            box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
            color: ${currentTheme.text.main};
            transition: all 0.2s ease-in-out;
          }
        }
      `}</style>
    </div>
  );
}
