import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useThemeContext } from 'aave-ui-kit';

import { assetsOrder } from 'ui-config/assets';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { isEmpty } from 'helpers/utility';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { TokenIcon } from 'helpers/config/assets-config';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import { useTokenPrices } from 'libs/aave-protocol-js/hooks/use-token-prices';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import GradientLine from 'components/basic/GradientLine';
import { LoadingContentSpinner } from 'components/LoadingContentSpinner';
import GradientButton from 'components/basic/GradientButton';
import OutlineButton from 'components/basic/OutlineButton';
import ToggleButton from 'components/basic/ToggleButton';
import CardWrapper from 'components/wrappers/CardWrapper';
import NoWalletContent from 'components/NoWalletContent';
import CompactNumber from 'components/basic/CompactNumber';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { CompounderService } from 'libs/aave-protocol-js/Compounder/CompounderService';
// import CompoundModal from 'components/CompoundModal';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import messages from './messages';

interface ClaimableRewardsTableProps {
  hideLockRdnt: boolean;
  statsRerender: Number;
  setStatsRerender: (value: Number) => void;
}
const compoundsPerYear = 365;

export function ClaimableRewardsTable({
  hideLockRdnt,
  statsRerender,
  setStatsRerender,
}: ClaimableRewardsTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { user } = useDynamicPoolDataContext();
  const { tokenPrices } = useTokenPrices();
  const { prices } = useRdntPrices();
  const { isEligible } = useVestHandler();
  const { lpLockingApr, lockDurations } = useMFDStats();
  const { minDLPBalance } = useUserRank();
  const { lpAutocompoundEnabled, defaultLockIndex, fetchUserMFDStatsData } = useUserMFDStats();
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [claimableRewards, setClaimableRewards] = useState<
    { symbol?: string; token: string; amount: number; usdVal: number }[]
  >([]);
  const [totalFees, setTotalFees] = useState<any>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [selfEligibleCompound, setSelfEligibleCompound] = useState<boolean>(false);
  // const [openCompoundModal, setOpenCompoundModal] = useState(false);

  useEffect(() => {
    if (!isEmpty(lockDurations)) {
      setMultiplier(lockDurations[defaultLockIndex].multiplier);
    }
  }, [defaultLockIndex, lockDurations]);

  const compoundAPR = useMemo(
    () => (1 + (lpLockingApr * multiplier) / compoundsPerYear) ** compoundsPerYear - 1,
    [lpLockingApr, lpAutocompoundEnabled, multiplier]
  );

  const queryClaimableRewards = useCallback(async () => {
    if (!user) {
      return null;
    }

    try {
      const multiFeeDistribution = new MultiFeeDistributionService(
        getProvider(chainId),
        currentMarketData.addresses.rdntToken,
        currentMarketData.addresses.multiFeeDistribution
      );

      const [_rewards] = await Promise.all([multiFeeDistribution.claimableRewards(user.id)]);

      const rewards: {
        symbol?: string;
        token: string;
        amount: number;
        usdVal: number;
      }[] = [];

      for (const tokenPrice of tokenPrices) {
        const rewardItem = _rewards.find(
          ({ token }) => token.toLowerCase() === tokenPrice.rToken.toLowerCase()
        );

        if (!isEmpty(rewardItem)) {
          const usdVal = (rewardItem?.amount || 0) * (tokenPrice?.price || 0);

          rewards.push({
            symbol: tokenPrice?.symbol,
            token: tokenPrice?.rToken,
            amount: rewardItem?.amount || 0,
            usdVal,
          });
        }
      }

      if (rewards.length === 0) {
        return;
      }

      let fees = 0;
      for (const reward of rewards) {
        fees += reward.usdVal;
      }

      rewards.sort(
        ({ symbol: a }, { symbol: b }) =>
          assetsOrder.indexOf((a || '').toUpperCase()) -
          assetsOrder.indexOf((b || '').toUpperCase())
      );

      setClaimableRewards(rewards);
      setTotalFees(fees);
    } catch (error) {
      console.log('queryClaimableRewards => error ', error);
    }
  }, [tokenPrices, isEligible]);

  const getSelfEligibleCompound = useCallback(async () => {
    const compounder = new CompounderService(getProvider(chainId), currentMarketData.addresses);
    const userId = user?.id;
    if (!userId) return;
    const selfEligibleCompoundValue = await compounder.selfEligibleCompound(userId);
    setSelfEligibleCompound(selfEligibleCompoundValue);
  }, [chainId, currentMarketData, user, minDLPBalance]);

  useEffect(() => {
    if (!isEmpty(tokenPrices)) {
      queryClaimableRewards();
    }
  }, [statsRerender, tokenPrices, isEligible]);

  useEffect(() => {
    // queryClaimableRewards();
    setInterval(queryClaimableRewards, POLLING_INTERVAL);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getSelfEligibleCompound();
  }, [getSelfEligibleCompound]);

  const claimFees = useCallback(async () => {
    if (!user) {
      return null;
    }

    setLoadingAction('claimAll');
    try {
      const lpMultiFeeDistribution = new MultiFeeDistributionService(
        getProvider(chainId),
        currentMarketData.addresses.stakingToken,
        currentMarketData.addresses.multiFeeDistribution
      );
      const txn = await lpMultiFeeDistribution.getReward(
        user.id,
        claimableRewards.map(({ token }) => token)
      );

      await sendEthTransaction(txn, provider, () => {}, null, {
        onConfirmation: () => {
          setStatsRerender(Math.random());
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingAction('');
  }, [
    chainId,
    provider,
    currentMarketData,
    user,
    claimableRewards,
    setStatsRerender,
    setLoadingAction,
  ]);

  const compoundRewards = useCallback(async () => {
    if (!user) {
      return null;
    }

    setLoadingAction('compoundRewards');
    try {
      const compounder = new CompounderService(getProvider(chainId), currentMarketData.addresses);
      const txn = await compounder.compound(user.id);

      await sendEthTransaction(txn, provider, () => {}, null, {
        onConfirmation: () => {
          setStatsRerender(Math.random());
        },
        onError: () => {
          // setOpenCompoundModal(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingAction('');
  }, [chainId, provider, currentMarketData, user, setStatsRerender, setLoadingAction]);

  const autocompoundButtonHandler = useCallback(async () => {
    if (!user) {
      return null;
    }

    const feeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const actionTx = await feeDistributionService.setAutocompound(!lpAutocompoundEnabled, user.id);
    return sendEthTransaction(actionTx, provider, () => {}, null, {
      onConfirmation: () => {
        fetchUserMFDStatsData();
        setStatsRerender(Math.random());
      },
    });
  }, [user, chainId, currentMarketData, provider, lpAutocompoundEnabled, setStatsRerender]);

  return (
    <CardWrapper
      header={<p>{intl.formatMessage(messages.platformRevenue)}</p>}
      className="ClaimableRewardsTable"
    >
      {!user ? (
        <NoWalletContent padding={50} />
      ) : (
        <>
          {claimableRewards.length === 0 ? (
            <LoadingContentSpinner />
          ) : (
            <div className="ClaimableRewardsTable__fees-container">
              <div className="ClaimableRewardsTable__fees-item-container">
                <p className="ClaimableRewardsTable__fees-label">
                  {intl.formatMessage(messages.asset)}
                </p>
                <p className="ClaimableRewardsTable__fees-label">
                  {intl.formatMessage(messages.claimableFees)}
                </p>
              </div>
              {claimableRewards.map((item) => (
                <div key={item.symbol} className="ClaimableRewardsTable__fees-item-container">
                  <TokenIcon
                    tokenSymbol={item.symbol || ''}
                    tokenFullName={item.symbol}
                    height={15}
                    width={15}
                    tooltipId={item.symbol}
                    className="ClaimableRewardsTable__token-icon"
                  />
                  <p className="ClaimableRewardsTable__fees-usd">
                    $
                    {intl.formatNumber(item.usdVal, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}

          <GradientLine size={1} />

          <div className="ClaimableRewardsTable__footer-container">
            <p className="ClaimableRewardsTable__total">
              {intl.formatMessage(messages.total)}
              <span>
                $
                {intl.formatNumber(totalFees, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </p>

            <div className="ClaimableRewardsTable__button-container">
              <div className="row">
                <div className="col">
                  <GradientButton
                    size="medium"
                    disabled={loadingAction === 'compoundRewards'}
                    onClick={compoundRewards}
                    className="ClaimableRewardsTable__button"
                  >
                    {loadingAction === 'compoundRewards'
                      ? intl.formatMessage(messages.compounding)
                      : intl.formatMessage(messages.compound, {
                          compoundAPR: (
                            <CompactNumber
                              value={compoundAPR * 100}
                              maximumFractionDigits={2}
                              minimumFractionDigits={2}
                              showFullNum={false}
                            />
                          ),
                        })}
                  </GradientButton>
                </div>
                <div className="col">
                  {!selfEligibleCompound && (
                    <div className="compoundErrorDetail">
                      {intl.formatMessage(messages.miniumCompound)}: $
                      {(minDLPBalance * (prices?.lpTokenPrice || 0)).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
              <OutlineButton
                size="medium"
                color="third"
                disabled={loadingAction === 'claimAll'}
                onClick={claimFees}
                className="ClaimableRewardsTable__button"
              >
                {intl.formatMessage(
                  loadingAction === 'claimAll' ? messages.claiming : messages.claim
                )}
              </OutlineButton>
            </div>

            <div className="ClaimableRewardsTable__auto-compound-container">
              <p className="ClaimableRewardsTable__auto-compound-label">
                {intl.formatMessage(messages.autoCompound)}
                <span>
                  {intl.formatMessage(messages.autoCompoundDescription1)} <br />
                  <i>{intl.formatMessage(messages.autoCompoundDescription2)}</i>
                </span>
              </p>

              <ToggleButton checked={lpAutocompoundEnabled} onChange={autocompoundButtonHandler} />
            </div>
          </div>
        </>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .row {
            display: flex;
            flex-direction: column;
            .col {
            }
          }
          .ClaimableRewardsTable__button-container {
            align-self: center;
          }
          .ClaimableRewardsTable__button {
            align-self: baseline;
          }
          .ClaimableRewardsTable__total {
            align-self: top;
          }
          .compoundErrorDetail {
            color: gray;
            font-size: 12px;
            text-align: center;
          }
          .ClaimableRewardsTable {
            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0;
            }

            &__errorMessage {
              color: red;
            }

            &__title {
              padding: 8px 24px;
              font-weight: 600;
              font-size: 18px;
              color: ${currentTheme.text.main};
            }

            &__fees-container {
              display: flex;
              align-items: center;
              flex-flow: wrap;
              gap: 50px;
              padding: 24px;
            }

            &__fees-item-container {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            &__fees-label {
              font-size: 12px;
              text-align: right;
              color: ${currentTheme.text.offset2};
            }

            &__fees-usd {
              font-family: 'Inter';
              font-weight: 600;
              font-size: 14px;
              color: ${currentTheme.text.main};
            }

            &__token-icon {
              b {
                font-size: 12px;
                color: ${currentTheme.text.main};
              }
            }

            &__footer-container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 24px;
              padding: 14px 24px;

              @include respond-to(md) {
                flex-direction: column;
                align-items: flex-start;
              }
            }

            &__total {
              display: flex;
              align-items: center;
              align-self: baseline !important;
              margin-top: 5px;
              gap: 18px;
              font-weight: 600;
              font-size: 12px;
              color: ${currentTheme.text.offset2};

              & span {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 30px;
                text-align: center;
                color: ${currentTheme.text.main};
              }
            }

            &__button-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 18px;

              @include respond-to(sm) {
                width: 100%;
                flex-direction: column;
              }
            }

            &__button {
              min-width: 193px;
              padding: 12px;

              @include respond-to(sm) {
                width: 100%;
              }
            }

            &__auto-compound-container {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 18px;
              padding-bottom: 10px;
            }

            &__auto-compound-label {
              display: flex;
              flex-direction: column;
              gap: 10px;
              font-weight: 600;
              font-size: 14px;
              line-height: 15px;
              color: ${currentTheme.text.main};
              max-width: 320px;

              .ToggleButton {
                margin-top: 30px;
              }

              & span {
                font-weight: 600;
                font-size: 11px;
                line-height: 13px;
                color: ${currentTheme.text.offset2};
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
