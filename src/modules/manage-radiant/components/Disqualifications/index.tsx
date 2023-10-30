import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useThemeContext, textCenterEllipsis } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { getProvider } from 'helpers/config/markets-and-network-config';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import { BountyManagerContract } from 'libs/aave-protocol-js/BountyManager/BountyManagerContract';
import { TokenIcon } from 'helpers/config/assets-config';
import Value from 'components/basic/Value';
import ContainedButton from 'components/basic/ContainedButton';
import CardWrapper from 'components/wrappers/CardWrapper';
import { LoadingContentSpinner } from 'components/LoadingContentSpinner';
import NoWalletContent from 'components/NoWalletContent';
import BountyNotificationModal from 'components/BountyNotificationModal';
import ScanIcon from 'icons/Scan';
import messages from './messages';

interface DisqualificationsProps {
  statsRerender: Number;
  setStatsRerender: (value: Number) => void;
}

export function Disqualifications({ setStatsRerender }: DisqualificationsProps) {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { user } = useDynamicPoolDataContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { loading, bounties, minDLPBalance, isEligibleForBounty, fetchUserRankData } =
    useUserRank();

  const [liveBounties, setLiveBounties] = useState<{ address: string; bounty: number }[]>([]);
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const processBounty = useCallback(
    async (target: string) => {
      if (!user) {
        return null;
      }

      if (!isEligibleForBounty) {
        setErrorMessage('');
        setIsErrorModal(true);
        return null;
      }

      setLoadingAction('processBounty');
      try {
        const bountyManager = new BountyManagerContract(
          getProvider(chainId),
          currentMarketData.addresses
        );

        const quote = await bountyManager.quote(target);
        const lpTxGetter = await bountyManager.claim(
          user?.id,
          target,
          quote.bounty,
          quote.actionType
        );
        await sendEthTransaction(lpTxGetter, provider, (e) => {}, null, {
          onConfirmation: () => {
            setStatsRerender(Math.random());
          },
          onError: (e: any) => {
            setIsErrorModal(true);
            setErrorMessage(e?.error?.error.toString());
          },
        });
      } catch (error) {
        console.log('processBounty Error => ', error);
      }
      setLoadingAction('');
      setScanning(false);
    },
    [chainId, provider, currentMarketData, user, setStatsRerender, setLoadingAction]
  );

  const scan = useCallback(async () => {
    setScanProgress(0);
    setScanning(true);
    const handler = (e: any) => {
      setScanProgress(e.detail);
    };
    try {
      document.addEventListener('scan_update', handler);
      await fetchUserRankData(true);
    } finally {
      setScanning(false);
      document.removeEventListener('scan_update', handler);
    }
  }, [fetchUserRankData]);

  useEffect(() => {
    setLiveBounties(bounties);
  }, [bounties]);

  return (
    <CardWrapper
      header={<p>{intl.formatMessage(messages.bounties)}</p>}
      size="small"
      className="Disqualifications"
    >
      <BountyNotificationModal
        isVisible={isErrorModal}
        errorMessage={errorMessage}
        isEligibleForBounty={isEligibleForBounty}
        setOpenModal={setIsErrorModal}
      />
      <div className="Disqualifications__description">
        <p style={{ fontSize: '12px', color: '#475569' }}>
          {intl.formatMessage(messages.bountiesDescription, {
            balance: <strong>{minDLPBalance.toFixed(2)} dLP</strong>,
          })}
        </p>
        <br />
        <div className="row">
          <div className="col">
            {!loading && (
              <p className="text-[#475569]">
                {intl.formatMessage(messages.status)}:{' '}
                <span className={isEligibleForBounty ? 'text-green-600' : 'text-red-600'}>
                  <strong>
                    {intl.formatMessage(
                      isEligibleForBounty ? messages.eligible : messages.ineligible
                    )}
                  </strong>
                </span>
              </p>
            )}
          </div>
          <div className="col">
            <ContainedButton
              className="Disqualifications__ScanButton"
              color="fourth"
              fullWidth
              onClick={() => {
                scan();
              }}
              disabled={scanning || loading}
            >
              <ScanIcon
                isActive={scanning}
                color={isCurrentThemeDark ? 'white' : currentTheme.text.offset2}
              />
              {intl.formatMessage(scanning ? messages.scanning : messages.scanForBounties)}
              {scanning && (
                <p>
                  {intl.formatMessage(messages.progress)}: {scanProgress.toFixed(2)}%
                </p>
              )}
            </ContainedButton>
          </div>
        </div>
      </div>
      {!user ? (
        <NoWalletContent padding={24} />
      ) : loading || scanning ? (
        <LoadingContentSpinner />
      ) : (
        <div className="Disqualifications__tables">
          <div className="Disqualifications__tables__header">
            <div className="Disqualifications__items__user">
              {intl.formatMessage(messages.user)}
            </div>
            <div className="Disqualifications__items__bounty">
              {intl.formatMessage(messages.bounty)}
            </div>
          </div>
          <div className="Disqualifications__tables__content">
            {liveBounties
              .sort((a, b) => b['bounty'] - a['bounty'])
              .map((item, index) => {
                return (
                  <div className="Disqualifications__items__row" key={index}>
                    <div className="Disqualifications__items__address">
                      {textCenterEllipsis(item.address, 2, 4)}
                    </div>
                    <div className="Disqualifications__items__bounty">
                      <TokenIcon tokenSymbol={'rdnt'} height={20} width={20} />
                      <Value
                        value={item.bounty}
                        minimumValueDecimals={2}
                        maximumValueDecimals={2}
                        className="Disqualifications__amount"
                      />
                    </div>
                    <div className="Disqualifications__items__claim">
                      <ContainedButton
                        size="small"
                        color="fourth"
                        round
                        disabled={loadingAction === 'processBounty'}
                        onClick={() => processBounty(item.address)}
                      >
                        {intl.formatMessage(messages.claim)}
                      </ContainedButton>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Disqualifications {
            height: 100% !important;

            .row {
              display: flex;

              button {
                height: 30px;
                padding: 10px 15px;
                margin-left: 0px;
                margin-top: 5px;
              }
            }
            .col {
              display: flex;
              font-family: 'PP Mori';
              font-weight: 800;
              font-size: 12px;
              .Disqualifications__ScanButton {
                height: 35px;
                margin-top: 16px;
                font-family: 'PP Mori';
                font-style: normal;
                font-weight: 800;
                font-size: 12px;
                line-height: 17px;
              }
            }
            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0px;
            }

            &__description {
              font-size: 12px;
              padding: 15px 24px 24px 24px;
            }

            &__title {
              display: flex;
              align-items: center;
            }

            &__tables {
              display: flex;
              flex-direction: column;

              &__header {
                display: flex;
                border-bottom: 1px solid ${currentTheme.interface.divider};
                font-weight: 600;
                font-size: 12px;
                padding: 8px 22px;
                color: ${currentTheme.text.offset1};

                .Disqualifications__items__user {
                  flex-basis: 37%;
                }
              }

              &__content {
                padding: 7px 0;
                overflow-x: hidden;
                overflow-y: auto;
                max-height: 260px;
                font-family: 'Inter';

                /* width */
                &::-webkit-scrollbar {
                  width: 5px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                  box-shadow: inset 0 0 3px grey;
                  border-radius: 2px;
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                  background: #9199a5;
                  border-radius: 2px;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                  background: #787c83;
                }

                .Disqualifications__items {
                  &__row {
                    display: flex;
                    padding: 0 22px;
                    font-weight: 600;
                    font-size: 14px;
                    height: 43px;
                    color: ${currentTheme.text.offset2};
                  }

                  &__row:hover {
                    background-color: rgba(234, 239, 245, 0.25);
                  }

                  &__address {
                    flex-basis: 37%;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-family: 'Inter';
                    justify-content: flex-start;
                  }

                  &__bounty {
                    flex-basis: 37%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 4px;

                    .Value__value {
                      font-weight: 600;
                      font-size: 14px;
                      color: ${currentTheme.text.main};
                    }
                  }

                  &__claim {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .ContainedButton {
                      width: 84px;
                      height: 27px;
                    }
                  }
                }
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
