import { useThemeContext } from 'aave-ui-kit';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import GradientLine from 'components/basic/GradientLine';
import StatsInfoItem from 'components/StatsInfoItem';
import OutLinkIcon from 'icons/OutLink';
import AssetInfoCard from 'components/Asset/AssetInfoCard';

interface ReserveBorrowInfoProps {
  reserveOverviewData: any;
}

export default function ReserveBorrowInfo({ reserveOverviewData }: ReserveBorrowInfoProps) {
  const { currentTheme } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();

  return (
    <div className="ReserveBorrowInfo">
      <p className="ReserveBorrowInfo__title">Borrow info</p>
      <div className="ReserveBorrowInfo__info-container">
        <StatsInfoItem
          title="Total Borrowed"
          value={Number(reserveOverviewData.totalBorrows)}
          subValue={Number(reserveOverviewData.totalBorrowsInUsd)}
          dollarPrefix
        />
        <GradientLine size={1} direction="vertical" />
        <StatsInfoItem
          title="APY, variable"
          value={reserveOverviewData.borrowingEnabled ? reserveOverviewData.variableAPY * 100 : 0}
          isPercent
        />
      </div>

      <p className="ReserveBorrowInfo__sub-title">Collector Info</p>
      <div className="ReserveBorrowInfo__info-detail-container">
        <AssetInfoCard>
          <StatsInfoItem title="Total Borrowed">
            <p className="ReserveBorrowInfo__info-percent">
              {reserveOverviewData.borrowingEnabled
                ? (reserveOverviewData.variableOverTotal * 100).toLocaleString()
                : 0}
              %
            </p>
          </StatsInfoItem>
        </AssetInfoCard>

        <AssetInfoCard>
          <StatsInfoItem title="Collector contract">
            <a
              href={`${networkConfig.explorerLink}address/${reserveOverviewData.underlyingAsset}`}
              className="ReserveBorrowInfo__text-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              View contract <OutLinkIcon />
            </a>
          </StatsInfoItem>
        </AssetInfoCard>
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ReserveBorrowInfo {
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

            &__info-percent {
              font-weight: 600;
              font-size: 14px;
              line-height: 1;
              color: ${currentTheme.text.main};
            }

            &__text-button {
              font-size: 12px;
              color: ${currentTheme.text.offset1};
            }
          }
        `}
      </style>
    </div>
  );
}
