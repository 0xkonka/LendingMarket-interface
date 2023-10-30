import { useMemo } from 'react';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import {
  calculateHealthFactorFromBalancesBigUnits,
  InterestRate,
  valueToBigNumber,
} from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useTxBuilderContext } from 'libs/tx-provider';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { StargateBorrowContract } from 'libs/aave-protocol-js/StargateBorrow/StargateBorrowContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { getReferralCode } from 'libs/referral-handler';
import Row from 'components/basic/Row';
import NoDataPanel from 'components/NoDataPanel';
import ErrorPage from 'components/ErrorPage';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import Value from 'components/basic/Value';
import ValuePercent from 'components/basic/ValuePercent';
import HealthFactor from 'components/HealthFactor';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import BorrowCurrencyWrapper from '../../components/BorrowCurrencyWrapper';
import { getAtokenInfo } from 'helpers/get-atoken-info';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { CHAIN_INFO, CHAIN_ID_TO_NETWORK } from 'ui-config/chains';

function BorrowConfirmation({
  currencySymbol,
  user,
  amount,
  chainId: destChainId,
  poolReserve,
  userReserve,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();

  const aTokenData = getAtokenInfo({
    address: poolReserve.underlyingAsset,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
    withFormattedSymbol: true,
  });

  const query = queryString.parse(location.search);
  const interestRateMode =
    typeof query.rateMode === 'string'
      ? InterestRate[query.rateMode as InterestRate]
      : InterestRate.Variable;

  const currentStableBorrowRate =
    userReserve && userReserve.stableBorrows !== '0' && poolReserve.stableBorrowAPY;
  const newBorrowRate =
    interestRateMode === InterestRate.Variable
      ? poolReserve.variableBorrowAPY
      : poolReserve.stableBorrowAPY;

  const userAvailableAmountToBorrow = useMemo(() => {
    if (!user) return valueToBigNumber('0');
    const usdAmount = valueToBigNumber(user.availableBorrowsMarketReferenceCurrency).div(
      poolReserve.priceInMarketReferenceCurrency
    );

    if (
      usdAmount.gt(0) &&
      user.totalBorrowsMarketReferenceCurrency !== '0' &&
      usdAmount.lt(valueToBigNumber(poolReserve.availableLiquidity).multipliedBy('1.01'))
    ) {
      return usdAmount.multipliedBy('0.995');
    }
    return usdAmount;
  }, [poolReserve.availableLiquidity, poolReserve.priceInMarketReferenceCurrency, user]);

  const blockingError = useMemo(() => {
    if (interestRateMode === InterestRate.Stable && !poolReserve.stableBorrowRateEnabled) {
      return intl.formatMessage(messages.errorStableRateNotEnabled);
    }
    if (amount && amount.gt(poolReserve.availableLiquidity)) {
      return intl.formatMessage(messages.errorNotEnoughLiquidity, {
        currencySymbol,
      });
    }
    if (amount && userAvailableAmountToBorrow.lt(amount)) {
      return intl.formatMessage(messages.errorNotEnoughCollateral);
    }
    if (!poolReserve.borrowingEnabled) {
      return intl.formatMessage(messages.errorBorrowingNotAvailable);
    }
    return undefined;
  }, [
    interestRateMode,
    poolReserve.stableBorrowRateEnabled,
    poolReserve.availableLiquidity,
    poolReserve.borrowingEnabled,
    amount,
    userAvailableAmountToBorrow,
    intl,
    currencySymbol,
  ]);

  const amountToBorrowInUsd = useMemo(
    () =>
      amount
        ? amount
            .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
            .multipliedBy(marketRefPriceInUsd)
        : valueToBigNumber('0'),
    [amount, marketRefPriceInUsd, poolReserve.priceInMarketReferenceCurrency]
  );

  const newHealthFactor = useMemo(
    () =>
      user
        ? calculateHealthFactorFromBalancesBigUnits(
            user.totalCollateralUSD,
            valueToBigNumber(user.totalBorrowsUSD).plus(amountToBorrowInUsd),
            user.currentLiquidationThreshold
          )
        : valueToBigNumber('0'),
    [amountToBorrowInUsd, user]
  );

  const handleGetTransactions = async () => {
    if (!user) throw new Error('User missing');
    if (!amount) throw new Error('Amount missing');
    const destNetwork = CHAIN_ID_TO_NETWORK[chainId];
    if (destChainId !== destNetwork.chainId) {
      // x-chain borrow logic by steve
      const stargateBorrowContract = new StargateBorrowContract(
        getProvider(chainId),
        currentMarketData.addresses.stargateBorrow
      );

      const quoteData = await stargateBorrowContract.quoteLayerZeroSwapFee(
        destChainId || CHAIN_INFO.arbitrum.chainId,
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
        destChainId || CHAIN_INFO.arbitrum.chainId,
        borrowValue
      );
    }

    // previous borrow logic
    const referralCode = getReferralCode() || undefined;
    return await lendingPool.borrow({
      interestRateMode,
      referralCode,
      user: user.id,
      amount: amount.toString(),
      reserve: poolReserve.underlyingAsset,
      debtTokenAddress:
        interestRateMode === InterestRate.Variable
          ? poolReserve.variableDebtTokenAddress
          : poolReserve.stableDebtTokenAddress,
    });
  };

  const handleMainTxExecuted = () => {};

  const selectedDestChain = CHAIN_ID_TO_NETWORK[destChainId || CHAIN_INFO.arbitrum.chainId];

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  if (!interestRateMode || !amount) {
    return (
      <ErrorPage
        description={intl.formatMessage(messages.errorPageDescription)}
        buttonType="back"
      />
    );
  }

  return (
    <BorrowCurrencyWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      user={user}
      userReserve={userReserve}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(defaultMessages.borrow)}
        caption={intl.formatMessage(messages.caption)}
        boxTitle={intl.formatMessage(defaultMessages.borrow)}
        boxDescription={intl.formatMessage(messages.boxDescription)}
        approveDescription={intl.formatMessage(messages.approveDescription)}
        getTransactionsData={handleGetTransactions}
        onMainTxExecuted={handleMainTxExecuted}
        blockingError={blockingError}
        goToAfterSuccess="/dashboard/borrowings"
        className="BorrowConfirmation"
        aTokenData={aTokenData}
      >
        <Row title={intl.formatMessage(messages.valueRowTitle)} withMargin={true}>
          <Value
            symbol={currencySymbol}
            value={amount.toString()}
            tokenIcon={true}
            subValue={amountToBorrowInUsd.toString()}
            subSymbol="USD"
            tooltipId={currencySymbol}
          />
        </Row>

        {currentStableBorrowRate && (
          <Row
            title={intl.formatMessage(messages.currentBorrowRateTitle, {
              borrowRateMode: intl.formatMessage(messages.stable).toLowerCase(),
            })}
            withMargin={true}
          >
            <ValuePercent value={currentStableBorrowRate} color="dark" />
          </Row>
        )}

        <Row title={intl.formatMessage(messages.destChainIdTitle)} withMargin={true}>
          {selectedDestChain?.name || ''}
        </Row>

        <Row title={intl.formatMessage(messages.APYRowTitle)} withMargin={true}>
          <ValuePercent value={newBorrowRate} color="dark" />
        </Row>

        <Row title={intl.formatMessage(messages.rateTypeRowTitle)} withMargin={true}>
          <strong className="BorrowRateMode">
            {interestRateMode === InterestRate.Variable
              ? intl.formatMessage(messages.variable)
              : intl.formatMessage(messages.stable)}
          </strong>
        </Row>

        <HealthFactor
          value={newHealthFactor.toString()}
          title={intl.formatMessage(messages.healthFactorRowTitle)}
          withoutModal={true}
        />

        <style jsx={true} global={true}>{`
          .BorrowRateMode {
            color: ${currentTheme.textDarkBlue.hex};
          }
        `}</style>
      </PoolTxConfirmationView>
    </BorrowCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
  withChainId: true,
})(BorrowConfirmation);
