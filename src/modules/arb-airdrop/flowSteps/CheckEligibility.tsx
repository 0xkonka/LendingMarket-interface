import { useIntl } from 'react-intl';
import { useState } from 'react';
import messages from './messages';
import { FlowStep, FlowStepSelectorProps } from '../Layout';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useThemeContext } from 'aave-ui-kit';
import { ChainId } from '@radiantcapital/contract-helpers';
import Arbitrum from 'icons/Arbitrum';
import Radiant from 'icons/Radiant';
import Wallet from 'icons/Wallet';
import BaseButton from 'components/BaseButton';
import BaseLinkButton from 'components/BaseLinkButton';
import { BigNumber } from 'ethers';
import switchNetwork from 'components/TxConfirmationView/NetworkMismatch/switchNetwork';
import { ADD_CONFIG } from 'components/TxConfirmationView/NetworkMismatch';
import { getNetworkConfig } from 'helpers/config/markets-and-network-config';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import axios from 'axios';

interface CheckEligibilityProps extends FlowStepSelectorProps {}

export default function CheckEligibility({
  step,
  setStep,
  connectedAccount,
  arbAirdropContract,
  setUserAirdropInfo,
  setUserAlreadyClaimed,
}: CheckEligibilityProps) {
  const intl = useIntl();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { chainId } = useProtocolDataContext();
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  const isArbitrumChain = chainId === ChainId.arbitrum_one;
  const config = ADD_CONFIG[ChainId.arbitrum_one];
  const { publicJsonRPCWSUrl, rpcUrl } = getNetworkConfig(ChainId.arbitrum_one);

  const canUserClaim = async () => {
    // Fetch users airdrop info

    const path = `${window.location.origin}/tree.json`;
    let treeD = await axios.get(path);
    const merkleTree = StandardMerkleTree.load(treeD.data);

    let userIndex = -1;
    let amount: BigNumber = BigNumber.from(0);
    let proof = [''];
    for (const [index, userTuple] of merkleTree.entries()) {
      const [address, amt] = userTuple;
      if (address.toLowerCase() === connectedAccount!.toLowerCase()) {
        userIndex = index;
        amount = BigNumber.from(amt);
        break;
      }
    }
    if (userIndex !== -1) {
      proof = merkleTree.getProof(userIndex);
    }
    const isEligible = amount && proof[0] !== '';
    if (isEligible) {
      setUserAirdropInfo({ amount, proof });
      const canClaim = arbAirdropContract
        ? await arbAirdropContract.canClaim(connectedAccount!, amount, proof)
        : false;

      setUserAlreadyClaimed(!canClaim);
      return canClaim || isEligible;
    } else {
      return false;
    }
  };

  async function revealEligibility() {
    setError('');
    setIsChecking(true);

    if (connectedAccount && arbAirdropContract) {
      try {
        const isEligible = await canUserClaim();
        setStep(isEligible ? FlowStep.Eligible : FlowStep.Ineligible);
      } catch (error) {
        setStep(FlowStep.Ineligible);
        setError('Something went wrong!');
        console.error(error);
      }
    } else {
      setIsChecking(false);
    }
  }

  return (
    <>
      <div className="FormContainer CheckEligibility">
        <div className="CheckEligibility__banner">
          <div className="CheckEligibility__bannerContent">
            <div className="CheckEligibility__bannerContent--arbitrum">
              <Arbitrum
                className="CheckEligibility__bannerContent--arbitrum--logo"
                hasText
                textColor={currentTheme.text.main}
              />
            </div>
            <div className="CheckEligibility__bannerContentDivider"></div>
            <div className="CheckEligibility__bannerContent--radiant">
              <Radiant
                className="CheckEligibility__bannerContent--radiant--star"
                hasText={false}
                color={currentTheme.text.main}
              />
              <p>Radiant DAO Airdrop</p>
            </div>
          </div>
        </div>
        <div className="FormContentContainer CheckEligibility__contentContainer">
          <h5 className="FormLabel">{intl.formatMessage(messages.step1Label)}</h5>
          <h2 className="FormTitle">{intl.formatMessage(messages.step1Title)}</h2>
          <p className="FormDescription">{intl.formatMessage(messages.step1Description)}</p>
        </div>
        <div className="FormButtonsContainer CheckEligibility__buttonContainer">
          {connectedAccount ? (
            <>
              {isArbitrumChain ? (
                <BaseButton
                  action={() => revealEligibility()}
                  isLoading={isChecking}
                  disabled={isChecking}
                  text={
                    isChecking
                      ? intl.formatMessage(messages.step1CheckingEligibilityButton)
                      : intl.formatMessage(messages.step1CheckEligibilityButton)
                  }
                  isArrowVisible={false}
                ></BaseButton>
              ) : (
                <BaseButton
                  action={() => {
                    switchNetwork({
                      neededChainId: ChainId.arbitrum_one,
                      chainName: config.name,
                      nativeCurrency: config.nativeCurrency,
                      rpcUrls: [...rpcUrl, publicJsonRPCWSUrl],
                      blockExplorerUrls: config.explorerUrls,
                    });
                  }}
                  text={intl.formatMessage(messages.step1SwitchChainsButton)}
                  isArrowVisible={false}
                ></BaseButton>
              )}
            </>
          ) : (
            <BaseButton
              action={() => showSelectWalletModal()}
              text={intl.formatMessage(messages.step1ConnectButton)}
              iconLeft={<Wallet width={18} height={18} />}
              isArrowVisible={false}
            ></BaseButton>
          )}
          <BaseLinkButton
            action={() =>
              window.open(
                'https://dao.radiant.capital/#/proposal/0x098762ed9d2d959596d642ea3180243fa7cb6ae7a85a58145e296c16d559351d'
              )
            }
            isArrowVisible
            text={intl.formatMessage(messages.step1RfpLink)}
          ></BaseLinkButton>
        </div>

        {error && <span className="Eligible__error">{error}</span>}
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .CheckEligibility {
            display: flex;
            flex-direction: column;
            flex: 1;

            &__error {
              color: ${currentTheme.text.negative};
            }

            &__banner {
              border-radius: $surfaceBorderRadius;
              width: 100%;
              height: 128px;
              overflow: hidden;
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
            &__bannerContent {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              background: ${isCurrentThemeDark ? `rgba(0,0,0,0.6)` : `rgba(255,255,255,0.6)`};
              backdrop-filter: blur(20px);
              padding: 32px 16px;
              gap: 16px;

              &--arbitrum {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                flex: 1;
              }

              &--radiant {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                font-weight: $fontWeightSemiBold;
                gap: 4px;
                flex: 1;
                color: ${currentTheme.text.main};

                p {
                  white-space: nowrap;
                }
              }

              @include respond-to(sm) {
                &--arbitrum {
                  &--logo {
                    max-width: 120px;
                  }
                }

                &--radiant {
                  &--star {
                    width: 24px;
                    height: 24px;
                  }
                  p {
                    font-size: $fontSizeMedium;
                  }
                }
              }

              @include respond-to(xs) {
                &--arbitrum {
                  &--logo {
                    max-width: 104px;
                  }
                }

                &--radiant {
                  &--star {
                    width: 16px;
                    height: 16px;
                  }
                  p {
                    font-size: $fontSizeSmall;
                  }
                }
              }
            }
            &__bannerContentDivider {
              content: '';
              position: relative;
              background: ${currentTheme.interface.mainTable};
              height: 100%;
              width: 1px;
            }
          }
        `}
      </style>
    </>
  );
}
