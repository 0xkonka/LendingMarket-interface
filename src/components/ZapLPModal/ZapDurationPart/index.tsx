import { useIntl } from 'react-intl';
import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';

import CompactNumber from 'components/basic/CompactNumber';
import BaseButton from 'components/BaseButton';
import { MODAL_STEPS } from 'ui-config/zap';
import messages from './messages';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import ZapDurationSelector from '../ZapDurationSelector';

interface ZapDurationPartProps {
  isVesting: boolean;
  newAnnualRevenue: number;
  oldAnnualRevenue: number;
  selectedDuration: number;
  newLockingValue: number;
  setSelectedDuration: (duration: number) => void;
  setMultiplier: (muliplier: number) => void;
  setModalStep: (step: string) => void;
  zapAssetSource: string;
  zapAsset: string;
  zapAssetAmount: string;
  zapAssetPrice: number;
  zapAssetDecimals: number;
  rdntAmount: string;
}

export default function ZapDurationPart({
  isVesting,
  newAnnualRevenue,
  oldAnnualRevenue,
  selectedDuration,
  newLockingValue,
  setSelectedDuration = () => {},
  setMultiplier = () => {},
  setModalStep,
  zapAssetSource,
  zapAsset,
  zapAssetAmount,
  zapAssetPrice,
  zapAssetDecimals,
  rdntAmount,
}: ZapDurationPartProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lockedValue, requiredRdntToClaim } = useVestHandler();
  const isButtonDisabled = selectedDuration === 0 && isVesting;

  const continueHandler = useCallback(() => {
    setModalStep(MODAL_STEPS[2]);
  }, [setModalStep]);

  return (
    <div className="ZapDurationPart">
      <div className="ZapDurationPart__section">
        <div className="ZapDurationPart__table">
          <div className="ZapDurationPart__table-content">
            <span className="ZapDurationPart__table-label">
              {intl.formatMessage(messages.dLPDepositValue)}
            </span>
            <span className="ZapDurationPart__table-number">
              $
              <CompactNumber
                value={lockedValue + newLockingValue}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum={false}
              />
            </span>
            <span className="ZapDurationPart__table-comparison">
              $
              <CompactNumber
                value={lockedValue}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum={false}
              />
            </span>
          </div>
          <div className="ZapDurationPart__table-content">
            <span className="ZapDurationPart__table-label">
              {intl.formatMessage(messages.yourNewAnnualRewards)}
            </span>
            <span className="ZapDurationPart__table-number ZapDurationPart__table-number--annual-rewards">
              $
              <CompactNumber
                value={newAnnualRevenue}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum={false}
              />
            </span>
            <span className="ZapDurationPart__table-comparison">
              $
              <CompactNumber
                value={oldAnnualRevenue}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum={false}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="ZapDurationPart__section">
        <div className="ZapDurationPart__section-divider" />

        <p className="ZapDurationPart__description">{intl.formatMessage(messages.description)}</p>

        <ZapDurationSelector
          isVesting={isVesting}
          selected={selectedDuration}
          setSelected={setSelectedDuration}
          setMultiplier={setMultiplier}
        />
      </div>

      <div className="ZapDurationPart__section">
        <BaseButton
          disabled={isButtonDisabled}
          action={continueHandler}
          text={intl.formatMessage(messages.button)}
          isArrowVisible
        />
      </div>

      <div className="ZapDurationPart__section">
        <div className="ZapDurationPart__section-divider" />
        <div className="ZapDurationPart__info-container">
          <p className="ZapDurationPart__description">
            {zapAssetSource === 'WALLET'
              ? intl.formatMessage(messages.assetUsedFromWallet, { asset: zapAsset })
              : intl.formatMessage(messages.assetBorrowed, { asset: zapAsset })}
            <span>
              <CompactNumber
                value={Number(zapAssetAmount)}
                maximumFractionDigits={5}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="ZapDurationPart__description">
            {isVesting
              ? intl.formatMessage(messages.assetUsedFromVests, { asset: 'RDNT' })
              : intl.formatMessage(messages.assetUsedFromWallet, { asset: 'RDNT' })}
            <span>
              <CompactNumber
                value={Number(rdntAmount)}
                maximumFractionDigits={5}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="ZapDurationPart__description">
            {intl.formatMessage(messages.slippageTolerance)}
            <span>
              <CompactNumber
                value={15}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
              %
            </span>
          </p>
          <p className="ZapDurationPart__description">
            {intl.formatMessage(messages.emissionsEligible)}
            {lockedValue + Number(zapAssetAmount) * zapAssetPrice >= requiredRdntToClaim ? (
              <span>YES</span>
            ) : (
              <span>NO</span>
            )}
          </p>
        </div>
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ZapDurationPart {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            width: 100%;
            height: 100%;

            &__section {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }

            &__section-divider {
              content: '';
              position: relative;
              width: 100%;
              height: 1px;
              margin-bottom: 8px;
              background: ${currentTheme.palette.token4.hex};
            }

            &__table {
              display: flex;
              flex-direction: row;
              flex: 1;
              background: ${currentTheme.palette.token1.hex};
              border-radius: 16px;
            }

            &__table-content {
              display: flex;
              flex-direction: column;
              padding: 16px;
              flex: 1;
              justify-content: center;
              align-items: center;

              &:nth-child(2) {
                border-left: 1px solid ${currentTheme.palette.token2.hex};
                border-right: 1px solid ${currentTheme.palette.token2.hex};
              }
            }

            &__table-label {
              font-size: 13px;
              color: ${currentTheme.text2.default.hex};
            }

            &__table-number {
              font-size: 22px;
              font-weight: $fontWeightSemiBold;
              color: ${currentTheme.text2.default.hex};

              &--annual-rewards {
                color: unset;
                background: var(
                  --gradient-1,
                  linear-gradient(222deg, #c800fa 0%, #5f00fa 51.01%, #4c00c7 100%)
                );
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            &__table-comparison {
              font-size: 13px;
              text-decoration: line-through;
              color: ${currentTheme.text2.default.hex};
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
