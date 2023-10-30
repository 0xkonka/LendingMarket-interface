import { useThemeContext } from 'aave-ui-kit';

import ValuePercent from 'components/basic/ValuePercent';

interface GradientAPYProps {
  value: string | number;
}

export default function GradientAPY({ value }: GradientAPYProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={'GradientAPY'}>
      <ValuePercent
        value={value}
        maximumDecimals={2}
        minimumDecimals={2}
        className="GradientAPY__percent"
      />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .GradientAPY {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 5px;
          background-image: -webkit-gradient(
            linear,
            0% 100%,
            0% 0%,
            color-stop(0.33, rgb(95, 0, 250)),
            color-stop(0.67, rgb(0, 255, 170))
          );
          padding: 1px;

          &__percent {
            font-family: 'Inter';
            font-size: 14px;
            font-weight: 500 !important;
            padding: 6px;
            border-radius: 3px;
            color: ${currentTheme.text.main} !important;
            background-color: ${currentTheme.interface.mainTable};
          }
        }
      `}</style>
    </div>
  );
}
