import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

interface StatusBarProps {
  percent: number;
  color?: 'main' | 'primary' | 'positive' | 'negative' | 'brandMain' | 'disabled';
  round?: boolean;
  className?: string;
}

export default function StatusBar({
  percent,
  color = 'main',
  round = true,
  className,
}: StatusBarProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames(
        `StatusBar`,
        {
          StatusBar__round: round,
        },
        className
      )}
    >
      <div
        className={classNames(`StatusBar__progress`, `StatusBar__${color}`, {
          StatusBar__progressRound: round,
        })}
      ></div>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .StatusBar {
          display: flex;
          width: 100%;
          height: 8px;
          background-color: #8d8d8d;

          &__progress {
            width: ${percent > 100 ? '100%' : `${percent}%`};
          }

          &__main {
            background-image: ${currentTheme.gradient.main};
          }

          &__primary {
            background-image: ${currentTheme.gradient.primary};
          }

          &__positive {
            background-image: ${currentTheme.gradient.positive};
          }

          &__negative {
            background-image: ${currentTheme.gradient.negative};
          }

          &__brandMain {
            background: ${currentTheme.brand.main};
          }

          &__disabled {
            background: #5d6e86;
          }

          &__round {
            border-radius: 50px !important;
          }

          &__progressRound {
            border-radius: ${percent > 100 ? '10px !important' : `10px 0 0 10px !important`};
          }
        }
      `}</style>
    </div>
  );
}
