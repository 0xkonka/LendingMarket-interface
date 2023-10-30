import { useState } from 'react';
import { BigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import LINKS from 'ui-config/links';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import CardWrapper from 'components/wrappers/CardWrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import ContainedButton from 'components/basic/ContainedButton';
import ZapIcon from 'icons/Zap';
import StatsInfoItem from 'components/StatsInfoItem';
import BarChartIcon from 'icons/BarChart';
import BarChartHoverIcon from 'icons/BarChartHover';
import MarketAPRModal from '../MarketAPRModal';
import { isEmpty } from 'helpers/utility';
import messages from './messages';
import MarketTopOtherAPR from './MarketTopOtherAPR';
import { WrappedOtherApolloProvider } from 'libs/apollo-config';

interface MarketTopContentProps {
  otherChain: string;
  loading: boolean;
  totalLockedInUsd: BigNumber;
  setOpenBuyModal: (openModal: boolean) => void;
  setOpenZapModal: (openModal: boolean) => void;
}

export default function MarketTopContent({
  otherChain,
  loading,
  totalLockedInUsd,
  setOpenBuyModal,
  setOpenZapModal,
}: MarketTopContentProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { prices } = useRdntPrices();
  const { currentMarketData } = useProtocolDataContext();
  const { lpMfdTotal, lpLockingApr, totalLockedLP } = useMFDStats();

  const v1TotalFees = 6476686.8;

  const [openChartModal, setOpenChartModal] = useState(false);

  return (
    <div className="MarketTopContent">
      <CardWrapper
        header={
          <div className="MarketTopContent__header">
            <p>{intl.formatMessage(messages.statsOverview)}</p>
            <button className="MarketTopContent__barchat" onClick={() => setOpenChartModal(true)}>
              {intl.formatMessage(messages.assetBreakdown)}
              <div className="MarketTopContent__barchat__icon">
                <BarChartIcon />
              </div>
              <div className="MarketTopContent__barchat__hover">
                <BarChartHoverIcon />
              </div>
            </button>
          </div>
        }
      >
        <div className="MarketTopContent__container">
          <LoadingSpinner loading={loading || isEmpty(prices)} />

          <StatsInfoItem
            title={intl.formatMessage(messages.totalMarketSize)}
            value={Number(totalLockedInUsd)}
            dollarPrefix
          />

          <StatsInfoItem
            title={'Total dLP value locked'}
            value={totalLockedLP * (prices?.lpTokenPrice || 0)}
            dollarPrefix
          >
            <ContainedButton
              round
              size="small"
              color="fourth"
              onClick={() => setOpenZapModal(true)}
            >
              <ZapIcon color={currentTheme.brand.main} width={18} height={18} />
              {intl.formatMessage(messages.zap)}
            </ContainedButton>
          </StatsInfoItem>

          <StatsInfoItem
            title={intl.formatMessage(messages.rdntPrice)}
            value={prices?.tokenPrice || 0}
            dollarPrefix
          >
            <ContainedButton
              round
              size="small"
              color="fourth"
              onClick={() => setOpenBuyModal(true)}
            >
              {intl.formatMessage(messages.buy)}
            </ContainedButton>
          </StatsInfoItem>

          <StatsInfoItem
            title={intl.formatMessage(messages.platformFeePaid)}
            infoText={intl.formatMessage(messages.platformFeePaidDescription)}
            value={lpMfdTotal + v1TotalFees}
            dollarPrefix
          >
            <ContainedButton
              round
              size="small"
              color="fourth"
              href={LINKS.MANAGE_RADIANT.link}
              onClick={() => setOpenBuyModal(true)}
            >
              {intl.formatMessage(messages.startEarning)}
            </ContainedButton>
          </StatsInfoItem>

          <div
            className={
              isCurrentThemeDark
                ? 'MarketTopContent__container__chainLockAPRDark'
                : 'MarketTopContent__container__chainLockAPR'
            }
          >
            <div
              className={
                isCurrentThemeDark
                  ? 'MarketTopContent__container__chainLockAPRDark__innerDark'
                  : 'MarketTopContent__container__chainLockAPR__inner'
              }
            >
              <StatsInfoItem
                title={intl.formatMessage(messages.lockApr)}
                infoText={intl.formatMessage(messages.lockAprDescription)}
                value={25 * lpLockingApr * 100}
                isPercent
                tokenSymbol={currentMarketData.chainSymbol}
              >
                <ContainedButton
                  round
                  size="small"
                  color="fourth"
                  href={LINKS.MANAGE_RADIANT.link}
                  onClick={() => setOpenBuyModal(true)}
                >
                  {intl.formatMessage(messages.lock)}
                </ContainedButton>
              </StatsInfoItem>

              <WrappedOtherApolloProvider>
                <MarketTopOtherAPR otherChain={otherChain} />
              </WrappedOtherApolloProvider>
            </div>
          </div>
        </div>
      </CardWrapper>

      <MarketAPRModal openModal={openChartModal} setOpenModal={setOpenChartModal} />
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .MarketTopContent {
          &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          &__header {
            display: flex;
            justify-content: space-between;
          }

          &__barchat {
            display: flex;
            font-weight: 600;
            font-size: 13px;
            line-height: 18px;
            text-align: right;
            color: ${currentTheme.text.offset3};
            gap: 8px;
            &__hover {
              display: none;
            }
          }

          &__barchat:hover {
            color: ${isCurrentThemeDark ? currentTheme.text.main : currentTheme.text.offset1};

            .MarketTopContent__barchat__hover {
              display: block;
            }
            .MarketTopContent__barchat__icon {
              display: none;
            }
          }

          &__container {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;

            @include respond-to(md) {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }

            @include respond-to(sm) {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .StatsInfoItem {
              padding: 24px;
            }

            &__chainLockAPR {
              background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0.4, #c1adff),
                color-stop(0.67, #bbc9da)
              );
              min-width: 240px; // It was 340px with bsc
              box-shadow: 0px 1px 3px #e6d9ff, 0px -1px 3px #d7e7f3;
              padding: 1px;
              border-radius: 0px 0px 10px 0px;

              grid-column: span 2;

              @include respond-to(md) {
                border-radius: 0px 0px 10px 10px;
              }

              &__inner {
                display: flex;
                background-color: #fff;
                border-radius: 0px 0px 10px 0px;
                box-shadow: 0px 1px 4px #d7e7f3 inset, 0px -1px 4px #e6d9ff inset;

                @include respond-to(md) {
                  border-radius: 0px 0px 10px 10px;
                }
              }
            }

            &__chainLockAPRDark {
              background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0.3, rgba(95, 0, 250, 0.6)),
                color-stop(0.7, rgba(0, 255, 170, 0.6))
              );
              min-width: 240px; // It was 340px with bsc
              padding: 1px;
              border-radius: 0px 0px 10px 0px;

              grid-column: span 2;

              @include respond-to(md) {
                border-radius: 0px 0px 10px 10px;
              }

              &__innerDark {
                display: flex;
                background-color: #0a0c10;
                border-radius: 0px 0px 10px 0px;

                @include respond-to(md) {
                  border-radius: 0px 0px 10px 10px;
                }
              }
            }
          }

          &__otherChainApr {
            .StatsInfoItem__main-value-container p {
              font-weight: 500;
              font-size: 16px;
              line-height: 30px;
            }
          }

          .CardWrapper__children {
            padding: 0px;
          }
        }
      `}</style>
    </div>
  );
}
