import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import HealthFactor from 'components/HealthFactor';
import MaxLTVHelpModal from 'components/HelpModal/MaxLTVHelpModal';
import ValuePercent from 'components/basic/ValuePercent';
import CardWrapper from 'components/wrappers/CardWrapper';
import GradientLine from 'components/basic/GradientLine';
import ReturnBackIcon from 'icons/ReturnBack';
import CollateralCompositionBar from 'components/compositionBars/CollateralCompositionBar';
import PageMainHeader from 'components/PageMainHeader';
import messages from './messages';

interface WithdrawScreenWrapperProps {
  currencySymbol: string;
  balanceInProtocol: string;
  balanceInProtocolInUSD: string;
  healthFactor: string;
  loanToValue: string;
  children: ReactNode;
}

export default function WithdrawScreenWrapper({
  currencySymbol,
  balanceInProtocol,
  balanceInProtocolInUSD,
  healthFactor,
  loanToValue,
  children,
}: WithdrawScreenWrapperProps) {
  const intl = useIntl();

  return (
    <div className="WithdrawScreenWrapper">
      <PageMainHeader />
      <div className="WithdrawScreenWrapper__container">
        <ReturnBackIcon />

        <div className="WithdrawScreenWrapper__content">
          <CardWrapper className="WithdrawScreenWrapper__card-container" header={<p>Stats</p>}>
            <Row title={intl.formatMessage(messages.balance)}>
              <Value
                value={Number(balanceInProtocol)}
                subValue={Number(balanceInProtocolInUSD)}
                symbol={currencySymbol}
                subSymbol="USD"
                maximumValueDecimals={4}
                minimumValueDecimals={1}
                maximumSubValueDecimals={2}
                minimumSubValueDecimals={2}
              />
            </Row>

            <GradientLine size={1} />

            <HealthFactor value={healthFactor} />

            <Row title={<MaxLTVHelpModal text={intl.formatMessage(messages.loanToValue)} />}>
              <ValuePercent value={loanToValue} />
            </Row>
          </CardWrapper>

          <div className="WithdrawScreenWrapper__children">{children}</div>

          <CardWrapper className="WithdrawScreenWrapper__card-container" header={<p>Collateral</p>}>
            <CollateralCompositionBar isColumn />
          </CardWrapper>
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .WithdrawScreenWrapper {
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
