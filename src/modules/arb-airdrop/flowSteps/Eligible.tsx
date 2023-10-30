import messages from './messages';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { FlowStepSelectorProps } from '../Layout';
import { useThemeContext, textCenterEllipsis } from 'aave-ui-kit';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import BaseButton from 'components/BaseButton';
import CompactNumber from 'components/basic/CompactNumber';
import Arbitrum from 'icons/Arbitrum';
import ArbitrumPattern from 'images/ArbitrumPattern.svg';
import confetti from 'canvas-confetti';
import TxConfirmationView from '../../../components/TxConfirmationView';
import { ChainId } from '@radiantcapital/contract-helpers';

interface EligibleProps extends FlowStepSelectorProps {}

export default function Eligible({
  step,
  setStep,
  connectedAccount,
  arbAirdropContract,
  userAirdropInfo,
  userAlreadyClaimed,
}: EligibleProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();

  const { chainId } = useStaticPoolDataContext();
  const [isSuccess, setIsSuccess] = useState(userAlreadyClaimed);
  const [isFirstClaim, setIsFirstClaim] = useState(false);

  async function handleClaimTokens() {
    return await arbAirdropContract!.claim(
      connectedAccount!,
      userAirdropInfo!.amount,
      userAirdropInfo!.proof
    );
  }

  function claimingTxExecuted() {
    setIsFirstClaim(true);
    setIsSuccess(true);
    // const claimedDate = new Date().toLocaleDateString(intl.locale, {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // });
    // setFormattedClaimedDate(claimedDate);
  }

  useEffect(() => {
    if (isSuccess && isFirstClaim) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   const { amount } = getUserPendingAirdropAmount(connectedAccount);
  //   setTokenAmount(amount);
  // }, [connectedAccount]);

  return (
    <>
      <div className="FormContainer Eligible">
        <div className="FormContentContainer Eligible__contentContainer">
          <h5 className="FormLabel">
            {!isFirstClaim ? (
              <>{intl.formatMessage(messages.step2LabelB)}</>
            ) : (
              <>{intl.formatMessage(messages.step2LabelA)}</>
            )}
          </h5>
          <h2 className="FormTitle">
            {isSuccess ? (
              <>
                {!isFirstClaim ? (
                  <>{intl.formatMessage(messages.step2TitleC)}</>
                ) : (
                  <>{intl.formatMessage(messages.step2TitleB)}</>
                )}
              </>
            ) : (
              <>{intl.formatMessage(messages.step2TitleA)}</>
            )}
          </h2>
          <p className="FormDescription">
            {isSuccess ? (
              <>{intl.formatMessage(messages.step2DescriptionB)}</>
            ) : (
              <>{intl.formatMessage(messages.step2DescriptionA)}</>
            )}
          </p>
        </div>
        <div className="Eligible__airdropContainer">
          <div className="Eligible__airdropContainerContent">
            <div className="Eligible__airdropContainerContent--wallet FormDescription">
              <strong>{textCenterEllipsis(currentAccount, 4, 4)}</strong>
              {isSuccess ? (
                <>{intl.formatMessage(messages.step2WalletTextB)}</>
              ) : (
                <>{intl.formatMessage(messages.step2WalletTextA)}</>
              )}
            </div>
            <div className="Eligible__airdropContainerContent--tokenContainer">
              <img
                className="Eligible__arbitrumPattern Eligible__arbitrumPattern--left"
                src={ArbitrumPattern}
                alt="Arbitrum logo pattern"
              />
              <div className="Eligible__airdropContainerContent--tokens">
                <CompactNumber
                  value={ethers.utils.formatUnits(userAirdropInfo!.amount, 18)}
                  maximumFractionDigits={2}
                  minimumFractionDigits={2}
                  showFullNum={false}
                />
              </div>
              <Arbitrum hasText={false} />
              <img
                className="Eligible__arbitrumPattern Eligible__arbitrumPattern--right"
                src={ArbitrumPattern}
                alt="Arbitrum logo pattern"
              />
            </div>
          </div>
        </div>
        <div className="FormButtonsContainer Eligible__buttonContainer">
          {isSuccess ? (
            <BaseButton
              action={() => history.push('/markets')}
              text={intl.formatMessage(messages.step2CompleteButton)}
              isArrowVisible
            ></BaseButton>
          ) : (
            <>
              <TxConfirmationView
                mainTxName={intl.formatMessage(messages.step2ClaimButton)}
                boxTitle={intl.formatMessage(messages.step2ClaimButton)}
                mainTxType={'REWARD_ACTION'}
                getTransactionsData={handleClaimTokens}
                blockingError={''}
                mainTxFailedMessage={intl.formatMessage(messages.step2MainTxFailedText)}
                txChainId={chainId}
                allowedChainIds={[ChainId.arbitrum_one]}
                onMainTxConfirmed={claimingTxExecuted}
              />
            </>
          )}
        </div>
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Eligible {
            display: flex;
            flex-direction: column;
            flex: 1;

            &__error {
              color: ${currentTheme.text.negative};
            }

            &__airdropContainer {
              position: relative;
              padding: 16px;
              height: 100%;
              border: 1px solid ${currentTheme.interface.tableBorder};
              border-radius: $surfaceBorderRadius;
              overflow: hidden;
              max-height: 280px;
            }

            &__arbitrumPattern {
              position: absolute;
              top: 0;
              transform: scale(1.2);

              &--left {
                left: 0;
              }

              &--right {
                right: 0;
              }
            }

            &__airdropContainerContent {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              gap: 8px;

              &--wallet {
                display: flex;
                gap: 4px;
              }

              &--tokenContainer {
                display: flex;
                align-items: center;
                gap: 8px;
              }

              &--tokens {
                font-family: 'Inter';
                font-weight: $fontWeightMedium;
                font-size: 36px;
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </>
  );
}
