import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { BigNumber, InterestRate } from '@aave/protocol-js';

import { useTxBuilderContext } from 'libs/tx-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import BasicForm from 'components/forms/BasicForm';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import InfoWrapper from 'components/wrappers/InfoWrapper';
import RepayInfoPanel from '../../components/RepayInfoPanel';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { Action } from 'components/basic/RiskBar';

function RepayAmount({
  currencySymbol,
  userReserve,
  poolReserve,
  walletBalance,
  history,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const query = queryString.parse(location.search);
  const debtType = query.debtType || InterestRate.Variable;

  if (!userReserve) {
    throw new Error(intl.formatMessage(messages.error));
  }

  const normalizedWalletBalance = walletBalance.minus(
    userReserve.reserve.symbol.toUpperCase() === networkConfig.baseAsset ? '0.004' : '0'
  );

  const maxAmountToRepay = BigNumber.min(
    normalizedWalletBalance,
    debtType === InterestRate.Stable ? userReserve.stableBorrows : userReserve.variableBorrows
  );

  const handleSubmit = (amount: string, max?: boolean) => {
    const query = queryString.stringify({ debtType, amount: max ? '-1' : amount });
    history.push(`${history.location.pathname}confirmation?${query}`);
  };

  const handleGetTransactions = (userId: string) => async () =>
    await lendingPool.repay({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: '-1',
      interestRateMode: debtType as InterestRate,
    });
  return (
    <>
      <BasicForm
        title={intl.formatMessage(defaultMessages.repay)}
        description={intl.formatMessage(messages.formDescription)}
        maxAmount={maxAmountToRepay.toString(10)}
        action={Action.REPAY}
        amountFieldTitle={intl.formatMessage(messages.amountTitle)}
        currencySymbol={currencySymbol}
        onSubmit={handleSubmit}
        absoluteMaximum={true}
        maxDecimals={poolReserve.decimals}
        getTransactionData={handleGetTransactions}
      />

      <InfoWrapper>
        <RepayInfoPanel />
      </InfoWrapper>
    </>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
  withUserReserve: true,
})(RepayAmount);
