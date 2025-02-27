import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { valueToBigNumber, BigNumber, InterestRate } from '@aave/protocol-js';

import { useTxBuilderContext } from 'libs/tx-provider';
import { BorrowRateMode } from 'libs/pool-data-provider/graphql';
import NoDataPanel from 'components/NoDataPanel';
import InfoWrapper from 'components/wrappers/InfoWrapper';
import AMPLWarning from 'components/AMPLWarning';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import BorrowForm from 'components/forms/BorrowForm';
import BorrowCurrencyWrapper from '../../components/BorrowCurrencyWrapper';
import { getAssetInfo } from 'helpers/config/assets-config';
import messages from './messages';

interface BorrowAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol' | 'history'
  > {}

function BorrowAmount({
  userReserve,
  poolReserve,
  user,
  currencySymbol,
  history,
}: BorrowAmountProps) {
  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();

  const asset = getAssetInfo(currencySymbol);

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

  const handleSetAmountSubmit = (amount: string, chainId: number) => {
    const query = queryString.stringify({
      rateMode: BorrowRateMode.Variable,
      amount,
      chainId,
    });
    history.push(`${history.location.pathname}/confirmation?${query}`);
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

  return (
    <BorrowCurrencyWrapper
      poolReserve={poolReserve}
      currencySymbol={currencySymbol}
      userReserve={userReserve}
      user={user}
    >
      {formattedMaxAmountToBorrow !== '0' ? (
        <>
          <BorrowForm
            title={intl.formatMessage(messages.title)}
            description={intl.formatMessage(messages.description)}
            maxAmount={formattedMaxAmountToBorrow}
            currencySymbol={currencySymbol}
            onSubmit={handleSetAmountSubmit}
            amountFieldTitle={intl.formatMessage(messages.amountTitle)}
            withRiskBar={true}
            maxDecimals={poolReserve.decimals}
            getTransactionData={handleTransactionData}
          />
        </>
      ) : (
        <NoDataPanel
          title={
            !user
              ? intl.formatMessage(messages.connectWallet)
              : poolReserve.availableLiquidity === '0'
              ? intl.formatMessage(messages.noLiquidityAvailableTitle)
              : !user || user.totalLiquidityMarketReferenceCurrency === '0'
              ? intl.formatMessage(messages.noDataTitle)
              : intl.formatMessage(messages.healthFactorTooLowTitle)
          }
          description={
            !user
              ? intl.formatMessage(messages.connectWalletDescription)
              : poolReserve.availableLiquidity === '0'
              ? intl.formatMessage(messages.noLiquidityAvailableDescription, {
                  symbol: asset.formattedName,
                })
              : !user || user.totalLiquidityMarketReferenceCurrency === '0'
              ? intl.formatMessage(messages.noDataDescription)
              : intl.formatMessage(messages.healthFactorTooLowDescription)
          }
          buttonTitle={!user ? undefined : intl.formatMessage(messages.noDataButtonTitle)}
          linkTo={!user ? undefined : `/deposit/${poolReserve.underlyingAsset}-${poolReserve.id}`}
          withConnectButton={!user}
        />
      )}

      <InfoWrapper>{currencySymbol === 'AMPL' && <AMPLWarning withInfoPanel={true} />}</InfoWrapper>
    </BorrowCurrencyWrapper>
  );
}

export default routeParamValidationHOC({})(BorrowAmount);
