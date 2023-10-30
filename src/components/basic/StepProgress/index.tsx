import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

interface StepProgressProps {
  steps: number;
  step: number;
  className?: string;
}

export default function StepProgress({ steps, step, className }: StepProgressProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      {steps < 2 ? (
        <p
          className={classNames('StepProgress__button', 'StepProgress__selectedButton', className)}
        >
          {1}
        </p>
      ) : (
        <div className={classNames('StepProgress', className)}>
          <p className="StepProgress__bar" />
          {Array.from(Array(steps).keys()).map((item) => {
            const isSelected = item <= step;

            return (
              <p
                key={item}
                className={classNames('StepProgress__button', {
                  StepProgress__selectedButton: isSelected,
                })}
              >
                {item + 1}
              </p>
            );
          })}
        </div>
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .StepProgress {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 200px;

          &__itemContainer {
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-items: center;
          }

          &__bar {
            top: 8px;
            left: 15px;
            position: absolute;
            height: 2px;
            width: calc(100% - 30px);
            background-color: ${currentTheme.text.offset3};
          }

          &__button {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            font-size: 12px;
            border-radius: 50px;
            color: #ffffff;
            background: ${currentTheme.text.offset4};
          }

          &__selectedButton {
            background: ${currentTheme.brand.main};
          }
        }
      `}</style>
    </>
  );
}
