import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber, InterestRate } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import {
  ComputedReserveData,
  UserSummary,
  useStaticPoolDataContext,
} from 'libs/pool-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import BasicForm from 'components/forms/BasicForm';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { useState } from 'react';
import { getAssetInfo } from 'aave-ui-kit';
import BorrowComposition from 'components/Asset/BorrowComposition';
import { Action } from 'components/basic/RiskBar';

interface AssetRepayActionProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  currencySymbol: string;
  walletBalance: BigNumber;
}

function AssetRepayAction({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
}: AssetRepayActionProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();
  const { networkConfig } = useStaticPoolDataContext();

  const [amount, setAmount] = useState('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  if (!user || !userReserve) {
    return null;
  }

  const assetDetails = getAssetInfo(poolReserve.symbol);
  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const walletBalanceValue = parseFloat(walletBalance.toString());
  const maxAmountToRepay = totalBorrows < walletBalanceValue ? totalBorrows : walletBalanceValue;
  const safeAmountToRepayAll = valueToBigNumber(maxAmountToRepay).multipliedBy('1.0025');

  let amountToRepay = amount.toString();
  let amountToRepayUI = valueToBigNumber(amount);
  if (amountToRepay === '-1') {
    amountToRepayUI = BigNumber.min(walletBalance, safeAmountToRepayAll);
    if (
      userReserve.reserve.symbol.toUpperCase() === networkConfig.baseAsset ||
      walletBalance.eq(amountToRepayUI)
    ) {
      amountToRepay = BigNumber.min(walletBalance, safeAmountToRepayAll).toString();
    }
  }

  const handleGetTransactions = async () =>
    await lendingPool.repay({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amountToRepay.toString(),
      interestRateMode: InterestRate.Variable,
    });

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.repay({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amountToRepay.toString(),
      interestRateMode: InterestRate.Variable,
    });
  };

  const handleMainTxExecuted = () => setIsConfirm(false);

  const blockingError =
    walletBalance.eq('0') || walletBalance.lt(amount)
      ? intl.formatMessage(messages.error, {
          userReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
        })
      : '';

  const warningMessage =
    valueToBigNumber(amount).eq('-1') &&
    amountToRepayUI.gte(maxAmountToRepay) &&
    !amountToRepayUI.gte(safeAmountToRepayAll)
      ? intl.formatMessage(messages.warningMessage)
      : '';

  const handleRepaySubmit = (amount: string, max?: boolean) => {
    setAmount(max ? '-1' : amount);
    setIsConfirm(true);
  };

  return (
    <div className="AssetRepayAction">
      {!isConfirm ? (
        <BasicForm
          title={intl.formatMessage(defaultMessages.repay)}
          description={intl.formatMessage(messages.formDescription)}
          maxAmount={maxAmountToRepay.toString(10)}
          action={Action.REPAY}
          amountFieldTitle={intl.formatMessage(messages.amountTitle)}
          currencySymbol={currencySymbol}
          onSubmit={handleRepaySubmit}
          absoluteMaximum={true}
          withRiskBar={true}
          maxDecimals={poolReserve.decimals}
          getTransactionData={handleTransactionData}
          className="AssetRepayAction__repay-form"
        />
      ) : (
        <PoolTxConfirmationView
          mainTxName={intl.formatMessage(defaultMessages.repay)}
          caption={intl.formatMessage(messages.caption)}
          boxTitle={intl.formatMessage(defaultMessages.repay)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          approveDescription={intl.formatMessage(messages.approveDescription)}
          getTransactionsData={handleGetTransactions}
          onMainTxExecuted={handleMainTxExecuted}
          blockingError={blockingError}
          warningMessage={warningMessage}
          goBack={() => setIsConfirm(false)}
        />
      )}

      <BorrowComposition />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetRepayAction {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          width: 100%;

          @include respond-to(sm) {
            grid-template-columns: 1fr;
          }

          &__container {
            width: 100%;
          }

          &__repay-form {
            max-width: unset !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AssetRepayAction;
