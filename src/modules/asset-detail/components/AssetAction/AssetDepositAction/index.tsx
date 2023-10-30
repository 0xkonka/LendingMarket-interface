import { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';
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
import { getAssetInfo } from 'aave-ui-kit';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';
import GradientLine from 'components/basic/GradientLine';
import { getAtokenInfo } from 'helpers/get-atoken-info';
import { getReferralCode } from 'libs/referral-handler';
import { Action } from 'components/basic/RiskBar';

interface AssetDepositActionProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  currencySymbol: string;
  walletBalance: BigNumber;
}

function AssetDepositAction({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
}: AssetDepositActionProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();
  const { networkConfig } = useStaticPoolDataContext();

  const [amount, setAmount] = useState('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  if (!user || !userReserve) {
    return null;
  }

  const aTokenData = getAtokenInfo({
    address: poolReserve.aTokenAddress,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
  });

  const assetDetails = getAssetInfo(poolReserve.symbol);

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    maxAmountToDeposit = maxAmountToDeposit.minus('0.001');
  }
  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }

  let blockingError = '';
  if (walletBalance.lt(valueToBigNumber(amount))) {
    blockingError = intl.formatMessage(messages.errorWalletBalanceNotEnough, {
      poolReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
    });
  }

  const handleGetTransactions = async () => {
    return lendingPool.deposit({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amount.toString(),
      referralCode: getReferralCode(),
    });
  };

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.deposit({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: maxAmountToDeposit.toString(10),
      referralCode: undefined,
    });
  };

  const handleMainTxExecuted = () => setIsConfirm(false);

  const handleSubmit = (amount: string, max?: boolean) => {
    setAmount(max ? '-1' : amount);
    setIsConfirm(true);
  };

  return (
    <div className="AssetDepositAction">
      <div className="AssetDepositAction__container">
        {!isConfirm ? (
          <BasicForm
            title={intl.formatMessage(messages.title)}
            description={intl.formatMessage(messages.description)}
            amountFieldTitle={intl.formatMessage(messages.amountTitle)}
            maxAmount={maxAmountToDeposit.toString(10)}
            action={Action.DEPOSIT}
            currencySymbol={currencySymbol}
            onSubmit={handleSubmit}
            maxDecimals={poolReserve.decimals}
            getTransactionData={handleTransactionData}
            withRiskBar={Number(maxAmountToDeposit) > 0 && user.totalBorrowsUSD !== '0'}
            setFormAmount={setAmount}
            className="AssetDepositAction__form"
          />
        ) : (
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(defaultMessages.deposit)}
            caption={intl.formatMessage(messages.caption)}
            boxTitle={intl.formatMessage(defaultMessages.deposit)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            approveDescription={intl.formatMessage(messages.approveDescription)}
            getTransactionsData={handleGetTransactions}
            onMainTxConfirmed={handleMainTxExecuted}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={blockingError}
            aTokenData={aTokenData}
            goBack={() => setIsConfirm(false)}
          />
        )}
      </div>

      <GradientLine size={1} direction="vertical" />

      <div className="AssetDepositAction__container">
        <Borrow1ClickLoopForm
          currencySymbol={currencySymbol}
          user={user}
          poolReserve={poolReserve}
          isDisableTokenSelect
          className="AssetDepositAction__form"
        />
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetDepositAction {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 40px;

          @include respond-to(sm) {
            flex-direction: column;
            align-items: center;
          }

          &__container {
            width: 100%;
          }

          &__form {
            max-width: unset !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AssetDepositAction;
