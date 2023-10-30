import { FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';
import { valueToBigNumber } from '@aave/protocol-js';

import {
  ComputedReserveData,
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from 'libs/pool-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { LeveragerContract } from 'libs/aave-protocol-js/Leverager/LeveragerContract';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import { getProvider } from 'helpers/config/markets-and-network-config';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import AmountField from 'components/fields/AmountField';
import ConnectButton from 'components/ConnectButton';
import LabeledSwitcher from 'components/basic/LabeledSwitcher';
import GradientButton from 'components/basic/GradientButton';
import SelectTokenField from 'components/fields/SelectTokenField';
import Row from 'components/basic/Row';
import ValuePercent from 'components/basic/ValuePercent';
import Value from 'components/basic/Value';
import InputBar from 'components/basic/InputBar';
import HealthFactor from 'components/HealthFactor';
import { TokenIcon } from 'helpers/config/assets-config';
import {
  BN_ONE,
  significantLoopingCount,
  loopingLeverageToLtv,
  estimateLooping,
} from 'helpers/leverage';
import messages from './messages';
import { useThemeContext } from 'aave-ui-kit';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import CheckBoxField from 'components/fields/CheckBoxField';
import { useTokenPrices } from 'libs/aave-protocol-js/hooks/use-token-prices';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import LoopRow from './LoopRow';

interface Borrow1ClickLoopFormProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  className?: string;
  stableReserves?: ComputedReserveData[];
  setReserveId?: (value: string) => void;
  isDisableTokenSelect?: boolean;
}

const INTEREST_RATE_MODE = '2';
const AMOUNT_MIN = '0';
const LEVERAGE_MIN = '1.1';

export default function Borrow1ClickLoopForm({
  user,
  currencySymbol,
  poolReserve,
  className,
  stableReserves,
  setReserveId = () => {},
  isDisableTokenSelect = false,
}: Borrow1ClickLoopFormProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { walletData } = useWalletBalanceProviderContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { getRewardApr } = useRdntLendingPoolRewards();
  const { tokenPrices } = useTokenPrices();
  const { networkConfig } = useStaticPoolDataContext();
  const { minDLPBalance } = useUserRank();
  const { prices } = useRdntPrices();
  const { defaultLockIndex, userShare } = useUserMFDStats();

  const INFO_TABS = ['Deposit', 'Borrow'];

  let blockingError = '';
  const maxLV = BN_ONE.div(
    BN_ONE.minus(valueToBigNumber(poolReserve.baseLTVasCollateral))
  ).decimalPlaces(2, BigNumber.ROUND_FLOOR);
  const maxLeverage = maxLV.lt(valueToBigNumber('4')) ? maxLV.toString() : '4';

  const { rdntRewardsDepositApr = 0, rdntRewardsBorrowApr = 0 } = getRewardApr(poolReserve);

  const [tab, setTab] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [readLoopNotice, setReadLoopNotice] = useState(false);
  const [feePercent, setFeePercent] = useState(0);
  const [defaultLockTime, setDefaultLockTime] = useState(3);
  const [wethEstimation, setWETHEstimation] = useState(0);
  const [formData, setFormData] = useState({
    amount: AMOUNT_MIN,
    leverage: maxLeverage,
  });
  const [errors, setErrors] = useState({
    amount: '',
    leverage: '',
  });
  const [chainSelectVisible, setChainSelectVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(INFO_TABS[0]);
  const [newHealthFactor, setNewHealthFactor] = useState('');
  const [networkTokenSymbol, setNetworkTokenSymbol] = useState(
    chainId === 56 || chainId === 97 ? 'BNB' : 'ETH'
  );

  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve?.priceInMarketReferenceCurrency || '1');

  const API_ETH_MOCK_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const ethReserve = reserves.filter(
    (reserve) => reserve.underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
  )[0];

  const nativeTokenPrice = useMemo(() => {
    const nativeToken = tokenPrices.find((item) => item.symbol === networkConfig.baseAsset);
    return nativeToken?.price || 0;
  }, [networkConfig, tokenPrices]);

  const newLockingValue = wethEstimation * nativeTokenPrice;
  const minDLPValue = minDLPBalance * (prices?.lpTokenPrice || 0);

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
      const amount = formData.amount;
      const borrowRatio = loopingLeverageToLtv(valueToBigNumber(formData.leverage));
      const loopCount = significantLoopingCount(valueToBigNumber(formData.leverage));

      const wethEstimation = await leveragerContract.wethToZapEstimation(
        userId,
        assetAddress,
        amount,
        borrowRatio.toString(),
        loopCount.toString()
      );
      setWETHEstimation(wethEstimation);
    } catch (error) {
      console.log(error);
    }
  }, [
    chainId,
    currentMarketData,
    user,
    poolReserve,
    formData,
    setWETHEstimation,
    loopingLeverageToLtv,
    significantLoopingCount,
  ]);

  useEffect(() => {
    getWETHEstimation();
  }, [getWETHEstimation]);

  useEffect(() => {
    const times = [1, 3, 6, 12];
    setDefaultLockTime(times[defaultLockIndex]);
  }, [defaultLockIndex, userShare]);

  const getLeverageInfo = useCallback(async () => {
    try {
      const leveragerContract = new LeveragerContract(
        getProvider(chainId),
        currentMarketData.addresses.leverager
      );

      const feePercent = (await leveragerContract.getFeePercent()) * 100;
      setFeePercent(feePercent);
    } catch (error) {
      console.log(error);
    }
  }, [chainId, currentMarketData, setFeePercent]);

  useEffect(() => {
    getLeverageInfo();
  }, [getLeverageInfo]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      leverage: maxLeverage,
    }));
  }, [maxLeverage]);

  const { depositAPY, borrowAPY, rewardAPR, netAPY, healthFactor } = estimateLooping({
    amount: valueToBigNumber(formData.amount),
    asset: poolReserve,
    leverage: valueToBigNumber(formData.leverage),
    depositIncentiveAPR: valueToBigNumber(rdntRewardsDepositApr),
    variableBorrowIncentiveAPR: valueToBigNumber(rdntRewardsBorrowApr),
    userSummary: user,
  });

  useEffect(() => {
    if (healthFactor !== '0') setNewHealthFactor(healthFactor ?? '0');
  }, [healthFactor]);

  useEffect(() => {
    setNetworkTokenSymbol(chainId === 56 || chainId === 97 ? 'BNB' : 'ETH');
  }, [chainId]);

  const walletBalance = useMemo(() => {
    const maxWalletBalance =
      walletData[poolReserve.underlyingAsset] === '0'
        ? valueToBigNumber('0')
        : valueToBigNumber(walletData[poolReserve.underlyingAsset] || '0').dividedBy(
            valueToBigNumber('10').pow(poolReserve.decimals)
          );

    return maxWalletBalance.toString(10);
  }, [walletData, poolReserve]);

  const tabHandler = useCallback(() => {
    setTab((prev) => !prev);
  }, [setTab]);

  const actionTabHandler = (tab: string) => () => {
    if (tab === INFO_TABS[2]) {
      return;
    }

    setSelectedTab(tab);
  };

  const maxAmount = useMemo(
    () => (selectedTab === 'Deposit' ? walletBalance : maxUserAmountToBorrow.toString()),
    [selectedTab]
  );

  const inputHandler = useCallback(
    (key: string, maxValue: string, minValue: string) => (value: string) => {
      if (maxValue && parseFloat(value) > parseFloat(maxValue)) {
        value = maxValue;
      }

      if (minValue && parseFloat(value) < parseFloat(minValue)) {
        setErrors((prev) => ({
          ...prev,
          [key]: `This field should be more than ${minValue}`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [key]: '',
        }));
      }

      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFormData, setErrors]
  );

  const handleBarChange = useCallback(
    (amount: string) => {
      setFormData((prev) => ({
        ...prev,
        leverage: amount,
      }));
    },
    [setFormData]
  );

  const handleMaxButtonClick = useCallback(
    (key: string, maxValue: string) => () => {
      setFormData((prev) => ({
        ...prev,
        [key]: maxValue,
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (wethEstimation !== 0 && !readLoopNotice) return;

      if (parseFloat(formData.amount) <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: 'Please input the correct amount',
        }));
        return;
      }

      if (!errors.leverage) {
        setIsConfirm(true);
      }
    },
    [errors, formData, setIsConfirm, setErrors, readLoopNotice, wethEstimation]
  );

  const handleGetTransactions = useCallback(async () => {
    const leveragerContract = new LeveragerContract(
      getProvider(chainId),
      currentMarketData.addresses.leverager
    );

    const userId = user?.id || '';
    const assetAddress = poolReserve.underlyingAsset;
    const debtTokenAddress = poolReserve.variableDebtTokenAddress;
    const amount = formData.amount;
    const borrowRatio = loopingLeverageToLtv(valueToBigNumber(formData.leverage));
    const loopCount = significantLoopingCount(valueToBigNumber(formData.leverage));

    return await leveragerContract.loop(
      userId,
      assetAddress,
      debtTokenAddress,
      amount,
      INTEREST_RATE_MODE,
      borrowRatio.toString(),
      loopCount.toString(),
      currentMarketData.addresses.wrappedBaseDebtToken,
      selectedTab === INFO_TABS[0] ? false : true
    );
  }, [user, poolReserve, formData]);

  const handleMainTxExecuted = () => {};

  return (
    <div className={classNames('Borrow1ClickLoopForm', className)}>
      <h2 className="Borrow1ClickLoopForm__title">{intl.formatMessage(messages.title)}</h2>

      <p className="Borrow1ClickLoopForm__description">
        {intl.formatMessage(messages.description)} <br />
        {feePercent > 0 && intl.formatMessage(messages.feeDescription, { fee: feePercent })}
      </p>

      <div className="Borrow1ClickLoopForm__start-with">
        {intl.formatMessage(messages.startWith)}
      </div>
      <div className="Borrow1ClickLoopForm__detail-top">
        {INFO_TABS.map((item) => (
          <div
            key={item}
            className={classNames(
              'Borrow1ClickLoopForm__detail-top-item',
              item === selectedTab && 'Borrow1ClickLoopForm__detail-top-item-selected',
              item === INFO_TABS[2] && 'Borrow1ClickLoopForm__detail-top-item-disabled'
            )}
            onClick={actionTabHandler(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {false && (
        <LabeledSwitcher
          leftOption={intl.formatMessage(messages.oneClickTab)}
          rightOption={intl.formatMessage(messages.closeTab)}
          onToggle={tabHandler}
          value={tab}
          darkOnDarkMode={true}
        />
      )}

      {!tab ? (
        !isConfirm ? (
          <form onSubmit={handleSubmit} className="Borrow1ClickLoopForm__inner">
            {!isDisableTokenSelect && (
              <SelectTokenField
                className="Borrow1ClickLoopForm__select-field"
                visible={chainSelectVisible}
                setVisible={setChainSelectVisible}
                placeholder={intl.formatMessage(messages.selectToken)}
                value={poolReserve}
              >
                {stableReserves?.map((item) => (
                  <button
                    className="Borrow1ClickLoopForm__select-button"
                    type="button"
                    onClick={() => {
                      setReserveId(item.id);
                      setChainSelectVisible(false);
                    }}
                    disabled={poolReserve.id === item.id}
                    key={item.id}
                  >
                    <TokenIcon tokenSymbol={item.symbol} height={30} width={30} />
                    <span>{item.symbol}</span>
                  </button>
                ))}
              </SelectTokenField>
            )}
            <br />
            <AmountField
              title={intl.formatMessage(messages.amountAvailable)}
              maxAmount={maxAmount}
              symbol={currencySymbol}
              maxDecimals={poolReserve.decimals}
              value={formData.amount}
              onChange={inputHandler('amount', maxAmount, AMOUNT_MIN)}
              onMaxButtonClick={handleMaxButtonClick('amount', maxAmount)}
              error={errors.amount}
            />

            {availableBorrows < wethEstimation && formData.amount && (
              <p className="Borrow1ClickLoopForm__wethError">
                {intl.formatMessage(messages.wethError)}
              </p>
            )}
            {/* {!!formData.amount && newLockingValue > 0 && newLockingValue * 0.95 < minDLPValue && (
              <div className="Borrow1ClickLoopForm__minDLPContainer">
                <p className="Borrow1ClickLoopForm__minDLPError">
                  Minimum locked dLP required to use 1-click loop
                </p>
                <div className="Borrow1ClickLoopForm__minDLPBalanceWrapper">
                  <span>{minDLPBalance.toFixed(3)} dLP</span>
                  <span className="Borrow1ClickLoopForm__minDLPTokenPrice">
                    (${(minDLPBalance * (prices?.lpTokenPrice || 0)).toFixed(2)})
                  </span>
                </div>
              </div>
            )} */}
            <InputBar
              label={intl.formatMessage(messages.leverage)}
              value={Number(formData.leverage)}
              minAmount={LEVERAGE_MIN}
              maxAmount={maxLeverage}
              onChange={handleBarChange}
            />

            <Row
              title={
                <TokenIcon
                  tokenSymbol={currencySymbol}
                  tokenFullName={intl.formatMessage(messages.baseAPY)}
                  height={15}
                  width={15}
                  className="Borrow1ClickLoopForm__status-label"
                />
              }
            >
              <ValuePercent
                value={
                  Number.isNaN(depositAPY.minus(borrowAPY).toNumber())
                    ? 0
                    : depositAPY.minus(borrowAPY)
                }
                showFullNum
              />
            </Row>

            <Row
              title={
                <TokenIcon
                  tokenSymbol={'rdnt'}
                  tokenFullName={intl.formatMessage(messages.rewardsAPR)}
                  height={15}
                  width={15}
                  className="Borrow1ClickLoopForm__status-label"
                />
              }
            >
              <ValuePercent
                value={Number.isNaN(rewardAPR.toNumber()) ? 0 : rewardAPR}
                showFullNum
              />
            </Row>

            <Row title={'Estimated new APR'}>
              <ValuePercent value={Number.isNaN(netAPY.toNumber()) ? 0 : netAPY} showFullNum />
            </Row>

            <LoopRow title={`${networkTokenSymbol} required to loop`}>
              <Value value={formData.amount ? wethEstimation.toFixed(3) : 0} />
            </LoopRow>

            <HealthFactor value={newHealthFactor} titleLightWeight={true} />
            <br />
            {}
            <p className="loopNotice">
              <span style={{ color: currentTheme.text.negative }}>
                <strong>Notice:</strong>
              </span>{' '}
              In addition to looping, this function will also borrow and convert{' '}
              {networkTokenSymbol} into
              <a
                href="https://docs.radiant.capital/radiant/project-info/deposit/looping"
                target={'_blank'}
                className="dlpLink"
                rel="noreferrer"
              >
                {' '}
                dLP (dynamic locked liquidity){' '}
              </a>
              in order to maintain the minimum eligibility required to unlock emissions. You can
              adjust your default lock length on the
              <a href="/#/manage-radiant" target={'_blank'} className="dlpLink" rel="noreferrer">
                {' '}
                Manage{' '}
              </a>
              page.
              <br />
              <br />
              If you are already eligible for emissions, additional dLP will not be automatically
              created through this function.
              <br />
              <br />
              {wethEstimation !== 0 && (
                <CheckBoxField
                  value={readLoopNotice}
                  name="DepositAutoDLP__checkbox"
                  className="dlpNotice"
                  onChange={() => setReadLoopNotice(!readLoopNotice)}
                  title={` I understand that I will be borrowing ${
                    formData.amount ? wethEstimation.toFixed(3) : 0
                  } ${networkTokenSymbol} for this transaction to create and lock dLP for my default locking length of ${defaultLockTime} month${
                    defaultLockTime !== 1 ? 's' : ''
                  }.`}
                />
              )}
            </p>

            <div className="Borrow1ClickLoopForm__buttons">
              {!currentAccount ? (
                <ConnectButton />
              ) : (
                <GradientButton
                  fullWidth
                  type="submit"
                  className={wethEstimation !== 0 && !readLoopNotice ? 'disabled' : ''}
                  disabled={
                    !!errors.leverage ||
                    (!!formData.amount &&
                      newLockingValue > 0 &&
                      newLockingValue * 0.95 < minDLPValue)
                  }
                >
                  {intl.formatMessage(messages.submit)}
                </GradientButton>
              )}
            </div>
          </form>
        ) : (
          <>
            <PoolTxConfirmationView
              mainTxName={intl.formatMessage(messages.title)}
              boxTitle={intl.formatMessage(messages.title)}
              boxDescription={intl.formatMessage(messages.boxDescription)}
              getTransactionsData={handleGetTransactions}
              onMainTxExecuted={handleMainTxExecuted}
              blockingError={blockingError}
              mainTxFailedMessage="Please try again with a lower loop count or reduced amount."
              goBack={() => setIsConfirm(false)}
            />
          </>
        )
      ) : (
        <form onSubmit={handleSubmit} className="Borrow1ClickLoopForm__inner">
          <p>{intl.formatMessage(messages.closeDescription)}</p>

          {!currentAccount ? (
            <ConnectButton />
          ) : (
            <GradientButton fullWidth type="submit">
              {intl.formatMessage(messages.closeLoopButton)}
            </GradientButton>
          )}
        </form>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Borrow1ClickLoopForm {
            display: flex;
            flex-direction: column;
            max-width: $maxFormWidth;

            &__minDLPContainer {
              display: flex;
              justify-content: space-between;
              padding-top: 10px;
            }

            &__minDLPError {
              color: ${currentTheme.text.negative} !important;
              font-size: 13px;
              font-weight: 600;
            }

            &__minDLPBalanceWrapper {
              display: flex;
              flex-direction: column;
              align-items: flex-end;

              & span {
                color: ${currentTheme.text.negative} !important;
                font-size: 14px;
                font-weight: 600;
              }
            }

            &__minDLPTokenPrice {
              color: ${currentTheme.text.negative} !important;
              font-size: 12px !important;
            }

            .dlpLink {
              all: unset;
              cursor: pointer;
              color: ${currentTheme.brand.main};
            }

            .loopNotice,
            .dlpNotice p {
              font-size: 14px !important;
              font-weight: 500;
            }
            .disabled {
              opacity: 0.5;
            }

            &__title {
              font-size: 18px;
              font-weight: 600;
              color: ${currentTheme.text.main};
              margin-bottom: 20px;
            }

            &__description {
              width: 100%;
              font-size: 14px;
              color: ${currentTheme.text.main};
              margin-bottom: 30px;
            }

            &__start-with {
              color: ${currentTheme.text.main};
              width: 100%;
              margin-bottom: 5px;
              font-size: 14px;
            }

            &__detail-top {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }

            &__detail-top-item {
              cursor: pointer;
              padding: 12px 24px;
              color: ${currentTheme.text.offset1};
              background-color: ${isCurrentThemeDark
                ? 'rgba(71,81,103, 0.25)'
                : currentTheme.interface.tableBorder};
              display: flex;
              justify-content: center;
              align-items: center;

              &:hover {
                font-weight: 600;
                color: ${currentTheme.text.main};
                transition: color 0.2s ease-in-out;
              }
            }

            &__detail-top-item-selected {
              cursor: pointer;
              padding: 12px 24px;
              color: ${currentTheme.text.main};
              font-weight: 600;
              background-color: ${currentTheme.interface.mainTable};
              transition: background-color 0.2s ease-in-out;
            }

            &__detail-top-item-disabled {
              color: ${currentTheme.brand.main};
            }

            &__inner {
              display: flex;
              flex-direction: column;
              gap: 15px;
              width: 100%;

              p {
                font-size: 12px;
                color: ${currentTheme.text.main};
              }
            }

            &__select {
              margin-top: 20px;

              p {
                font-size: 12px;
                margin-bottom: 5px;
              }
            }

            &__select-button {
              display: flex;
              align-items: center;
              font-size: 16px;
              padding: 10px;
            }

            &__wethError {
              color: ${currentTheme.text.offset2} !important;
            }

            &__autoZap {
              display: flex;
              justify-content: flex-start;
            }

            &__status-label {
              b {
                font-weight: 400;
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </div>
  );
}
