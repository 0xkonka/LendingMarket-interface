import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Row from 'components/basic/Row';
import NoData from 'components/basic/NoData';
import Value from 'components/basic/Value';
import MobileCardWrapper from 'components/wrappers/MobileCardWrapper';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import messages from './messages';
import { BorrowTableItem } from './types';

export default function BorrowMobileCard({
  id,
  symbol,
  underlyingAsset,
  availableBorrows,
  availableBorrowsInUSD,
  variableBorrowRate,
  avg30DaysVariableRate,
  rdntRewardsBorrowApr,
  grossBorrowApr,
  userId,
  isFreezed,
}: BorrowTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/borrow/${underlyingAsset}-${id}`;

  return (
    <MobileCardWrapper
      onClick={() => history.push(url)}
      symbol={symbol}
      withGoToTop={true}
      disabled={isFreezed}
    >
      <Row title={intl.formatMessage(messages.availableToBorrow)} withMargin={true}>
        {!userId || Number(availableBorrows) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(availableBorrows)}
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            minimumValueDecimals={2}
            maximumValueDecimals={2}
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.variableAPY)} withMargin={true}>
          <LiquidityMiningCard
            symbol={symbol}
            value={variableBorrowRate}
            thirtyDaysValue={avg30DaysVariableRate}
            liquidityMiningValue={rdntRewardsBorrowApr}
            grossValue={grossBorrowApr}
            type="borrow-variable"
          />
        </Row>
      )}
    </MobileCardWrapper>
  );
}
