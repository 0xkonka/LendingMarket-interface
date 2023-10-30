import { useLayoutEffect, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { ethers } from 'ethers';
import { valueToBigNumber } from '@aave/protocol-js';
import { BigNumber } from '@aave/protocol-js';
import { useIntl } from 'react-intl';
import { ChainId } from '@radiantcapital/contract-helpers';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import CompactNumber from 'components/basic/CompactNumber';
import BaseButton from 'components/BaseButton';
import TabButtons from 'components/basic/TabButtons';
import EmissionStatusBar from 'components/basic/EmissionStatusBar';
import { SOURCE_OPTIONS, MODAL_STEPS } from 'ui-config/zap';
import CirclePlusIcon from 'icons/CirclePlus';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { LockZapContract } from 'libs/aave-protocol-js/LockZap/LockZapContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import messages from './messages';
import { CHAIN_ID_TO_NETWORK } from 'ui-config/chains';
import { ASSET_ADDRESS_BY_CHAIN_ID } from '../ZapLPModal-constants';
import DLPLogo from 'images/DLPLogo';
import ZapAssetAmountField from '../ZapAssetAmountField';
import Wallet from 'icons/Wallet';
import Bank from 'icons/Bank';
import Arrow from 'icons/Arrow';
import { FeatureFlag, useFeatureFlag } from 'components/FeatureFlags';

interface ZapAmountPartProps {
  isVesting: boolean;
  setIsVesting: (isVesting: boolean) => void;
  amount: string;
  rdntAmount: string;
  selectSource: string;
  zapAssetPrice: number;
  zapAsset: string;
  zapAssetDecimals: number;
  setAmount: (amount: string) => void;
  setNewLockingValue: (value: number) => void;
  setRdntAmount: (amount: string) => void;
  setSelectSource: (source: string) => void;
  setModalStep: (step: string) => void;
  setZapAsset: (zapAsset: string) => void;
}

const USE_ALL_TOKENS = false;

const TOKEN_OPTIONS_BY_CHAIN_ID: Record<number, string[]> = {
  [ChainId.arbitrum_one]: ['ETH', 'DAI', 'USDC', 'USDT'],
  [ChainId.bsc]: ['BNB', 'BUSD', 'USDC', 'USDT'],
  [ChainId.local]: ['WETH', 'DAI', 'USDC', 'USDT'],
  [ChainId.mainnet]: ['WETH', 'DAI', 'USDC', 'USDT'],
};

export default function ZapAmountPart({
  isVesting,
  setIsVesting,
  amount,
  rdntAmount,
  selectSource,
  zapAssetPrice,
  zapAsset,
  zapAssetDecimals,
  setAmount,
  setRdntAmount,
  setNewLockingValue,
  setSelectSource,
  setModalStep,
  setZapAsset,
}: ZapAmountPartProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const zapAssetSelectionEnabled = useFeatureFlag(FeatureFlag.MultiAssetZap);

  const { networkConfig } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { requiredRdntToClaim, lockedValue, isEligible } = useVestHandler();
  const { walletData } = useWalletBalanceProviderContext();
  const { walletBalance } = useRdntBalanceContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { prices } = useRdntPrices();
  const { minDLPBalance } = useUserRank();

  const [rdntOption, setRdntOption] = useState(() => {
    const rdntAmountNum = parseFloat(rdntAmount);
    return rdntAmountNum > 0 || isVesting;
  });

  const zapAssetField = useRef<HTMLInputElement>(null);
  const zapRdntField = useRef<HTMLInputElement>(null);
  const [zapAssetLoading, setZapAssetLoading] = useState(false);
  const [quoteZapAssetAmount, setQuoteZapAssetAmount] = useState('');

  useEffect(() => {
    const rememberSource = localStorage.getItem('rememberSource');
    if (rememberSource) {
      setSelectSource(rememberSource);
    }
  }, [setSelectSource]);

  const newLockingValue = Number.isNaN(Number(amount))
    ? 0
    : Number(amount) * zapAssetPrice + Number(rdntAmount) * (prices?.tokenPrice || 0);
  const minDLPValue = minDLPBalance * (prices?.lpTokenPrice || 0);
  const emissionLockPercent = Number(user?.totalLiquidityUSD)
    ? ((lockedValue + newLockingValue) / Number(user?.totalLiquidityUSD)) * 100
    : 0;

  // TODO: This doesn't account for wrapped versions if selectSource === 'Borrow'
  const zapAssetOptions = useMemo(() => {
    if (!zapAssetSelectionEnabled) return undefined;
    if (USE_ALL_TOKENS) {
      return CHAIN_ID_TO_NETWORK[chainId].availableTokens.map((token) => ({
        value: token,
        label: token,
      }));
    }
    return TOKEN_OPTIONS_BY_CHAIN_ID[chainId].map((token) => ({
      value: token,
      label: token,
    }));
  }, [chainId, zapAssetSelectionEnabled]);

  let assetAddress = ASSET_ADDRESS_BY_CHAIN_ID[chainId][zapAsset];
  if (assetAddress === networkConfig.baseAssetWrappedAddress) {
    // This is used to represent the native token as if it were an ERC20 token
    assetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  }
  const zapAssetBalance = ethers.utils.formatUnits(
    walletData[assetAddress.toLowerCase()] || '0',
    zapAssetDecimals
  );

  const poolReserve = reserves.find((reserve) => reserve.symbol === zapAsset);
  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve?.priceInMarketReferenceCurrency || '1');
  const maxAmountToBorrow = BigNumber.max(
    BigNumber.min(poolReserve?.availableLiquidity || '', maxUserAmountToBorrow),
    0
  ).toString();

  const maxAmount = selectSource === 'BORROW' ? maxAmountToBorrow : zapAssetBalance;

  useEffect(() => {
    setNewLockingValue(newLockingValue);
  }, [newLockingValue, setNewLockingValue]);

  useEffect(() => {
    (async () => {
      if (!rdntOption) {
        return;
      }
      if (Number(rdntAmount) <= 0) {
        setQuoteZapAssetAmount('');
        return;
      }
      try {
        setZapAssetLoading(true);
        const liquidityZAPService = new LockZapContract(
          getProvider(chainId),
          currentMarketData.addresses.lockZap
        );
        const quoteETHAmount = await liquidityZAPService.quote(rdntAmount, assetAddress);
        setQuoteZapAssetAmount(quoteETHAmount);
      } finally {
        setZapAssetLoading(false);
      }
    })();
  }, [rdntAmount, rdntOption, assetAddress, chainId, currentMarketData.addresses.lockZap]);

  useEffect(() => {
    if (rdntOption && Number(quoteZapAssetAmount) < Number(maxAmount)) {
      setAmount(quoteZapAssetAmount);
    }
  }, [maxAmount, quoteZapAssetAmount, rdntOption, selectSource, setAmount]);

  const sourceHandler = useCallback(
    (value: string) => {
      localStorage.setItem('rememberSource', value);
      setSelectSource(value);
      setAmount('');
    },
    [setSelectSource, setAmount]
  );

  const inputHandler = useCallback(
    (value: string) => {
      setAmount(value);
    },
    [setAmount]
  );

  const handleZapAssetEdit = () => {
    setRdntAmount('0');
    setRdntOption(false);
    setIsVesting(false);
  };

  const handleMaxButtonClick = () => {
    setRdntAmount('0');
    setRdntOption(false);
    setIsVesting(false);
    setAmount(maxAmount);
  };

  const handleRdntMaxButtonClick = () => {
    setRdntAmount(walletBalance.toString() as string);
  };

  const setRdntMode = useCallback(
    (rdntEnabled: boolean, resetInput = true) => {
      setRdntOption(rdntEnabled);
      if (resetInput) {
        setRdntAmount('');
        setAmount('');
      }
    },
    [setAmount, setRdntAmount]
  );

  useLayoutEffect(() => {
    if (rdntOption) {
      zapRdntField.current?.focus();
    } else {
      zapAssetField.current?.focus();
    }
  }, [rdntOption]);

  const continueHandler = useCallback(() => {
    setModalStep(MODAL_STEPS[1]);
  }, [setModalStep]);

  const addEmissionHandler = useCallback(() => {
    const requiredAssetAmount = zapAssetPrice
      ? (requiredRdntToClaim - lockedValue) / zapAssetPrice
      : 0;
    const requiredBufferAssetAmount =
      (requiredAssetAmount * (100 + networkConfig.bufferPercent)) / 100;

    let availableSource = localStorage.getItem('rememberSource');

    // If there's no source set in localStorage yet
    if (!availableSource) {
      if (Number(maxAmountToBorrow) >= requiredBufferAssetAmount) {
        availableSource = 'BORROW';
      } else if (Number(zapAssetBalance) >= requiredBufferAssetAmount) {
        availableSource = 'WALLET';
      }
    }
    // If the current source is not enough, check the other source.
    else if (
      (availableSource === 'BORROW' && Number(maxAmountToBorrow) < requiredBufferAssetAmount) ||
      (availableSource === 'WALLET' && Number(zapAssetBalance) < requiredBufferAssetAmount)
    ) {
      if (Number(maxAmountToBorrow) >= requiredBufferAssetAmount) {
        availableSource = 'BORROW';
      } else if (Number(zapAssetBalance) >= requiredBufferAssetAmount) {
        availableSource = 'WALLET';
      }
    }

    if (!!availableSource) {
      localStorage.setItem('rememberSource', availableSource);
      setSelectSource(availableSource);
      setAmount(requiredBufferAssetAmount.toString());
      setRdntMode(false, false);
      return;
    }
  }, [
    zapAssetPrice,
    lockedValue,
    requiredRdntToClaim,
    maxAmountToBorrow,
    zapAssetBalance,
    networkConfig,
    setAmount,
    setSelectSource,
    setRdntMode,
  ]);

  const ERROR_MESSAGES = useMemo(() => {
    const errors = [
      {
        condition: !!amount && newLockingValue * 0.95 < minDLPValue,
        message: intl.formatMessage(messages.miniumStakeAmount, {
          amount: minDLPBalance.toFixed(3),
          amountUSD: (minDLPBalance * (prices?.lpTokenPrice || 0)).toFixed(2),
        }),
      },
      {
        condition: Number(amount) > Number(maxAmount),
        message: intl.formatMessage(messages.insufficientAssetError, { asset: zapAsset }),
      },
      {
        condition: Number(rdntAmount) > Number(walletBalance),
        message: intl.formatMessage(messages.insufficientAssetError, { asset: 'RDNT' }),
      },
      {
        condition: Number(quoteZapAssetAmount) > Number(walletBalance),
        message: intl.formatMessage(messages.insufficientRDNTError, { asset: zapAsset }),
      },
    ];

    return errors.filter((error) => error.condition);
  }, [
    amount,
    newLockingValue,
    minDLPValue,
    maxAmount,
    quoteZapAssetAmount,
    walletBalance,
    intl,
    minDLPBalance,
    prices?.lpTokenPrice,
    zapAsset,
    rdntAmount,
    zapAssetDecimals,
    walletData,
  ]);

  const hasFormErrors = ERROR_MESSAGES.length > 0;

  return (
    <div className={'ZapAmountPart'}>
      <div className="ZapAmountPart__section">
        {/* ACTIVATE EMISSIONS CTA */}
        <div className="ZapAmountPart__emissions-card">
          <div className="ZapAmountPart__emissions-card-content">
            <div className="ZapAmountPart__percent-info">
              <p className="ZapAmountPart__percent-title">
                {isEligible ? (
                  <>{intl.formatMessage(messages.emissionsEligible)}</>
                ) : (
                  <>{intl.formatMessage(messages.activateEmissions)}</>
                )}
              </p>
              <p className="ZapAmountPart__percent-description">
                {intl.formatMessage(messages.becomeEligibleDescription, {
                  percent: <span>5%</span>,
                })}
              </p>
            </div>
            <div className="ZapAmountPart__emissions-status-container">
              <div className="ZapAmountPart__emissions-status-container--row">
                <div className="ZapAmountPart__emissions-status-label-container">
                  <DLPLogo width={14} height={14} />
                  <div className="ZapAmountPart__emissions-status-label">
                    {intl.formatMessage(messages.emissionsStatusLabel, {
                      percentLock: (
                        <span>
                          <CompactNumber
                            value={emissionLockPercent}
                            maximumFractionDigits={2}
                            minimumFractionDigits={0}
                            showFullNum={false}
                          />
                          %
                        </span>
                      ),
                      percentDeposits: (
                        <span>
                          $
                          <CompactNumber
                            value={Number(user?.totalLiquidityUSD)}
                            maximumFractionDigits={2}
                            minimumFractionDigits={0}
                            showFullNum={false}
                          />
                        </span>
                      ),
                    })}
                  </div>
                </div>

                {!isEligible && Number(user?.totalLiquidityUSD) > 0 && (
                  <button
                    onClick={addEmissionHandler}
                    disabled={isVesting}
                    className="ZapAmountPart__meet-eligible-button"
                  >
                    <span>{intl.formatMessage(messages.meetEligibility)}</span>
                    <Arrow
                      width={14}
                      height={14}
                      rotation="-90deg"
                      color={currentTheme.accent.default.hex}
                    />
                  </button>
                )}
              </div>
              <EmissionStatusBar
                className="ZapAmountPart__emissions-status-bar"
                locked={lockedValue + newLockingValue}
              />
            </div>
          </div>
        </div>

        {/* CHOOSE ZAP ASSET */}
        <form>
          <ZapAssetAmountField
            forwardedRef={zapAssetField}
            zapAssetSelected={zapAsset}
            zapAssetOptions={zapAssetOptions}
            setZapAsset={setZapAsset}
            disabled={rdntOption}
            error={hasFormErrors}
            onEdit={handleZapAssetEdit}
            maxAmount={maxAmount}
            maxDecimals={18}
            value={amount}
            loading={zapAssetLoading}
            onChange={inputHandler}
            placeholder={rdntOption ? 'Waiting on RDNT...' : '0.0'}
            bottomRightContent={
              <span
                className="ZapAssetAmountField__max-amount"
                onClick={() => handleMaxButtonClick()}
              >
                <CompactNumber
                  value={maxAmount}
                  maximumFractionDigits={5}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />
                {selectSource === 'BORROW' ? (
                  <Bank color={currentTheme.accent.default.hex} width={16} height={16} />
                ) : (
                  <Wallet color={currentTheme.accent.default.hex} width={16} height={16} />
                )}
              </span>
            }
            bottomLeftContent={
              <TabButtons
                values={SOURCE_OPTIONS}
                selectedValue={selectSource}
                setSelectedValue={sourceHandler}
              />
            }
          />
        </form>

        {/* CHOOSE RDNT (OPTIONAL) */}
        {!rdntOption ? (
          <p className="ZapAmountPart__add-rdnt-option" onClick={() => setRdntMode(true)}>
            <CirclePlusIcon color={currentTheme.palette.token4.hex} />
            {intl.formatMessage(messages.addRdntToDLP)}
          </p>
        ) : (
          <ZapAssetAmountField
            forwardedRef={zapRdntField}
            zapAssetSelected={'RDNT'}
            disabled={!Number(walletBalance) || isVesting}
            error={hasFormErrors}
            maxAmount={walletBalance.toString()}
            maxDecimals={18}
            value={rdntAmount}
            onChange={setRdntAmount}
            onMaxButtonClick={handleRdntMaxButtonClick}
          />
        )}
      </div>

      {/* FORM ERRORS */}
      {hasFormErrors && (
        <div className="ZapAmountPart__error-container">
          {ERROR_MESSAGES.map((error) => {
            return error.condition ? (
              <p key={error.message} className="ZapAmountPart__error">
                {error.message}
              </p>
            ) : null;
          })}
        </div>
      )}

      <div className="ZapAmountPart__section ZapAmountPart__section-button">
        <BaseButton
          disabled={!Number(amount) || hasFormErrors}
          action={continueHandler}
          text={intl.formatMessage(messages.continue)}
          isArrowVisible={true}
        />
      </div>

      <div className="ZapAmountPart__section">
        <div className="ZapAmountPart__section-divider"></div>

        <div className="ZapAmountPart__info-container">
          <p className="ZapAmountPart__description">
            {intl.formatMessage(messages.totalDepositValue)}
            <span>
              $
              <CompactNumber
                value={Number(user?.totalLiquidityUSD)}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="ZapAmountPart__description">
            {intl.formatMessage(messages.requiredLockValueForEmissions)}
            <span>
              $
              <CompactNumber
                value={requiredRdntToClaim}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="ZapAmountPart__description">
            {intl.formatMessage(messages.currentlyLocked)}
            <span>
              $
              <CompactNumber
                value={lockedValue}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
        </div>
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ZapAmountPart {
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;

            &__add-rdnt-option {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: ${currentTheme.text2.subdued.hex};
              border: 1px dashed ${currentTheme.palette.token4.hex};
              border-radius: 12px;
              padding: 16px;
              gap: 16px;
              background: ${currentTheme.palette.token2.hex};
              min-height: 122px;
              cursor: pointer;
              transition: all 0.2s;

              &:hover {
                background: ${currentTheme.palette.token1.hex};
              }
            }

            &__emissions-card {
              display: flex;
              border-radius: 12px;
              background: #f6f8fe;
              position: relative;
              width: 100%;
              border: 1px solid rgba(82, 116, 242, 0.4);
              background: ${!isCurrentThemeDark
                ? `radial-gradient(
                  78.98% 42.89% at 6.55% 48.52%,
                  rgba(3, 221, 173, 0.3) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                radial-gradient(
                  214.02% 83.9% at 125.68% 71.34%,
                  rgba(82, 116, 242, 0.6) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                radial-gradient(
                  58.5% 58.5% at 48.61% 0%,
                  rgba(8, 150, 253, 0.6) 0%,
                  rgba(255, 255, 255, 0) 100%
                )`
                : `radial-gradient(
                  78.98% 42.89% at 6.55% 48.52%,
                  rgba(3, 221, 173, 0.6) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                radial-gradient(
                  214.02% 83.9% at 125.68% 71.34%,
                  rgba(82, 116, 242, 0.6) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                radial-gradient(
                  58.5% 58.5% at 48.61% 0%,
                  rgba(8, 150, 253, 0.6) 0%,
                  rgba(255, 255, 255, 0) 100%
                )`};
            }

            &__emissions-card-content {
              display: flex;
              flex-direction: column;
              padding: 16px;
              width: 100%;
              height: 100%;
              border-radius: 12px;
              gap: 16px;
              color: ${currentTheme.text2.default.hex};
              background: ${isCurrentThemeDark
                ? `linear-gradient(180deg, rgba(19, 19, 19, 0.80) 0.01%, rgba(0, 0, 0, 0.40) 100%);`
                : `linear-gradient(
                180deg,
                rgba(209, 223, 251, 0.8) 0.01%,
                rgba(255, 255, 255, 0.4) 100%
              )`};
              backdrop-filter: blur(20px);
            }

            &__emissions-status-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
              min-height: 20px;

              &--row {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                gap: 12px;
              }
            }

            &__emissions-status-label-container {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 4px;
              flex: 1;
            }

            &__emissions-status-label {
              font-size: 14px;
              font-weight: $fontWeightMedium;
              line-height: 1;
              white-space: nowrap;
            }

            &__emissions-status-bar {
              width: auto;
              flex: 1;
            }

            &__section-divider {
              content: '';
              position: relative;
              width: 100%;
              height: 1px;
              background: ${currentTheme.palette.token4.hex};
              margin-bottom: 8px;
            }

            &__section {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }

            &__percent-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              width: 100%;
            }

            &__percent-info {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }

            &__percent-title {
              font-weight: $fontWeightSemiBold;
              font-size: 14px;
            }

            &__percent-description {
              font-size: 14px;
            }

            &__meet-eligible-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }

            &__meet-eligible-button {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 14px;
              font-weight: $fontWeightSemiBold;
              color: ${currentTheme.accent.default.hex};
              cursor: pointer;

              &:hover {
                opacity: ${isEligible ? 1 : 0.6};
              }
            }

            &__container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              width: 100%;
            }

            &__rdnt-option {
              display: flex;
              align-items: center;
              gap: 12px;
              font-size: 15px;
              color: ${currentTheme.text.offset3};
              border: 1px dashed ${currentTheme.text.offset4};
              padding: 18px;
              border-radius: 10px;
              cursor: pointer;
            }

            &__error {
              font-size: 14px;
              color: ${currentTheme.text.negative};
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 8px;
              width: 100%;
            }

            &__description {
              display: flex;
              justify-content: space-between;
              width: 100%;
              font-size: 13px;
              color: ${currentTheme.text2.default.hex};

              & span {
                font-weight: $fontWeightSemiBold;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
