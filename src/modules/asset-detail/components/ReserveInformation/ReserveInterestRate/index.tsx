import { useThemeContext } from 'aave-ui-kit';

import StatsInfoItem from 'components/StatsInfoItem';

interface ReserveInterestRateProps {
  reserveOverviewData: any;
}

export default function ReserveInterestRate({ reserveOverviewData }: ReserveInterestRateProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="ReserveInterestRate">
      <p className="ReserveInterestRate__title">Interest rate model</p>
      <StatsInfoItem
        title="Utilization rate"
        value={reserveOverviewData.borrowingEnabled ? reserveOverviewData.utilizationRate * 100 : 0}
        isPercent
      />
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ReserveInterestRate {
            display: flex;
            gap: 20px;
            padding: 24px;

            &__title {
              font-weight: 600;
              font-size: 16px;
              color: ${currentTheme.text.main};
              max-width: 200px;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
