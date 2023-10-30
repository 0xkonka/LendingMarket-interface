import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import HealthFactor from 'components/HealthFactor';
import ReturnBackIcon from 'icons/ReturnBack';
import MaxLTVHelpModal from 'components/HelpModal/MaxLTVHelpModal';
import ValuePercent from 'components/basic/ValuePercent';
import CardWrapper from 'components/wrappers/CardWrapper';
import GradientLine from 'components/basic/GradientLine';
import CollateralCompositionBar from 'components/compositionBars/CollateralCompositionBar';
import PageMainHeader from 'components/PageMainHeader';
import messages from './messages';

interface RepayScreenWrapperProps {
  currencySymbol: string;
  currentBorrows: string;
  currentBorrowsInUSD: string;
  walletBalance: string;
  walletBalanceInUSD: string;
  totalCollateralUSD: string;
  totalCollateralMarketReferenceCurrency: string;
  healthFactor: string;
  loanToValue: string;
  children: ReactNode;
}

export default function RepayScreenWrapper({
  currencySymbol,
  currentBorrows,
  currentBorrowsInUSD,
  walletBalance,
  walletBalanceInUSD,
  totalCollateralUSD,
  totalCollateralMarketReferenceCurrency,
  healthFactor,
  loanToValue,
  children,
}: RepayScreenWrapperProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();

  return (
    <div className="RepayScreenWrapper">
      <PageMainHeader />
      <div className="RepayScreenWrapper__container">
        <ReturnBackIcon />

        <div className="RepayScreenWrapper__content">
          <CardWrapper className="RepayScreenWrapper__card-container" header={<p>Stats</p>}>
            <Row title={intl.formatMessage(messages.youBorrowed)} weight="light">
              <Value
                value={Number(currentBorrows)}
                subValue={Number(currentBorrowsInUSD)}
                symbol={currencySymbol}
                subSymbol="USD"
                maximumValueDecimals={4}
                minimumValueDecimals={1}
                maximumSubValueDecimals={2}
                minimumSubValueDecimals={2}
              />
            </Row>

            <Row title={intl.formatMessage(messages.walletBalance)} weight="light">
              <Value
                value={Number(walletBalance)}
                subValue={Number(walletBalanceInUSD)}
                symbol={currencySymbol}
                subSymbol="USD"
                maximumValueDecimals={4}
                minimumValueDecimals={1}
                maximumSubValueDecimals={2}
                minimumSubValueDecimals={2}
              />
            </Row>

            <GradientLine size={1} />

            <HealthFactor value={healthFactor} titleLightWeight={true} />
            <Row
              title={
                <MaxLTVHelpModal
                  text={intl.formatMessage(messages.loanToValue)}
                  lightWeight={true}
                />
              }
              weight="light"
            >
              <ValuePercent value={loanToValue} />
            </Row>
          </CardWrapper>

          <div className="RepayScreenWrapper__children">{children}</div>

          <CardWrapper className="RepayScreenWrapper__card-container" header={<p>Collateral</p>}>
            <Row title={intl.formatMessage(messages.yourCollateral)} weight="light">
              <Value
                value={Number(totalCollateralUSD)}
                subValue={
                  !networkConfig.usdMarket
                    ? Number(totalCollateralMarketReferenceCurrency)
                    : undefined
                }
                symbol="USD"
                subSymbol="ETH"
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                maximumSubValueDecimals={4}
                minimumSubValueDecimals={1}
              />
            </Row>

            <CollateralCompositionBar isColumn={true} />
          </CardWrapper>
        </div>
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RepayScreenWrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            &__container {
              display: flex;
              flex-direction: column;
              gap: 40px;
              max-width: $maxDeskWidth;
              width: 100%;
              padding: 48px 24px;
            }

            &__content {
              display: flex;
              justify-content: center;
              gap: 40px;

              @include respond-to(sm) {
                flex-direction: column;
                align-items: center;
              }
            }

            &__children {
              width: 100%;
              max-width: $maxFormWidth;
            }

            &__card-container {
              max-width: 251px;
              width: 100%;

              @include respond-to(sm) {
                max-width: unset;
              }

              .CardWrapper__children {
                display: flex;
                flex-direction: column;
                gap: 12px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
