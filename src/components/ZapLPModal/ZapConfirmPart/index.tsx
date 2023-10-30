import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import CompactNumber from 'components/basic/CompactNumber';
import EligibleSuccessIcon from 'icons/EligibleSuccess';
import BaseButton from 'components/BaseButton';
import { MODAL_STEPS } from 'ui-config/zap';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { LockZapContract } from 'libs/aave-protocol-js/LockZap/LockZapContract';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import { getProvider } from 'helpers/config/markets-and-network-config';
import messages from './messages';
import { ASSET_ADDRESS_BY_CHAIN_ID } from '../ZapLPModal-constants';

interface ZapConfirmPartProps {
  amount: string;
  isVesting: boolean;
  rdntAmount: string;
  selectSource: string;
  newAnnualRevenue: number;
  zapAsset: string;
  zapAssetPrice: number;
  zapAssetDecimals: number;
  selectedDuration: number;
  newLockingValue: number;
  isConfirm: boolean;
  setIsConfirm: (isConfirm: boolean) => void;
  setModalStep: (step: string) => void;
  onMainTxConfirmed?: () => void;
}

export default function ZapConfirmPart({
  amount,
  isVesting,
  rdntAmount,
  selectSource,
  newAnnualRevenue,
  zapAsset,
  zapAssetPrice,
  zapAssetDecimals,
  selectedDuration,
  newLockingValue,
  isConfirm,
  setIsConfirm,
  setModalStep,
  onMainTxConfirmed = () => {},
}: ZapConfirmPartProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const { user } = useDynamicPoolDataContext();
  const { requiredRdntToClaim, lockedValue, getVestData } = useVestHandler();
  const { lockDurations } = useMFDStats();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { networkConfig } = useStaticPoolDataContext();
  const { fetchPrice } = useRdntPrices();

  const handleMainTxExecuted = () => {
    getVestData();
    fetchPrice();
    onMainTxConfirmed();
    setModalStep(MODAL_STEPS[3]);
  };

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const liquidityZAPService = new LockZapContract(
      getProvider(chainId),
      currentMarketData.addresses.lockZap
    );
    const userId = user?.id || '';
    const assetAddress = ASSET_ADDRESS_BY_CHAIN_ID[chainId]?.[zapAsset];

    if (!assetAddress) {
      throw new Error(`Could not find asset address for ${zapAsset}`);
    }

    const isBorrow = selectSource === 'BORROW';

    if (isVesting) {
      return await liquidityZAPService.zapFromVesting(
        amount,
        userId,
        assetAddress,
        isBorrow,
        selectedDuration
      );
    }

    if (isBorrow) {
      return await liquidityZAPService.zapAssetWithRdnt({
        assetAmount: amount,
        rdntAmount,
        assetAddress,
        rdntAddress: currentMarketData.addresses.rdntToken,
        durationIndex: selectedDuration,
        user: userId,
        assetDecimals: zapAssetDecimals,
      });
    }

    return await liquidityZAPService.zapETHWithRdnt(
      amount,
      rdntAmount,
      currentMarketData.addresses.rdntToken,
      selectedDuration,
      userId
    );
  }, [
    user,
    amount,
    rdntAmount,
    selectSource,
    selectedDuration,
    networkConfig,
    chainId,
    zapAsset,
    zapAssetDecimals,
  ]);

  const continueHandler = useCallback(() => {
    setIsConfirm(true);
  }, [setIsConfirm]);

  return (
    <div className={'ZapConfirmPart'}>
      <div className="ZapConfirmPart__container">
        <p className="ZapConfirmPart__annual-revenue-value">
          $
          <CompactNumber
            value={newAnnualRevenue}
            maximumFractionDigits={2}
            minimumFractionDigits={0}
            showFullNum={false}
          />
        </p>
        <p className="ZapConfirmPart__annual-revenue-description">
          {intl.formatMessage(messages.yourNewAnnualRewards)}
        </p>
        {lockedValue + Number(amount) * zapAssetPrice >= requiredRdntToClaim && (
          <p className="ZapConfirmPart__eligible">
            <EligibleSuccessIcon />
            {intl.formatMessage(messages.eligibleEmissions)}
          </p>
        )}
      </div>

      <div className="ZapConfirmPart__section" style={{ minHeight: 369 }}>
        <div className="ZapConfirmPart__section-divider" />

        {!isConfirm ? (
          <>
            <div className="ZapConfirmPart__info-container">
              <p className="ZapConfirmPart__description">
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
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(messages.requiredLockForEmissions)}
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
              <p className="ZapConfirmPart__description">
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

            <div className="ZapConfirmPart__section-divider" />

            <div className="ZapConfirmPart__info-container">
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(
                  selectSource === 'BORROW' ? messages.assetBorrowed : messages.assetUsedFromWallet,
                  { asset: zapAsset }
                )}
                <span>
                  <CompactNumber
                    value={Number(amount)}
                    maximumFractionDigits={5}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                </span>
              </p>
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(
                  isVesting ? messages.assetUsedFromVests : messages.assetUsedFromWallet,
                  { asset: 'RDNT' }
                )}
                <span>
                  <CompactNumber
                    value={Number(rdntAmount)}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                </span>
              </p>
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(messages.slippageTolerance)}
                <span>15%</span>
              </p>
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(messages.zapValue)}
                <span>
                  $
                  <CompactNumber
                    value={newLockingValue}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                </span>
              </p>
              <p className="ZapConfirmPart__description">
                {intl.formatMessage(messages.lockDuration)}
                <span>{lockDurations[selectedDuration].lockDuration}</span>
              </p>
            </div>

            <div className="ZapConfirmPart__section">
              <BaseButton action={continueHandler} text={intl.formatMessage(messages.zapIntoDLP)} />
            </div>
          </>
        ) : (
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.submit)}
            boxTitle={intl.formatMessage(messages.submit)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetTransactionsRefreshRewards}
            onMainTxConfirmed={handleMainTxExecuted}
            successButtonTitle={intl.formatMessage(messages.goToManageRadiant)}
            blockingError={''}
            mainTxFailedMessage={intl.formatMessage(messages.mainTxFailedMessage)}
            exceptionTxFailedMessages={[
              {
                error: 'too much slippage',
                message: intl.formatMessage(messages.tooMuchSlippageFailedMessage),
              },
            ]}
            goBack={() => setIsConfirm(false)}
          />
        )}
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ZapConfirmPart {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            width: 100%;
            height: 100%;

            &__section-divider {
              content: '';
              position: relative;
              width: 100%;
              height: 1px;
              margin-bottom: 8px;
              background: ${currentTheme.palette.token4.hex};
            }

            &__section {
              display: flex;
              flex-direction: column;
              gap: 20px;
              width: 100%;
            }

            &__container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              width: 100%;
              padding: 50px 0px;
            }

            &__annual-revenue-value {
              font-weight: 700;
              font-size: 54px;
              line-height: 1;
              background: ${currentTheme.gradient.main};
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }

            &__annual-revenue-description {
              font-weight: 600;
              font-size: 15px;
              color: ${currentTheme.text.offset2};
            }

            &__eligible {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 12px;
              color: ${isCurrentThemeDark ? '#039855' : '#05a82e'};
              background: ${isCurrentThemeDark ? 'rgba(3, 152, 85, 0.15)' : '#ebf9ee'};
              border: 1px solid rgba(5, 168, 46, 0.2);
              border-radius: 30px;
              padding: 5px 10px;
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
            }

            &__description {
              display: flex;
              justify-content: space-between;
              width: 100%;
              font-size: 13px;
              color: ${currentTheme.text.offset2};

              & span {
                font-size: 14px;
                font-weight: 600;
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </div>
  );
}
