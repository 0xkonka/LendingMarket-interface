import { useIntl } from 'react-intl';

import MobileCardWrapper from 'components/wrappers/MobileCardWrapper';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import NoData from 'components/basic/NoData';
import ContainedButton from 'components/basic/ContainedButton';
import OutlineButton from 'components/basic/OutlineButton';
import AMPLWarning from 'components/AMPLWarning';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { BorrowTableItem } from './types';

export default function BorrowMobileCard({
  reserve: { symbol },
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  avg30DaysVariableRate,
  rdntRewardsBorrowApr,
  grossBorrowApr,
  isActive,
  isFrozen,
  borrowingEnabled,
  repayLink,
  borrowLink,
}: BorrowTableItem) {
  const intl = useIntl();

  return (
    <>
      <MobileCardWrapper symbol={symbol} className="BorrowMobileCard">
        <Row title={intl.formatMessage(messages.secondTableColumnTitle)} withMargin={true}>
          <Value
            value={Number(currentBorrows)}
            subValue={Number(currentBorrowsUSD)}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            maximumValueDecimals={2}
            minimumValueDecimals={2}
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={Number(borrowRate)}
              thirtyDaysValue={avg30DaysVariableRate}
              liquidityMiningValue={rdntRewardsBorrowApr}
              grossValue={grossBorrowApr}
              type={'borrow-variable'}
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>

        <Row
          title={intl.formatMessage(messages.borrowMore)}
          className="Row__center"
          withMargin={true}
        >
          <ContainedButton
            href={borrowLink}
            disabled={!isActive || !borrowingEnabled || isFrozen}
            size="small"
            className="BorrowMobileCard__button"
          >
            {intl.formatMessage(defaultMessages.borrow)}
          </ContainedButton>
        </Row>

        <Row title={intl.formatMessage(messages.repayYourBorrow)} className="Row__center">
          <OutlineButton
            href={repayLink}
            disabled={!isActive}
            size="small"
            className="BorrowMobileCard__button"
            color="third"
          >
            {intl.formatMessage(defaultMessages.repay)}
          </OutlineButton>
        </Row>
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';
        .BorrowMobileCard {
          &__button {
            width: 100px;
            min-height: 24px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
