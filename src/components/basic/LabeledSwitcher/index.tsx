import classNames from 'classnames';
import { useThemeContext, LabeledSwitch } from 'aave-ui-kit';

type LabeledSwitcherProps = {
  value: boolean;
  leftOption: string;
  rightOption: string;
  onToggle: (value: boolean) => void;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  disabled?: boolean;
  darkOnDarkMode?: boolean;
};

const BASE_WIDTH = 240;
const BASE_HEIGHT = 36;
const BASE_FONT_SIZE = 14;

export default function LabeledSwitcher({
  value,
  leftOption,
  rightOption,
  onToggle,
  className,
  width,
  height,
  fontSize,
  disabled,
}: LabeledSwitcherProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <LabeledSwitch
        value={value}
        leftOption={leftOption}
        rightOption={rightOption}
        onToggle={onToggle}
        disabled={disabled}
        className={classNames(className)}
        width={width || BASE_WIDTH}
        height={height || BASE_HEIGHT}
        fontSize={fontSize || BASE_FONT_SIZE}
      />

      <style jsx={true} global={true}>{`
        .LabeledSwitch {
          &__pointer {
            span {
              background: #7159ff;
            }
          }

          &__inner {
            border-color: #7159ff;
          }

          button.LabeledSwitch__buttonActive {
            span {
              color: #fff;
            }
          }
        }

        .LabeledSwitchDisabled {
          .LabeledSwitch__pointer {
            span {
              opacity: 0.5;
            }
          }

          .LabeledSwitch__inner {
            opacity: 0.5;
          }
        }

        .LabeledSwitch__white {
          .LabeledSwitch__inner {
            background: ${currentTheme.textDarkBlue.hex};
            border-color: ${currentTheme.textDarkBlue.hex};
          }

          .LabeledSwitch__pointer {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }

          button {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }
        }

        .LabeledSwitchDisabled {
          .LabeledSwitch__inner {
            background: ${currentTheme.disabledGray.hex};
            border-color: ${currentTheme.disabledGray.hex};
          }
        }
      `}</style>
    </>
  );
}
