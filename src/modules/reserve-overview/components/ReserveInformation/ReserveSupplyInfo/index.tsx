import { useThemeContext } from 'aave-ui-kit';

import MaxLTVHelpModal from 'components/HelpModal/MaxLTVHelpModal';
import LiquidationThresholdHelpModal from 'components/HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from 'components/HelpModal/LiquidationBonusHelpModal';
import GradientLine from 'components/basic/GradientLine';
import StatsInfoItem from 'components/StatsInfoItem';
import AssetInfoCard from 'components/Asset/AssetInfoCard';
import PercentBlock from 'components/Asset/PercentBlock';

interface ReserveSupplyInfoProps {
  reserveOverviewData: any;
  rdntRewardsDepositApr: number;
  loopApr: number;
}

export default function ReserveSupplyInfo({
  reserveOverviewData,
  loopApr,
  rdntRewardsDepositApr,
}: ReserveSupplyInfoProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="ReserveSupplyInfo">
      <p className="ReserveSupplyInfo__title">Supply info</p>
      <div className="ReserveSupplyInfo__info-container">
        <StatsInfoItem
          title="Total supplied"
          value={Number(reserveOverviewData.totalLiquidity)}
          subValue={Number(reserveOverviewData.totalLiquidityInUsd)}
          dollarPrefix
        />
        <GradientLine size={1} direction="vertical" />
        <StatsInfoItem
          title="APY"
          value={reserveOverviewData.borrowingEnabled ? reserveOverviewData.supplyAPY * 100 : 0}
          isPercent
        />
        <GradientLine size={1} direction="vertical" />
        <StatsInfoItem title="RDNT APR" value={rdntRewardsDepositApr * 100} isPercent />
        <GradientLine size={1} direction="vertical" />
        <StatsInfoItem title="Loop APR" value={loopApr * 100} isPercent />
      </div>

      <p className="ReserveSupplyInfo__sub-title">
        Collateral Usage
        {reserveOverviewData.usageAsCollateralEnabled && <span>Can be used as collateral</span>}
      </p>

      <div className="ReserveSupplyInfo__info-detail-container">
        <AssetInfoCard>
          <PercentBlock
            value={reserveOverviewData.baseLTVasCollateral}
            titleComponent={<MaxLTVHelpModal text="Max LTV" />}
          />
        </AssetInfoCard>

        <AssetInfoCard>
          <PercentBlock
            value={
              reserveOverviewData.liquidationBonus <= 0
                ? 0
                : reserveOverviewData.liquidationThreshold
            }
            titleComponent={<LiquidationThresholdHelpModal text="Liquidation threshold" />}
          />
        </AssetInfoCard>

        <AssetInfoCard>
          <PercentBlock
            value={reserveOverviewData.liquidationBonus}
            titleComponent={<LiquidationBonusHelpModal text="Liquidation penalty" />}
          />
        </AssetInfoCard>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ReserveSupplyInfo {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 24px;

            &__title {
              font-weight: 600;
              font-size: 16px;
              color: ${currentTheme.text.main};
            }

            &__sub-title {
              display: flex;
              align-items: center;
              gap: 24px;
              font-weight: 600;
              font-size: 14px;
              color: ${currentTheme.text.offset1};

              & span {
                font-size: 12px;
                color: ${currentTheme.brand.main};
              }
            }

            &__info-container {
              display: flex;
              gap: 20px;
              flex-wrap: wrap;
            }

            &__info-detail-container {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 12px;
            }
          }
        `}
      </style>
    </div>
  );
}
