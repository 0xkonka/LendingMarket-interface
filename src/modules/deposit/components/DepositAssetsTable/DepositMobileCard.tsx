import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from 'components/wrappers/MobileCardWrapper';
import Row from 'components/basic/Row';
import NoData from 'components/basic/NoData';
import Value from 'components/basic/Value';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import { DepositTableItem } from './types';
import messages from './messages';

export default function DepositMobileCard({
  id,
  symbol,
  underlyingAsset,
  walletBalance,
  walletBalanceInUSD,
  liquidityRate,
  avg30DaysLiquidityRate,
  rdntRewardsDepositApr,
  grossDepositApr,
  userId,
  borrowingEnabled,
  isFreezed,
}: DepositTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/deposit/${underlyingAsset}-${id}`;

  return (
    <MobileCardWrapper
      onClick={() => history.push(url)}
      symbol={symbol}
      withGoToTop={true}
      disabled={isFreezed}
    >
      <Row title={intl.formatMessage(messages.yourWalletBalance)} withMargin={true}>
        {!userId || Number(walletBalance) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(walletBalance)}
            subValue={walletBalanceInUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={2}
            minimumValueDecimals={2}
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APY)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={liquidityRate}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={rdntRewardsDepositApr}
              grossValue={grossDepositApr}
              type="deposit"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}
    </MobileCardWrapper>
  );
}
