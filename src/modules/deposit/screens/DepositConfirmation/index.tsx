import { useIntl } from 'react-intl';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { getReferralCode } from 'libs/referral-handler';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import { LendingPoolContract } from 'libs/aave-protocol-js/LendingPool/LendingPoolContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import NoDataPanel from 'components/NoDataPanel';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import HealthFactor from 'components/HealthFactor';
import DepositCurrencyWrapper from '../../components/DepositCurrencyWrapper';
import { getAssetInfo } from 'helpers/config/assets-config';
import { getAtokenInfo } from 'helpers/get-atoken-info';
import defaultMessages from 'defaultMessages';
import messages from './messages';

function DepositConfirmation({
  currencySymbol,
  poolReserve,
  amount,
  user,
  userReserve,
  walletBalance,
  isAutoDLP,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const { chainId, currentMarketData } = useProtocolDataContext();

  const aTokenData = getAtokenInfo({
    address: poolReserve.aTokenAddress,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
  });
  const assetDetails = getAssetInfo(poolReserve.symbol);

  if (!amount) {
    return null;
  }

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  let blockingError = '';
  if (walletBalance.lt(amount)) {
    blockingError = intl.formatMessage(messages.errorWalletBalanceNotEnough, {
      poolReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
    });
  }

  const amountIntEth = amount.multipliedBy(poolReserve.priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);
  const totalCollateralMarketReferenceCurrencyAfter = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  ).plus(amountIntEth);

  const liquidationThresholdAfter = valueToBigNumber(user.totalCollateralMarketReferenceCurrency)
    .multipliedBy(user.currentLiquidationThreshold)
    .plus(amountIntEth.multipliedBy(poolReserve.reserveLiquidationThreshold))
    .dividedBy(totalCollateralMarketReferenceCurrencyAfter);

  const healthFactorAfterDeposit = calculateHealthFactorFromBalancesBigUnits(
    totalCollateralMarketReferenceCurrencyAfter,
    valueToBigNumber(user.totalBorrowsMarketReferenceCurrency),
    liquidationThresholdAfter
  );

  const handleGetTransactions = async () => {
    if (isAutoDLP) {
      const lendingPoolContract = new LendingPoolContract(getProvider(chainId), {
        LENDING_POOL: currentMarketData.addresses.lendingPool,
        REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
        SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
        WETH_GATEWAY: currentMarketData.addresses.wethGateway,
      });
      return lendingPoolContract.depositWithAutoDLP(
        user.id,
        poolReserve.underlyingAsset,
        amount.toString(),
        currentMarketData.addresses.wrappedBaseDebtToken,
        currentMarketData.addresses.leverager,
        user.id,
        getReferralCode()
      );
    } else {
      return lendingPool.deposit({
        user: user.id,
        reserve: poolReserve.underlyingAsset,
        amount: amount.toString(),
        referralCode: getReferralCode(),
      });
    }
  };

  const notShowHealthFactor =
    user.totalBorrowsMarketReferenceCurrency !== '0' && poolReserve.usageAsCollateralEnabled;

  const usageAsCollateralEnabledOnDeposit =
    poolReserve.usageAsCollateralEnabled &&
    (!userReserve?.underlyingBalance ||
      userReserve.underlyingBalance === '0' ||
      userReserve.usageAsCollateralEnabledOnUser);

  return (
    <DepositCurrencyWrapper
      currencySymbol={currencySymbol}
      walletBalance={walletBalance}
      poolReserve={poolReserve}
      user={user}
      userReserve={userReserve}
    >
      <PoolTxConfirmationView
        mainTxName={intl.formatMessage(defaultMessages.deposit)}
        caption={intl.formatMessage(messages.caption)}
        boxTitle={intl.formatMessage(defaultMessages.deposit)}
        boxDescription={intl.formatMessage(messages.boxDescription)}
        approveDescription={intl.formatMessage(messages.approveDescription)}
        getTransactionsData={handleGetTransactions}
        blockingError={blockingError}
        aTokenData={aTokenData}
      >
        <Row title={intl.formatMessage(messages.valueRowTitle)} withMargin={notShowHealthFactor}>
          <Value
            symbol={currencySymbol}
            value={amount.toString()}
            tokenIcon={true}
            subValue={amountInUsd.toString()}
            subSymbol="USD"
            tooltipId={currencySymbol}
          />
        </Row>

        <Row title={intl.formatMessage(messages.collateral)} withMargin={notShowHealthFactor}>
          <strong
            style={{
              color: usageAsCollateralEnabledOnDeposit
                ? currentTheme.darkGreen.hex
                : currentTheme.red.hex,
            }}
            className="Collateral__text"
          >
            {usageAsCollateralEnabledOnDeposit
              ? intl.formatMessage(messages.yes)
              : intl.formatMessage(messages.no)}
          </strong>
        </Row>

        {notShowHealthFactor && (
          <HealthFactor
            title={intl.formatMessage(messages.newHealthFactor)}
            withoutModal={true}
            value={healthFactorAfterDeposit.toString()}
          />
        )}
      </PoolTxConfirmationView>
    </DepositCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withAmount: true,
  withWalletBalance: true,
})(DepositConfirmation);
