import { useIntl } from 'react-intl';
import {
  valueToBigNumber,
  BigNumber,
  calculateHealthFactorFromBalancesBigUnits,
} from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import BasicForm from 'components/forms/BasicForm';
import DepositComposition from 'components/Asset/DepositComposition';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import { getAtokenInfo } from 'helpers/get-atoken-info';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { useState } from 'react';
import { Action } from 'components/basic/RiskBar';

interface AssetWithdrawActionProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  currencySymbol: string;
  walletBalance: BigNumber;
}

function AssetWithdrawAction({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
}: AssetWithdrawActionProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();

  const [amount, setAmount] = useState('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const aTokenData = getAtokenInfo({
    address: poolReserve.underlyingAsset,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
    withFormattedSymbol: true,
  });

  if (!user || !userReserve) {
    return null;
  }

  const underlyingBalance = valueToBigNumber(userReserve.underlyingBalance);
  const availableLiquidity = valueToBigNumber(poolReserve.availableLiquidity);
  let maxAmountToWithdraw = BigNumber.min(underlyingBalance, availableLiquidity);
  let maxCollateralToWithdrawInETH = valueToBigNumber('0');

  if (
    userReserve.usageAsCollateralEnabledOnUser &&
    poolReserve.usageAsCollateralEnabled &&
    user.totalBorrowsMarketReferenceCurrency !== '0'
  ) {
    const excessHF = valueToBigNumber(user.healthFactor).minus('1');
    if (excessHF.gt('0')) {
      maxCollateralToWithdrawInETH = excessHF
        .multipliedBy(user.totalBorrowsMarketReferenceCurrency)
        // because of the rounding issue on the contracts side this value still can be incorrect
        .div(Number(poolReserve.reserveLiquidationThreshold) + 0.01)
        .multipliedBy('0.99');
    }
    maxAmountToWithdraw = BigNumber.min(
      maxAmountToWithdraw,
      maxCollateralToWithdrawInETH.dividedBy(poolReserve.priceInMarketReferenceCurrency)
    );
  }

  let amountToWithdraw = valueToBigNumber(amount);
  let displayAmountToWithdraw = valueToBigNumber(amount);

  if (amountToWithdraw.eq('-1')) {
    if (user.totalBorrowsMarketReferenceCurrency !== '0') {
      if (!maxAmountToWithdraw.eq(underlyingBalance)) {
        amountToWithdraw = maxAmountToWithdraw;
      }
    }
    displayAmountToWithdraw = maxAmountToWithdraw;
  }

  let blockingError = '';
  let totalCollateralInETHAfterWithdraw = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  );
  let liquidationThresholdAfterWithdraw = user.currentLiquidationThreshold;
  let healthFactorAfterWithdraw = valueToBigNumber(user.healthFactor);

  if (userReserve.usageAsCollateralEnabledOnUser && poolReserve.usageAsCollateralEnabled) {
    const amountToWithdrawInEth = displayAmountToWithdraw.multipliedBy(
      poolReserve.priceInMarketReferenceCurrency
    );
    totalCollateralInETHAfterWithdraw =
      totalCollateralInETHAfterWithdraw.minus(amountToWithdrawInEth);

    liquidationThresholdAfterWithdraw = valueToBigNumber(
      user.totalCollateralMarketReferenceCurrency
    )
      .multipliedBy(user.currentLiquidationThreshold)
      .minus(
        valueToBigNumber(amountToWithdrawInEth).multipliedBy(
          poolReserve.reserveLiquidationThreshold
        )
      )
      .div(totalCollateralInETHAfterWithdraw)
      .toFixed(4, BigNumber.ROUND_DOWN);

    healthFactorAfterWithdraw = calculateHealthFactorFromBalancesBigUnits(
      totalCollateralInETHAfterWithdraw,
      user.totalBorrowsMarketReferenceCurrency,
      liquidationThresholdAfterWithdraw
    );

    if (healthFactorAfterWithdraw.lt('1') && user.totalBorrowsMarketReferenceCurrency !== '0') {
      blockingError = intl.formatMessage(messages.errorCanNotWithdrawThisAmount);
    }
  }

  if (
    !blockingError &&
    (underlyingBalance.eq('0') || underlyingBalance.lt(displayAmountToWithdraw))
  ) {
    blockingError = intl.formatMessage(messages.errorYouDoNotHaveEnoughFundsToWithdrawThisAmount);
  }
  if (
    !blockingError &&
    (availableLiquidity.eq('0') || displayAmountToWithdraw.gt(poolReserve.availableLiquidity))
  ) {
    blockingError = intl.formatMessage(messages.errorPoolDoNotHaveEnoughFundsToWithdrawThisAmount);
  }

  const handleWithdrawSubmit = (amount: string, max?: boolean) => {
    setAmount(max && currencySymbol !== 'BNB' && currencySymbol !== 'ETH' ? '-1' : amount);
    setIsConfirm(true);
  };

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.withdraw({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: '-1',
      aTokenAddress: poolReserve.aTokenAddress,
    });
  };

  const handleGetTransactions = async () => {
    return await lendingPool.withdraw({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amountToWithdraw.toString(),
      aTokenAddress: poolReserve.aTokenAddress,
    });
  };

  console.log('amount to Withdraw: ', amountToWithdraw.toString());
  const handleMainTxExecuted = () => setIsConfirm(false);

  const isHealthFactorDangerous =
    user.totalBorrowsMarketReferenceCurrency !== '0' &&
    healthFactorAfterWithdraw.toNumber() <= 1.05;

  return (
    <div className="AssetWithdrawAction">
      <div className="AssetWithdrawAction__container">
        {!isConfirm ? (
          <BasicForm
            title={intl.formatMessage(defaultMessages.withdraw)}
            description={intl.formatMessage(messages.formDescription)}
            maxAmount={maxAmountToWithdraw.toString()}
            action={Action.WITHDRAW}
            currencySymbol={currencySymbol}
            onSubmit={handleWithdrawSubmit}
            amountFieldTitle={intl.formatMessage(messages.amountTitle)}
            absoluteMaximum={true}
            withRiskBar={Number(maxAmountToWithdraw) > 0 && user.totalBorrowsUSD !== '0'}
            maxDecimals={poolReserve.decimals}
            getTransactionData={handleTransactionData}
            className="AssetWithdrawAction__withdraw-form"
          />
        ) : (
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(defaultMessages.withdraw)}
            caption={intl.formatMessage(messages.caption)}
            boxTitle={intl.formatMessage(defaultMessages.withdraw)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            approveDescription={intl.formatMessage(messages.approveDescription)}
            getTransactionsData={handleGetTransactions}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={blockingError}
            dangerousMessage={
              isHealthFactorDangerous
                ? intl.formatMessage(messages.healthFactorDangerousText, {
                    liquidation: <span>{intl.formatMessage(messages.liquidation)}</span>,
                  })
                : ''
            }
            aTokenData={aTokenData}
            goBack={() => setIsConfirm(false)}
          />
        )}
      </div>

      <DepositComposition />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetWithdrawAction {
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

          &__withdraw-form {
            max-width: unset !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AssetWithdrawAction;
