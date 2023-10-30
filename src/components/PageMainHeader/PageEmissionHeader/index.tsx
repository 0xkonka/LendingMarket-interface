import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import classNames from 'classnames';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useLoopApr } from 'libs/aave-protocol-js/hooks/use-loop-apr';
import ZapLPModal from 'components/ZapLPModal';
import RelockLPModal from 'components/RelockLPModal';
import LoadingSpinner from 'components/LoadingSpinner';
import CompactNumber from 'components/basic/CompactNumber';
import GradientButton from 'components/basic/GradientButton';
import ZapIcon from 'icons/Zap';
import RelockZapIcon from 'icons/RelockZap';
import RequalifyZapIcon from 'icons/RequalifyZap';
import EmissionStatusBar from 'components/basic/EmissionStatusBar';
import { isEmpty } from 'helpers/utility';
import OutlineButton from 'components/basic/OutlineButton';
import { useChainInfo } from 'libs/aave-protocol-js/hooks/use-chain-info';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import RelockZapHoverIcon from 'icons/RelockZapHover';

interface PageEmissionHeaderProps {
  onZapConfirmed?: () => void;
}

export default function PageEmissionHeader({ onZapConfirmed = () => {} }: PageEmissionHeaderProps) {
  const { user, reserves } = useDynamicPoolDataContext();
  const {
    isEligible,
    requiredRdntToClaim,
    lockedValue,
    lastEligibleTime,
    disqualifierTime,
    getVestData,
  } = useVestHandler();
  const { highLoopApr, fetchLoopData } = useLoopApr();
  const { chainTime } = useChainInfo();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { lpUnlockable, fetchUserMFDStatsData } = useUserMFDStats();
  const {
    prices: { lpTokenPrice = 0 },
  } = useRdntPrices();

  const [openZapModal, setOpenZapModal] = useState(false);
  const [openRelockModal, setOpenRelockModal] = useState(false);
  const [locksExpired, setLocksExpired] = useState(false);

  const lpMultiFeeDistribution = new MultiFeeDistributionService(
    getProvider(chainId),
    currentMarketData.addresses.stakingToken,
    currentMarketData.addresses.multiFeeDistribution
  );

  useEffect(() => {
    getVestData();
    const timeout = setInterval(getVestData, POLLING_INTERVAL);
    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    const now = new Date(chainTime).valueOf() / 1000;
    if (now !== 0 && lastEligibleTime !== 0) {
      const expired = now > lastEligibleTime;
      setLocksExpired(expired);
    }
  }, [chainTime, lastEligibleTime]);

  const zapConfirmation = () => {
    getVestData();
    fetchUserMFDStatsData();
    fetchLoopData();
    onZapConfirmed();
  };

  const requalify = useCallback(async () => {
    if (!user) {
      return null;
    }
    try {
      const txn = await lpMultiFeeDistribution.requalify(user.id);
      await sendEthTransaction(txn, provider, () => {}, null, {
        onConfirmation: () => {
          zapConfirmation();
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const awayPercent = requiredRdntToClaim > 0 ? lockedValue / requiredRdntToClaim : 0;

  let isZapStatus;
  if ((disqualifierTime !== 0 && isEligible) || locksExpired) {
    isZapStatus = false;
  } else {
    isZapStatus = true;
  }

  // const isZapStatus =
  // ((disqualifierTime === 0 || lockedValue < requiredRdntToClaim) && !locksExpired) || isEligible;

  const titleRender = () => {
    if (disqualifierTime !== 0 && isEligible) {
      return (
        <>
          <p className="PageEmissionHeader__boost PageEmissionHeader__boostExpired">
            Emissions DISQUALIFIED
          </p>
          <p className="PageEmissionHeader__apr dqTime">
            At {new Date(disqualifierTime * 1000).toLocaleString()}
          </p>
          <p className="PageEmissionHeader__apr dqed">
            Requalify your dLP to continue earning protocol fees and boosted emissions
          </p>
        </>
      );
    }
    if (isEligible) {
      return (
        <>
          {user?.totalLiquidityUSD !== '0' ? (
            <>
              <p className="PageEmissionHeader__boost PageEmissionHeader__boostActive">
                Emissions Active
              </p>
              <p className="PageEmissionHeader__apr">
                <b>Emissions active.</b> You can earn up to{' '}
                <span>
                  <CompactNumber
                    value={highLoopApr * 100}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                  %
                </span>{' '}
                <b>APR</b> on your $
                <CompactNumber
                  value={user?.totalLiquidityUSD || 0}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />{' '}
                in deposits
              </p>
            </>
          ) : (
            <>
              <p className="PageEmissionHeader__boost PageEmissionHeader__boostActive">
                Rewards Eligible
              </p>
              <p className="PageEmissionHeader__apr">
                <b>You could be earning up to </b>
                <span className="PageEmissionHeader__aprValue">
                  <CompactNumber
                    value={highLoopApr * 100}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                  %
                </span>{' '}
                <b>APR</b> on your deposits and borrows.
              </p>
            </>
          )}
        </>
      );
    } else {
      if (locksExpired) {
        return (
          <>
            <p className="PageEmissionHeader__boost PageEmissionHeader__boostExpired">
              LOCK EXPIRED
            </p>
            <p className="PageEmissionHeader__apr">
              Relock any expired dLP locks to continue earning protocol fees and boosted emissions
            </p>
          </>
        );
      }

      return (
        <>
          <p className="PageEmissionHeader__boost PageEmissionHeader__boostInActive">
            Emissions InActive
          </p>
          {disqualifierTime !== 0 && (
            <p className="PageEmissionHeader__apr dqTime">
              Disqualified at {new Date(disqualifierTime * 1000).toLocaleString()}
            </p>
          )}
          <p className="PageEmissionHeader__apr">
            You are <span>{((1 - awayPercent) * 100).toLocaleString()}%</span> away from activating
            up to{' '}
            <b className="PageEmissionHeader__aprValue">
              <CompactNumber
                value={highLoopApr * 100}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
              %
            </b>{' '}
            on your $
            <b className="PageEmissionHeader__aprValue">
              <CompactNumber
                value={user?.totalLiquidityUSD || 0}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />{' '}
            </b>
            in deposits
          </p>
        </>
      );
    }
  };

  return (
    <>
      <div className="PageEmissionHeader">
        <LoadingSpinner loading={isEmpty(user) || isEmpty(reserves)} />
        {openZapModal && (
          <ZapLPModal setOpenModal={setOpenZapModal} onMainTxConfirmed={zapConfirmation} />
        )}

        {openRelockModal && (
          <RelockLPModal setOpenModal={setOpenRelockModal} onMainTxConfirmed={zapConfirmation} />
        )}

        {titleRender()}

        <div className={classNames('PageEmissionHeader__container')}>
          <div className="PageEmissionHeader__info-container">
            <p className="PageEmissionHeader__description">dLP required to earn emissions</p>
            <p className="PageEmissionHeader__stats-value">
              $
              <CompactNumber
                value={lockedValue ? lockedValue : Number(lpUnlockable) * lpTokenPrice}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
              <span>
                {' / $'}
                <CompactNumber
                  value={requiredRdntToClaim}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />
              </span>
            </p>

            <EmissionStatusBar
              locked={isZapStatus ? lockedValue : Number(lpUnlockable) * lpTokenPrice}
              color={isZapStatus ? 'main' : 'disabled'}
              backgroundColor="rgba(255, 255, 255, 0.05)"
            />
          </div>

          {isZapStatus ? (
            <GradientButton
              className="PageEmissionHeader__button"
              onClick={() => setOpenZapModal(true)}
            >
              <ZapIcon width={30} height={30} color="#FFFFFF" /> Zap into dLP
            </GradientButton>
          ) : (
            <>
              {locksExpired ? (
                <OutlineButton
                  color="fifth"
                  className="PageEmissionHeader__button"
                  onClick={() => setOpenRelockModal(true)}
                >
                  <RelockZapIcon
                    className="PageEmissionHeader__button__relockzap"
                    width={20}
                    height={20}
                    color="#FFFFFF"
                  />
                  <RelockZapHoverIcon
                    className="PageEmissionHeader__button__relockzaphover"
                    width={20}
                    height={20}
                    color="#384454"
                  />
                  Relock dLP
                </OutlineButton>
              ) : (
                <OutlineButton
                  color="fifth"
                  className="PageEmissionHeader__button"
                  onClick={() => requalify()}
                >
                  <RequalifyZapIcon
                    className="PageEmissionHeader__button__relockzap"
                    width={20}
                    height={20}
                    color="#FFFFFF"
                  />
                  <RequalifyZapIcon
                    className="PageEmissionHeader__button__relockzaphover"
                    width={20}
                    height={20}
                    color="#384454"
                  />
                  Requalify dLP
                </OutlineButton>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .PageEmissionHeader {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: $maxDeskWidth;
            width: 100%;
            padding: 45px 24px;
            gap: 20px;
            z-index: 1;

            &__boost {
              font-family: 'Nunito';
              font-size: 35px;
              line-height: 1;
              text-transform: uppercase;
            }

            @include respond-to(xs) {
              &__boost {
                font-size: 30px;
              }
            }

            &__boostActive {
              color: #00ffaa;
              text-shadow: 0 0 20px #00ffaa;
            }

            &__boostInActive {
              color: #e10000;
            }

            &__boostExpired {
              color: #ff9500;
              text-shadow: 0 0 20px #ff9500;
            }

            &__apr {
              font-size: 15px;
              text-align: center;
              color: #ffffff;

              & span {
                font-weight: 600;
                color: #00ffaa;
              }

              &.dqTime {
                color: gray;
              }
            }

            &__aprValue {
              font-family: 'Inter';
            }

            &__container {
              position: relative;
              z-index: 1;
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              max-width: 620px;
              gap: 30px;
              padding: 16px;
              background: #181c1f;
              border: 0.65px solid #32383d;
              box-shadow: 0 0 30px rgba(255, 191, 217, 0.35);
              border-radius: 10px;
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 5px;
              width: 100%;
              max-width: 370px;
            }

            &__description {
              font-weight: 600;
              font-size: 12px;
              line-height: 1;
              color: #ffffff;
            }

            &__stats-value {
              font-family: 'Inter';
              font-weight: 600;
              font-size: 18px;
              color: #ffffff;

              & span {
                font-size: 10px;
                color: rgba(255, 255, 255, 0.6);
              }
            }

            &__button {
              width: 230px;
              padding: 15px;

              &__relockzaphover {
                display: none;
              }

              @include respond-to(sm) {
                width: 100%;
              }
            }

            &__button:hover {
              .PageEmissionHeader__button__relockzap {
                display: none;
              }

              .PageEmissionHeader__button__relockzaphover {
                display: block;
              }
            }

            &__playContainer {
              cursor: pointer;
              position: absolute;
              z-index: 2;
              bottom: 10px;
              right: 20px;
              display: flex;
              align-items: center;

              .PlayCircleHoverIcon {
                display: none;
              }
            }

            &__playContainer:hover {
              .PlayCircleIcon {
                display: none;
              }
              .PlayCircleHoverIcon {
                display: block;
              }
            }

            &__playDescription {
              font-weight: 600;
              font-size: 11px;
              text-align: center;
              color: #ffffff;
            }

            .dqed,
            .dqTime {
              margin-top: -15px;
            }
          }
        `}
      </style>
    </>
  );
}
