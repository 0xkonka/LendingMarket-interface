import { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber, InterestRate } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import { CHAIN_INFO, CHAIN_ID_TO_NETWORK } from 'ui-config/chains';
import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import { getReferralCode } from 'libs/referral-handler';
import { StargateBorrowContract } from 'libs/aave-protocol-js/StargateBorrow/StargateBorrowContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';
import GradientLine from 'components/basic/GradientLine';
import BorrowForm from 'components/forms/BorrowForm';
import { getAtokenInfo } from 'helpers/get-atoken-info';
import { getProvider } from 'helpers/config/markets-and-network-config';
import defaultMessages from 'defaultMessages';
import messages from './messages';

interface AssetBorrowActionProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  currencySymbol: string;
  walletBalance: BigNumber;
}

function AssetBorrowAction({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
}: AssetBorrowActionProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();
  const { chainId, currentMarketData } = useProtocolDataContext();

  const defaultNetwork = CHAIN_ID_TO_NETWORK[chainId] as any;
  const [amount, setAmount] = useState('');
  const [selectChainId, setSelectChainId] = useState(
    defaultNetwork?.chainId || CHAIN_INFO.arbitrum.chainId
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  if (!user || !userReserve) {
    return null;
  }

  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve.priceInMarketReferenceCurrency);
  let maxAmountToBorrow = BigNumber.max(
    BigNumber.min(poolReserve.availableLiquidity, maxUserAmountToBorrow),
    0
  );
  if (
    maxAmountToBorrow.gt(0) &&
    user?.totalBorrowsMarketReferenceCurrency !== '0' &&
    maxUserAmountToBorrow.lt(valueToBigNumber(poolReserve.availableLiquidity).multipliedBy('1.01'))
  ) {
    maxAmountToBorrow = maxAmountToBorrow.multipliedBy('0.99');
  }
  const formattedMaxAmountToBorrow = maxAmountToBorrow.toString(10);

  const aTokenData = getAtokenInfo({
    address: poolReserve.aTokenAddress,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
  });

  const handleGetTransactions = async () => {
    const destNetwork = CHAIN_ID_TO_NETWORK[chainId] as any;
    if (selectChainId !== destNetwork.chainId) {
      // x-chain borrow logic by steve
      const stargateBorrowContract = new StargateBorrowContract(
        getProvider(chainId),
        currentMarketData.addresses.stargateBorrow
      );

      const quoteData = await stargateBorrowContract.quoteLayerZeroSwapFee(
        selectChainId || CHAIN_INFO.arbitrum.chainId,
        user.id
      );
      const borrowValue = quoteData[0].toString();
      const assetAddress = poolReserve.underlyingAsset;
      const debtTokenAddress = poolReserve.variableDebtTokenAddress;

      return await stargateBorrowContract.borrow(
        user.id,
        assetAddress,
        debtTokenAddress,
        amount.toString(),
        selectChainId || CHAIN_INFO.arbitrum.chainId,
        borrowValue
      );
    }

    // previous borrow logic
    const referralCode = getReferralCode() || undefined;
    return await lendingPool.borrow({
      interestRateMode: InterestRate.Variable,
      referralCode,
      user: user.id,
      amount: amount.toString(),
      reserve: poolReserve.underlyingAsset,
      debtTokenAddress: poolReserve.variableDebtTokenAddress,
    });
  };

  const handleTransactionData = (userId: string) => async () => {
    const referralCode = undefined;
    return await lendingPool.borrow({
      interestRateMode: InterestRate.Variable,
      referralCode,
      user: userId,
      amount: formattedMaxAmountToBorrow,
      reserve: poolReserve.underlyingAsset,
      debtTokenAddress: poolReserve.variableDebtTokenAddress,
    });
  };

  const handleMainTxExecuted = () => {
    setIsConfirm(false);
  };

  const handleMainTxConfirmed = () => setIsConfirm(false);

  const handleSetAmountSubmit = (amount: string, chainId: number) => {
    setAmount(amount);
    setSelectChainId(chainId);
    setIsConfirm(true);
  };

  return (
    <div className="AssetBorrowAction">
      <div className="AssetBorrowAction__container">
        {!isConfirm ? (
          <BorrowForm
            title={intl.formatMessage(messages.title)}
            description={intl.formatMessage(messages.description)}
            maxAmount={formattedMaxAmountToBorrow}
            currencySymbol={currencySymbol}
            onSubmit={handleSetAmountSubmit}
            amountFieldTitle={intl.formatMessage(messages.amountTitle)}
            withRiskBar={Number(formattedMaxAmountToBorrow) > 0}
            maxDecimals={poolReserve.decimals}
            getTransactionData={handleTransactionData}
            className="AssetBorrowAction__form"
          />
        ) : (
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(defaultMessages.borrow)}
            caption={intl.formatMessage(messages.caption)}
            boxTitle={intl.formatMessage(defaultMessages.borrow)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            approveDescription={intl.formatMessage(messages.approveDescription)}
            getTransactionsData={handleGetTransactions}
            onMainTxConfirmed={handleMainTxConfirmed}
            onMainTxExecuted={handleMainTxExecuted}
            className="AssetBorrowAction__form"
            aTokenData={aTokenData}
            goBack={() => setIsConfirm(false)}
          />
        )}
      </div>

      <GradientLine size={1} direction="vertical" />

      <div className="AssetBorrowAction__container">
        <Borrow1ClickLoopForm
          currencySymbol={currencySymbol}
          user={user}
          poolReserve={poolReserve}
          isDisableTokenSelect
          className="AssetBorrowAction__form"
        />
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetBorrowAction {
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

export default AssetBorrowAction;
