import { useCallback, useEffect, useMemo, useState } from 'react';

import { MODAL_STEPS, SOURCE_OPTIONS } from 'ui-config/zap';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useTokenPrices } from 'libs/aave-protocol-js/hooks/use-token-prices';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import RadiantModal from 'components/basic/RadiantModal';
import ZapAmountPart from './ZapAmountPart';
import ZapDurationPart from './ZapDurationPart';
import ZapConfirmPart from './ZapConfirmPart';
import ZapCongratulationPart from './ZapCongratulationPart';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import { FeatureFlag, useFeatureFlag } from 'components/FeatureFlags';

interface ZapLPProps {
  isVestingState?: boolean;
  vesting?: number;
  setOpenModal: (openModal: boolean) => void;
  onMainTxConfirmed?: () => void;
}

export default function ZapLPModal({
  isVestingState = false,
  vesting = 0,
  setOpenModal,
  onMainTxConfirmed = () => {},
}: ZapLPProps) {
  const { networkConfig } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { tokenPrices } = useTokenPrices();
  const { lockedSupplyWithMultiplier, userLockedWithMultiplier } = useUserMFDStats();
  const { lockDurations, lpLastDayTotal } = useMFDStats();
  const { prices } = useRdntPrices();
  const { isEligible } = useVestHandler();
  const { getUserRewardsPerSecond } = useRdntLendingPoolRewards();

  const [modalStep, setModalStep] = useState(MODAL_STEPS[0]);
  const [zapAssetState, setZapAsset] = useState<string>(networkConfig.baseAsset);
  const [selectSource, setSelectSource] = useState(SOURCE_OPTIONS[0].value);
  // Temporarily forced to be Weth as it was before the asset selection changes
  // Should the old behaviour of using WETH be restored?
  // const zapAsset =
  //   selectSource === 'Borrow' ? networkConfig.baseAssetWrappedSymbol : networkConfig.baseAsset;
  const zapAssetSelectionEnabled = useFeatureFlag(FeatureFlag.MultiAssetZap);
  const zapAsset = zapAssetSelectionEnabled ? zapAssetState : networkConfig.baseAsset;
  const [amount, setAmount] = useState('');
  const [rdntAmount, setRdntAmount] = useState('0');
  const [newLockingValue, setNewLockingValue] = useState<number>(0);
  // Default lock duration as 12-months
  const [selectedDuration, setSelectedDuration] = useState<number>(lockDurations.length - 1);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isVesting, setIsVesting] = useState<boolean>(isVestingState);

  useEffect(() => {
    if (vesting > 0) {
      setRdntAmount(vesting.toString());
    }
  }, [vesting]);

  useEffect(() => {
    setSelectedDuration(lockDurations.length - 1);
    setMultiplier(lockDurations[lockDurations.length - 1].multiplier);
  }, [lockDurations]);

  const { zapAssetPrice, zapAssetDecimals } = useMemo(() => {
    const assetTokenPrice = tokenPrices.find((item) => item.symbol === zapAsset);
    return {
      zapAssetPrice: assetTokenPrice?.price || 0,
      zapAssetDecimals: assetTokenPrice?.decimals ?? 18,
    };
  }, [zapAsset, tokenPrices]);

  const userRewardsPerSecond = useMemo(() => {
    let userRewardsPerSecondValue = 0;
    user?.userReservesData.forEach((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

      if (!poolReserve) {
        throw new Error('data is inconsistent pool reserve is not available');
      }

      const assetRewardsPerSecond = getUserRewardsPerSecond(userReserve, poolReserve);
      userRewardsPerSecondValue += assetRewardsPerSecond;
    });

    return userRewardsPerSecondValue;
  }, [user, reserves]);

  const newLockAmount = prices?.lpTokenPrice ? (newLockingValue * 0.95) / prices?.lpTokenPrice : 0;
  const newUserLockWithMultiplier = newLockAmount * multiplier;
  const newUserShare =
    (userLockedWithMultiplier + newUserLockWithMultiplier) /
    (lockedSupplyWithMultiplier + newUserLockWithMultiplier);
  const oldUserShare = userLockedWithMultiplier / lockedSupplyWithMultiplier;

  const emissionReward =
    (isEligible
      ? prices.tokenPrice
        ? Number(userRewardsPerSecond * 86400) * prices.tokenPrice
        : 0
      : 0) * 365;

  const newAnnualRevenue = newUserShare * lpLastDayTotal * 365 + emissionReward;
  const oldAnnualRevenue = oldUserShare * lpLastDayTotal * 365 + emissionReward;

  const modalIndex = useMemo(
    () => MODAL_STEPS.findIndex((item) => item === modalStep),
    [modalStep]
  );

  const closeButtonHandler = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const backButtonHandler = useCallback(() => {
    if (modalIndex <= 0) {
      return;
    }

    if (isConfirm && modalIndex === 2) {
      setIsConfirm(false);
      return;
    }

    setModalStep(MODAL_STEPS[modalIndex - 1]);
  }, [isConfirm, modalIndex, setModalStep, setIsConfirm]);

  if (!user) {
    return null;
  }

  if (modalStep === MODAL_STEPS[3]) {
    return (
      <ZapCongratulationPart
        amount={amount}
        selectedDuration={selectedDuration}
        nativeTokenPrice={zapAssetPrice}
        newLockingValue={newLockingValue}
        onClose={closeButtonHandler}
      />
    );
  }

  return (
    <RadiantModal
      onBack={backButtonHandler}
      onBackdropPress={closeButtonHandler}
      isVisible={true}
      withBackButton={true}
      isBackButtonDisabled={modalIndex === 0}
      withCloseButton={true}
      className={'ZapLpModal'}
      title={modalStep}
    >
      {modalStep === MODAL_STEPS[0] && (
        <ZapAmountPart
          isVesting={isVesting}
          setIsVesting={setIsVesting}
          amount={amount}
          rdntAmount={rdntAmount}
          selectSource={selectSource}
          zapAssetPrice={zapAssetPrice}
          zapAssetDecimals={zapAssetDecimals}
          zapAsset={zapAsset}
          setAmount={setAmount}
          setRdntAmount={setRdntAmount}
          setSelectSource={setSelectSource}
          setModalStep={setModalStep}
          setNewLockingValue={setNewLockingValue}
          setZapAsset={setZapAsset}
        />
      )}

      {modalStep === MODAL_STEPS[1] && (
        <ZapDurationPart
          zapAssetPrice={zapAssetPrice}
          zapAssetDecimals={zapAssetDecimals}
          zapAssetSource={selectSource}
          zapAssetAmount={amount}
          zapAsset={zapAsset}
          rdntAmount={rdntAmount}
          isVesting={isVesting}
          newAnnualRevenue={newAnnualRevenue}
          oldAnnualRevenue={oldAnnualRevenue}
          selectedDuration={selectedDuration}
          newLockingValue={newLockingValue}
          setSelectedDuration={setSelectedDuration}
          setMultiplier={setMultiplier}
          setModalStep={setModalStep}
        />
      )}

      {modalStep === MODAL_STEPS[2] && (
        <ZapConfirmPart
          amount={amount}
          isVesting={isVesting}
          rdntAmount={rdntAmount}
          newAnnualRevenue={newAnnualRevenue}
          selectSource={selectSource}
          selectedDuration={selectedDuration}
          zapAsset={zapAsset}
          zapAssetPrice={zapAssetPrice}
          zapAssetDecimals={zapAssetDecimals}
          newLockingValue={newLockingValue}
          isConfirm={isConfirm}
          setIsConfirm={setIsConfirm}
          setModalStep={setModalStep}
          onMainTxConfirmed={onMainTxConfirmed}
        />
      )}

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ZapLpModal {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            max-width: 560px;
            width: 100%;
          }
        `}
      </style>
    </RadiantModal>
  );
}
