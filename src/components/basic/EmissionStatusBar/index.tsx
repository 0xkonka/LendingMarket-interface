import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useMemo } from 'react';

interface EmissionStatusBarProps {
  locked: number;
  color?: 'main' | 'primary' | 'positive' | 'negative' | 'brandMain' | 'disabled';
  backgroundColor?: string;
  round?: boolean;
  className?: string;
}

const MAX_MULTIPLIER = 4;

export default function EmissionStatusBar({
  locked,
  color = 'main',
  backgroundColor,
  round = true,
  className,
}: EmissionStatusBarProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { requiredRdntToClaim } = useVestHandler();

  const requiredPercent = 100 / MAX_MULTIPLIER;

  const lockedPercent = useMemo(
    () => (requiredRdntToClaim ? (locked * 100) / (requiredRdntToClaim * MAX_MULTIPLIER) : 0),
    [locked, requiredRdntToClaim]
  );

  return (
    <div
      className={classNames(
        `EmissionStatusBar`,
        {
          EmissionStatusBar__round: round,
        },
        className
      )}
    >
      <p className="EmissionStatusBar__required-percent" />
      <div
        className={classNames(`EmissionStatusBar__progress`, `EmissionStatusBar__${color}`, {
          EmissionStatusBar__progressRound: round,
        })}
      ></div>
      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .EmissionStatusBar {
          position: relative;
          display: flex;
          width: 100%;
          height: 8px;
          background-color: ${backgroundColor
            ? backgroundColor
            : isCurrentThemeDark
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)'};

          &__required-percent {
            position: absolute;
            z-index: 2;
            left: 0;
            bottom: -4px;
            height: 16px;
            width: ${requiredPercent > 100 ? '100%' : `${requiredPercent}%`};
            border-right: 2px solid ${currentTheme.accent.default.hex};
          }

          &__progress {
            height: 8px;
            width: ${lockedPercent > 100 ? '100%' : `${lockedPercent}%`};
          }

          &__main {
            background: ${currentTheme.accent.default.hex};
          }

          &__primary {
            background-image: ${currentTheme.gradient.main};
          }

          &__positive {
            background-image: ${currentTheme.gradient.positive};
          }

          &__negative {
            background-image: ${currentTheme.gradient.negative};
          }

          &__brandMain {
            background: ${currentTheme.accent.default.hex};
          }

          &__disabled {
            background: #5d6e86;
          }

          &__round {
            border-radius: 50px !important;
          }

          &__progressRound {
            border-radius: ${lockedPercent > 100 ? '10px !important' : `10px 0 0 10px !important`};
          }
        }
      `}</style>
    </div>
  );
}
