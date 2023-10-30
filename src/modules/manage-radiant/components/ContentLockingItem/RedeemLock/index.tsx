import { useCallback, useState } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import StatsInfoItem from 'components/StatsInfoItem';
import GradientButton from 'components/basic/GradientButton';
import OutlineButton from 'components/basic/OutlineButton';
import RelockLPModal from 'components/RelockLPModal';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { getProvider } from 'helpers/config/markets-and-network-config';
import AmountField from 'components/fields/AmountField';
import RelockZapIcon from 'icons/RelockZap';
import RelockZapHoverIcon from 'icons/RelockZapHover';
import WithdrawLPModal from 'components/WithdrawLPModal';
import AutoRelockModal from 'components/AutoRelockModal';
import messages from './messages';

interface RedeemLockProps {
  isLP: boolean;
  unlockable: BigNumber;
  setStatsRerender: (value: Number) => void;
}

export function RedeemLock({ isLP, unlockable, setStatsRerender }: RedeemLockProps) {
  const intl = useIntl();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { getVestData } = useVestHandler();
  const { lpRelockStatus } = useUserMFDStats();

  const [openRelockModal, setOpenRelockModal] = useState(false);
  const [openAutoRelockModal, setOpenAutoRelockModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [withdrawLimit, setWithdrawLimit] = useState('');

  const lockSymbol = isLP ? 'dLP' : 'RDNT';

  const inputHandler = useCallback(
    () => (value: string) => {
      setWithdrawLimit(value);
    },
    [setWithdrawLimit]
  );

  const onMainTxConfirm = useCallback(() => {
    getVestData();
    setStatsRerender(Math.random());
  }, [getVestData, setStatsRerender]);

  const unlockHandler = useCallback(async () => {
    if (!user) return;
    if (lpRelockStatus) {
      setOpenAutoRelockModal(true);
      return;
    }

    const feeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      isLP ? currentMarketData.addresses.stakingToken : currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const actionTx = await feeDistributionService.withdrawExpiredLocks(
      user.id,
      withdrawLimit ?? '0'
    );
    setOpenWithdrawModal(false);
    return sendEthTransaction(actionTx, provider, () => {}, null, {
      onConfirmation: onMainTxConfirm,
    });
  }, [
    user,
    chainId,
    currentMarketData,
    provider,
    isLP,
    onMainTxConfirm,
    withdrawLimit,
    lpRelockStatus,
  ]);

  if (!user) {
    return null;
  }

  return (
    <div className="ManageRadiantRedeemLock">
      {openRelockModal && (
        <RelockLPModal setOpenModal={setOpenRelockModal} onMainTxConfirmed={onMainTxConfirm} />
      )}

      <p className="ManageRadiantRedeemLock__label">
        {intl.formatMessage(messages.redeemableLocks)}
        <span>{intl.formatMessage(messages.relockDescription, { lockSymbol })}</span>
      </p>

      <div className="ManageRadiantRedeemLock__info-container">
        <StatsInfoItem value={Number(unlockable)} tokenSymbol={lockSymbol} />

        <div className="ManageRadiantRedeemLock__action-container">
          <GradientButton
            fullWidth
            size="small"
            disabled={!Number(unlockable)}
            className="ManageRadiantRedeemLock__button"
            onClick={() => {
              setOpenRelockModal(true);
            }}
          >
            <RelockZapIcon
              className="ManageRadiantRedeemLock__button__relockzap"
              width={15}
              height={15}
              color="#FFFFFF"
            />
            <RelockZapHoverIcon
              className="ManageRadiantRedeemLock__button__relockzaphover"
              width={15}
              height={15}
              color="#FFFFFF"
            />
            {intl.formatMessage(messages.relock)}
          </GradientButton>

          <OutlineButton
            fullWidth
            color="third"
            size="small"
            disabled={Number(unlockable) === 0}
            onClick={setOpenWithdrawModal}
            className="ManageRadiantRedeemLock__outlinebutton"
          >
            {intl.formatMessage(messages.withdraw)}
          </OutlineButton>
          {false && (
            <AmountField
              symbol={''}
              maxDecimals={0}
              value={withdrawLimit}
              onChange={inputHandler()}
              placeholderMsgKey={'withdrawLimit'}
            />
          )}

          {openWithdrawModal && (
            <WithdrawLPModal
              isVisible={openWithdrawModal}
              setOpenModal={setOpenWithdrawModal}
              unlockHandler={unlockHandler}
            />
          )}

          {openAutoRelockModal && (
            <AutoRelockModal
              isVisible={openAutoRelockModal}
              setOpenModal={setOpenAutoRelockModal}
            />
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantRedeemLock {
            display: flex;
            flex-direction: column;
            padding: 24px;
            gap: 24px;

            &__label {
              display: flex;
              flex-direction: column;
              gap: 12px;
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.text.main};

              & span {
                font-size: 12px;
                font-weight: normal;
                color: ${currentTheme.text.offset2};
              }
            }

            &__info-container {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }

            &__action-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
              width: 157px;
            }

            &__confirm-container {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            &__button:hover {
              .ManageRadiantRedeemLock__button__relockzap {
                display: none;
              }

              .ManageRadiantRedeemLock__button__relockzaphover {
                display: block;
              }
            }

            &__button__relockzap {
              display: block;
            }

            &__button__relockzaphover {
              display: none;
            }

            &__outlinebutton {
              color: ${currentTheme.text.main};
              border: 1px solid ${currentTheme.text.main};
            }
          }
        `}
      </style>
    </div>
  );
}

export default RedeemLock;
