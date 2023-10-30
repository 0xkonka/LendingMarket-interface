import { useState, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { LockZapContract } from 'libs/aave-protocol-js/LockZap/LockZapContract';
import NoWalletContent from 'components/NoWalletContent';
import CardWrapper from 'components/wrappers/CardWrapper';
import StatsInfoItem from 'components/StatsInfoItem';
import GradientButton from 'components/basic/GradientButton';
import OutlineButton from 'components/basic/OutlineButton';
import GradientLine from 'components/basic/GradientLine';
import ZapLPModal from 'components/ZapLPModal';
import { Table } from '../Table';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { getProvider } from 'helpers/config/markets-and-network-config';
import messages from './messages';
import ExitVestModal from 'components/ExitVestModal';
import ExitVestTableModal from 'components/ExitVestTableModal';

interface ContentItemVestingProps {
  penalty: BigNumber;
  staked: BigNumber;
  earned: BigNumber;
  earnedTable?: { amount: string; expiryDate: Date; unlockTime: string; penalty: string }[];
  setStatsRerender: (value: Number) => void;
}

export function ContentItemVesting({
  penalty,
  staked,
  earned,
  earnedTable,
  setStatsRerender,
}: ContentItemVestingProps) {
  const intl = useIntl();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { networkConfig } = useStaticPoolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { prices } = useRdntPrices();
  const { vestHandler } = useVestHandler();
  const { availableForVesting, refetch } = useRdntBalanceContext();
  const penaltyValue = intl.formatNumber(Number(penalty), {
    maximumFractionDigits: 2,
  });

  const [loadingAction, setLoadingAction] = useState<string>('');
  const [vestZapPairing, setVestZapPairing] = useState<string>('');
  const [openZapModal, setOpenZapModal] = useState<boolean>(false);
  const [openVestModal, setOpenVestModal] = useState<boolean>(false);
  const [openVestTableModal, setOpenVestTableModal] = useState<boolean>(false);
  const [unlockPenalty, setUnlockPenalty] = useState<string>('');
  const [unlockTime, setUnlockTime] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (earned && earned.toNumber() !== 0) {
        const lockZapService = new LockZapContract(
          getProvider(chainId),
          currentMarketData.addresses.lockZap
        );

        let requiredEth = await lockZapService.quote(earned.toString());
        setVestZapPairing(requiredEth);
      }
    })();
  }, [earned]);

  const withdrawVestHandler = useCallback(async () => {
    if (!user) {
      return null;
    }
    setOpenVestModal(false);
    setLoadingAction('withdraw');
    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const actionTx = await multiFeeDistributionService.withdraw(user.id, staked.toString());
    const approveTxData = {
      txType: actionTx[0].txType,
      unsignedData: actionTx[0].tx,
      gas: actionTx[0].gas,
    };

    await sendEthTransaction(approveTxData.unsignedData, provider, () => {}, null, {
      onConfirmation: () => {
        refetch();
        setStatsRerender(Math.random());
      },
    });
    setLoadingAction('');
  }, [
    user,
    chainId,
    currentMarketData,
    provider,
    staked,
    setLoadingAction,
    setStatsRerender,
    refetch,
  ]);

  const exitVestHandler = useCallback(async () => {
    if (!user) {
      return null;
    }
    setOpenVestModal(false);
    setLoadingAction('exitVest');

    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const actionTx = await multiFeeDistributionService.exit(user.id);
    await sendEthTransaction(actionTx, provider, () => {}, null, {
      onConfirmation: () => {
        refetch();
        setStatsRerender(Math.random());
      },
    });
    setLoadingAction('');
  }, [
    user,
    chainId,
    currentMarketData,
    provider,
    penalty,
    setLoadingAction,
    setStatsRerender,
    refetch,
  ]);

  const ieeHandler = useCallback(
    async (unlockTime: string, penalty: string) => {
      if (!user) {
        return null;
      }

      const multiFeeDistributionService = new MultiFeeDistributionService(
        getProvider(chainId),
        currentMarketData.addresses.rdntToken,
        currentMarketData.addresses.multiFeeDistribution
      );

      const actionTx = await multiFeeDistributionService.individualEarlyExit(user.id, unlockTime);
      sendEthTransaction(actionTx, provider, () => {}, null, {
        onConfirmation: () => {
          refetch();
          setStatsRerender(Math.random());
        },
      });
    },
    [user, chainId, currentMarketData, provider, penalty, setStatsRerender, refetch]
  );

  const vestButtonHandler = useCallback(
    async (event) => {
      setLoadingAction('startVesting');
      await vestHandler(event);
      setLoadingAction('');
      setStatsRerender(Math.random());
    },
    [vestHandler, setLoadingAction]
  );

  const vested = Number(staked) > 0 ? Number(staked) : 0;

  return (
    <CardWrapper
      header={<p>{intl.formatMessage(messages.vestingOverview)}</p>}
      size="small"
      className="ManageRadiantVesting"
    >
      {!user ? (
        <NoWalletContent padding={24} />
      ) : (
        <>
          <div className="ManageRadiantVesting__container">
            <div className="ManageRadiantVesting__info-container">
              <StatsInfoItem
                title={intl.formatMessage(messages.readyToVest)}
                value={Number(availableForVesting)}
                subValue={
                  prices.tokenPrice ? Number(availableForVesting) * prices.tokenPrice : undefined
                }
                tokenSymbol="RDNT"
              />

              <div className="ManageRadiantVesting__action-container">
                <GradientButton
                  fullWidth
                  size="small"
                  disabled={!Number(availableForVesting) || loadingAction === 'startVesting'}
                  onClick={vestButtonHandler}
                >
                  {intl.formatMessage(
                    loadingAction === 'startVesting'
                      ? messages.startVestingLoading
                      : messages.startVesting
                  )}
                </GradientButton>
                {/* <p className="ManageRadiantVesting__description">
                  Required dLP: <span>${requiredRdntToClaim.toLocaleString()}</span>
                </p> */}
              </div>
            </div>
            <p className="ManageRadiantVesting__introduction">
              {intl.formatMessage(messages.vestDescription)}
            </p>
          </div>

          <GradientLine size={1} />

          <div className="ManageRadiantVesting__container">
            <div className="ManageRadiantVesting__info-container">
              <StatsInfoItem
                title={intl.formatMessage(messages.currentlyVesting)}
                value={Number(earned)}
                subValue={prices.tokenPrice ? Number(earned) * prices.tokenPrice : undefined}
                tokenSymbol="RDNT"
              />

              <div className="ManageRadiantVesting__action-container">
                <GradientButton
                  fullWidth
                  size="small"
                  disabled={!Number(earned)}
                  onClick={() => setOpenZapModal(true)}
                >
                  {intl.formatMessage(messages.zapIntoDLP)}
                </GradientButton>
                <p className="ManageRadiantVesting__no-penalty">
                  {intl.formatMessage(messages.noExitPenalty)}
                </p>
                <p className="ManageRadiantVesting__description">
                  {intl.formatMessage(messages.pairWith)}:
                  <span>
                    {intl.formatNumber(Number(vestZapPairing), {
                      maximumFractionDigits: 5,
                      minimumFractionDigits: 2,
                    })}{' '}
                    {networkConfig.baseAsset}
                  </span>
                </p>
                <OutlineButton
                  fullWidth
                  size="small"
                  color="third"
                  onClick={setOpenVestModal}
                  disabled={!Number(earned) || loadingAction === 'exitVest'}
                >
                  {intl.formatMessage(
                    loadingAction === 'exitVest' ? messages.exiting : messages.exitEarly
                  )}
                </OutlineButton>
                <p className="ManageRadiantVesting__description">
                  {intl.formatMessage(messages.penalty)}:
                  <span>
                    {intl.formatNumber(Number(penalty), {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}{' '}
                    RDNT
                  </span>
                </p>
              </div>
            </div>
            <p className="ManageRadiantVesting__introduction">
              {intl.formatMessage(messages.penaltyDescription)}
            </p>
          </div>

          <GradientLine size={1} />

          <Table
            title={intl.formatMessage(messages.vests)}
            value={earned.toString()}
            table={earnedTable}
            setOpenModal={setOpenVestTableModal}
            setUnlockPenalty={setUnlockPenalty}
            setUnlockTime={setUnlockTime}
            onUnlockConfirmed={() => setStatsRerender(Math.random())}
          />

          <div className="ManageRadiantVesting__footer-container">
            <GradientLine size={1} />

            <div className="ManageRadiantVesting__container">
              <div className="ManageRadiantVesting__info-container">
                <StatsInfoItem
                  title={intl.formatMessage(messages.vested)}
                  value={vested}
                  subValue={prices.tokenPrice ? vested * prices.tokenPrice : undefined}
                  tokenSymbol="RDNT"
                />
                <div className="ManageRadiantVesting__action-container">
                  <OutlineButton
                    fullWidth
                    size="small"
                    color="third"
                    onClick={withdrawVestHandler}
                    disabled={vested === 0 || loadingAction === 'withdraw'}
                  >
                    {intl.formatMessage(
                      loadingAction === 'withdraw' ? messages.withdrawing : messages.withdraw
                    )}
                  </OutlineButton>
                </div>
              </div>
              <p className="ManageRadiantVesting__introduction">
                {intl.formatMessage(messages.withdrawDescription)}
              </p>
            </div>
          </div>

          {openZapModal && (
            <ZapLPModal
              isVestingState
              vesting={Number(earned)}
              setOpenModal={setOpenZapModal}
              onMainTxConfirmed={() => {
                setStatsRerender(Math.random());
              }}
            />
          )}

          {openVestModal && (
            <ExitVestModal
              isVisible={openVestModal}
              setOpenModal={setOpenVestModal}
              penaltyValue={penaltyValue}
              exitVestHandler={exitVestHandler}
            />
          )}

          {openVestTableModal && (
            <ExitVestTableModal
              isVisible={openVestTableModal}
              setOpenModal={setOpenVestTableModal}
              penaltyValue={unlockPenalty}
              unlocktime={unlockTime}
              ieeHandler={ieeHandler}
            />
          )}
        </>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantVesting {
            height: 100% !important;

            .CardWrapper__children {
              position: relative;
              display: flex;
              flex-direction: column;
              padding: 0;
              height: calc(100% - 54px);
            }

            &__introduction {
              font-size: 12px;
              color: ${currentTheme.text.offset2};
            }

            &__container {
              display: flex;
              flex-direction: column;
              width: 100%;
              padding: 24px;
              gap: 24px;
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

            &__no-penalty {
              text-align: center;
              font-size: 12px;
              color: ${currentTheme.brand.main};
              font-weight: 600;
              font-style: italic;
              margin-bottom: -5px;
              margin-top: -10px;
            }

            &__description {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: 'Inter';
              font-size: 12px;
              color: ${currentTheme.text.offset2};
              margin-bottom: 10px;

              & span {
                font-weight: 600;
              }
            }

            &__footer-container {
              position: absolute;
              bottom: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              width: 100%;
              @include respond-to(sm) {
                position: relative;
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}

export default ContentItemVesting;
