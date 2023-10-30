import { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import CardWrapper from 'components/wrappers/CardWrapper';
import MaxLTVHelpModal from 'components/HelpModal/MaxLTVHelpModal';
import LoadingSpinner from 'components/LoadingSpinner';
import StatsInfoItem from 'components/StatsInfoItem';
import Row from 'components/basic/Row';
import GradientLine from 'components/basic/GradientLine';
import NoWalletContent from 'components/NoWalletContent';
import HealthSpeedChart from 'components/HealthSpeedChart';
import DepositComposition from 'components/Asset/DepositComposition';
import BorrowComposition from 'components/Asset/BorrowComposition';
import { isEmpty } from 'helpers/utility';
import messages from './messages';

const LENDING_TABS = ['Deposits', 'Borrows', 'HealthFactor'];

export default function DashboardTopLending() {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const [selectedTab, setSelectedTab] = useState(LENDING_TABS[0]);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );

  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  return (
    <CardWrapper className="DashboardTopLending" header={<p>Lending</p>}>
      {!user ? (
        <NoWalletContent padding={24} />
      ) : (
        <>
          <LoadingSpinner loading={isEmpty(reserves)} />
          <div className="DashboardTopLending__header">
            <div
              className={classNames('DashboardTopLending__header-item', {
                DashboardTopLending__headerSelected: selectedTab === LENDING_TABS[0],
              })}
              onClick={() => setSelectedTab(LENDING_TABS[0])}
            >
              <StatsInfoItem
                title={intl.formatMessage(messages.deposits)}
                value={
                  user && Number(user.totalLiquidityUSD) !== 0
                    ? Number(user.totalLiquidityUSD)
                    : 0.0
                }
                dollarPrefix
              />
            </div>
            <div
              className={classNames('DashboardTopLending__header-item', {
                DashboardTopLending__headerSelected: selectedTab === LENDING_TABS[1],
              })}
              onClick={() => setSelectedTab(LENDING_TABS[1])}
            >
              <StatsInfoItem
                title={intl.formatMessage(messages.borrows)}
                value={
                  user && Number(user.totalBorrowsUSD) !== 0 ? Number(user.totalBorrowsUSD) : 0.0
                }
                dollarPrefix
              />
            </div>
            <div
              className={classNames('DashboardTopLending__header-item', {
                DashboardTopLending__headerSelected: selectedTab === LENDING_TABS[2],
              })}
              onClick={() => setSelectedTab(LENDING_TABS[2])}
            >
              <StatsInfoItem
                title={`Health factor`}
                value={Number(Number(user?.healthFactor || 0) > 0 ? user?.healthFactor : Infinity)}
                color={
                  Number(user?.healthFactor || 0) > 0 &&
                  Number(user?.healthFactor || 0) < 1.3 &&
                  Number(user.totalBorrowsUSD) !== 0
                    ? 'negative'
                    : Number(user?.healthFactor || 0) < 2.1 && Number(user.totalBorrowsUSD) !== 0
                    ? 'yellow'
                    : 'positive'
                }
              />
            </div>
          </div>

          <GradientLine size={1} />

          {selectedTab === LENDING_TABS[0] && <DepositComposition />}

          {selectedTab === LENDING_TABS[1] && <BorrowComposition />}

          {selectedTab === LENDING_TABS[2] && (
            <div className="DashboardTopLending__health-container">
              <div className="DashboardTopLending__health-info-container">
                <Row title={'Borrowing Power Used'}>
                  {intl.formatNumber(Number(collateralUsagePercent) * 100, {
                    maximumFractionDigits: 2,
                  })}{' '}
                  %
                </Row>
                <Row title={<MaxLTVHelpModal text="Current LTV" />}>
                  {intl.formatNumber(Number(loanToValue) * 100, { maximumFractionDigits: 2 })} %
                </Row>
              </div>

              <HealthSpeedChart
                value={Number(Number(user?.healthFactor || 0) > 0 ? user?.healthFactor : Infinity)}
              />
            </div>
          )}
        </>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .DashboardTopLending {
            height: 100% !important;

            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0;
              position: relative;
            }

            &__header {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
            }

            &__header-item {
              cursor: pointer;
              padding: 12px 24px;
              background-color: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25)'
                : 'rgba(204, 213, 225, 0.25)'};

              .StatsInfoItem__title {
                color: ${currentTheme.text.offset3};
              }

              &:hover:not(.DashboardTopLending__headerSelected) {
                .StatsInfoItem__title {
                  color: ${currentTheme.text.offset1};
                  font-weight: 600 !important;
                }
              }
            }

            &__headerSelected {
              background-color: ${currentTheme.interface.mainTable};

              .StatsInfoItem__title {
                color: ${currentTheme.text.offset1};
                font-weight: 600 !important;
              }
            }

            &__health-container {
              display: flex;
              align-items: center;
              flex-direction: column;
              width: 100%;
              gap: 50px;
              padding: 24px;
            }

            &__health-info-container {
              font-family: 'PP Mori';
              display: flex;
              justify-content: space-between;
              width: 100%;
              gap: 8px;
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
