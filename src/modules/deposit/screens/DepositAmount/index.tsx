import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import BigNumber from 'bignumber.js';
import { valueToBigNumber } from '@aave/protocol-js';

import { useTxBuilderContext } from 'libs/tx-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import NoDataPanel from 'components/NoDataPanel';
import BasicForm from 'components/forms/BasicForm';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import DepositCurrencyWrapper from '../../components/DepositCurrencyWrapper';
import { getProvider, isFeatureEnabled } from 'helpers/config/markets-and-network-config';
import { getAssetInfo } from 'helpers/config/assets-config';
import messages from './messages';
import CheckBoxField from 'components/fields/CheckBoxField';
import Value from 'components/basic/Value';
import Row from 'components/basic/Row';
import { LeveragerContract } from 'libs/aave-protocol-js/Leverager/LeveragerContract';
import { Action } from 'components/basic/RiskBar';

interface DepositAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'currencySymbol' | 'poolReserve' | 'history' | 'walletBalance' | 'user' | 'userReserve'
  > {}

function DepositAmount({
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  history,
  walletBalance,
}: DepositAmountProps) {
  const intl = useIntl();
  const { networkConfig, currentMarketData, chainId } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const [isAutoDLP, setIsAutoDLP] = useState(false);
  const [formAmount, setFormAmount] = useState('');
  const { reserves } = useDynamicPoolDataContext();
  const [wethEstimation, setWETHEstimation] = useState(0);

  const asset = getAssetInfo(currencySymbol);

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    maxAmountToDeposit = maxAmountToDeposit.minus('0.001');
  }
  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount, isAutoDLP });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.deposit({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: maxAmountToDeposit.toString(10),
      referralCode: undefined,
    });
  };

  const API_ETH_MOCK_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const ethReserve = reserves.filter(
    (reserve) => reserve.underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
  )[0];

  const availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );
  const availableBorrows = availableBorrowsMarketReferenceCurrency.gt(0)
    ? BigNumber.min(
        availableBorrowsMarketReferenceCurrency
          .div(ethReserve.priceInMarketReferenceCurrency)
          .multipliedBy(user && user.totalBorrowsMarketReferenceCurrency !== '0' ? '0.99' : '1'),
        ethReserve.availableLiquidity
      ).toNumber()
    : 0;

  const getWETHEstimation = useCallback(async () => {
    try {
      const leveragerContract = new LeveragerContract(
        getProvider(chainId),
        currentMarketData.addresses.leverager
      );
      const userId = user?.id || '';
      const assetAddress = poolReserve.underlyingAsset;
      const amount = formAmount;
      const borrowRatio = '0';
      const loopCount = '1';

      const wethEstimation = await leveragerContract.wethToZapEstimation(
        userId,
        assetAddress,
        amount,
        borrowRatio,
        loopCount
      );
      setWETHEstimation(wethEstimation);
    } catch (error) {
      console.log(error);
    }
  }, [chainId, currentMarketData, user, poolReserve, formAmount]);

  useEffect(() => {
    getWETHEstimation();
  }, [getWETHEstimation]);

  return (
    <DepositCurrencyWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      walletBalance={walletBalance}
      userReserve={userReserve}
      user={user}
    >
      {!maxAmountToDeposit.eq('0') && (
        <>
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
            setFormAmount={setFormAmount}
          />
          <br />
          <CheckBoxField
            value={isAutoDLP}
            name="DepositAutoDLP__checkbox"
            onChange={() => setIsAutoDLP(!isAutoDLP)}
            title="Make sure to be eligible for rewards after deposit."
          />
          {isAutoDLP && (
            <>
              <Row title={'Required WETH Borrow'}>
                <Value value={wethEstimation.toFixed(2)} />
              </Row>
              <p className="DepositAutoDLP__requiredWeth">
                {intl.formatMessage(messages.wethAmt)}
                {wethEstimation}
              </p>
              {availableBorrows < wethEstimation && (
                <p className="DepositAutoDLP__wethError">
                  {intl.formatMessage(messages.wethError)}
                </p>
              )}
            </>
          )}
        </>
      )}
      {maxAmountToDeposit.eq('0') && (
        <NoDataPanel
          title={
            !user
              ? intl.formatMessage(messages.connectWallet)
              : intl.formatMessage(messages.noDataTitle)
          }
          description={
            !user
              ? intl.formatMessage(messages.connectWalletDescription)
              : intl.formatMessage(messages.noDataDescription, {
                  currencySymbol: asset.formattedName,
                  br: <br />,
                })
          }
          linkTo={
            !user
              ? undefined
              : isFeatureEnabled.faucet(currentMarketData)
              ? `/faucet/${poolReserve.underlyingAsset}`
              : undefined
          }
          buttonTitle={
            !user
              ? undefined
              : isFeatureEnabled.faucet(currentMarketData)
              ? intl.formatMessage(messages.noDataButtonTitle)
              : undefined
          }
          withConnectButton={!user}
        />
      )}
      <style jsx={true} global={true}>
        {`
          .DepositAutoDLP {
            &__requiredWeth {
              margin-top: 1em;
              margin-bottom: 1em;
              font-size: 12px;
            }

            &__wethError {
              color: red !important;
              font-size: 12px;
            }
          }
        `}
      </style>
    </DepositCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(DepositAmount);
