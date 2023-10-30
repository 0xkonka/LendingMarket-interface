import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

interface TabButtonsProps {
  values: { value: string; label: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function TabButtons({
  values,
  selectedValue,
  setSelectedValue,
  className,
  disabled = false,
}: TabButtonsProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const handleChange = useCallback(
    (value: string) => () => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  return (
    <div
      className={classNames(
        'TabButtons',
        {
          TabButtons__disabled: disabled,
        },
        className
      )}
    >
      {values.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <button
            type="button"
            key={item.label}
            className={classNames('TabButtons__button', {
              TabButtons__selectedButton: isSelected,
            })}
            onClick={disabled ? () => {} : handleChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TabButtons {
          display: flex;
          align-items: center;
          gap: 4px;
          width: 100%;

          &__disabled &__button {
            cursor: not-allowed;
          }

          &__button {
            padding: 8px 12px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 12px;
            color: ${currentTheme.text2.subdued.hex};
            line-height: 1;
          }

          &__button:hover {
            color: ${currentTheme.text2.default.hex};
          }

          &__selectedButton {
            background: ${isCurrentThemeDark
              ? 'rgba(163, 135, 255, 0.05)'
              : 'rgba(120, 79, 254, 0.05)'};
            color: ${currentTheme.accent.default.hex};
            transition: all 0.2s ease-in-out;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
