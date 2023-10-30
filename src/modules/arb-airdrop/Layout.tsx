import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useThemeContext } from 'aave-ui-kit';
import BaseCard from 'components/BaseCard';
import CheckEligibility from './flowSteps/CheckEligibility';
import Eligible from './flowSteps/Eligible';
import Ineligible from './flowSteps/Ineligible';
import AirdropStats from './components/AirdropStats';
import { ArbAirdropContract } from 'libs/aave-protocol-js/ArbAirdrop/ArbAirdropContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { ChainId, tEthereumAddress } from '@radiantcapital/contract-helpers';
import { BigNumber, BytesLike } from 'ethers';

export interface FlowStepSelectorProps {
  step?: number;
  setStep?: any;
  connectedAccount?: tEthereumAddress;
  arbAirdropContract?: ArbAirdropContract | undefined;
  userAirdropInfo?: { amount: BigNumber; proof: BytesLike[] } | undefined;
  setUserAirdropInfo?: any;
  setUserAlreadyClaimed?: any;
  userAlreadyClaimed?: boolean;
}

export enum FlowStep {
  CheckEligibility = 0,
  Eligible = 1,
  Ineligible = 2,
}

function FlowStepSelector({
  step,
  setStep,
  connectedAccount,
  arbAirdropContract,
  userAirdropInfo,
  setUserAirdropInfo,
  setUserAlreadyClaimed,
  userAlreadyClaimed,
}: FlowStepSelectorProps) {
  switch (step) {
    case FlowStep.CheckEligibility:
      return (
        <CheckEligibility
          setStep={setStep}
          connectedAccount={connectedAccount}
          arbAirdropContract={arbAirdropContract}
          setUserAirdropInfo={setUserAirdropInfo}
          setUserAlreadyClaimed={setUserAlreadyClaimed}
        />
      );
    case FlowStep.Eligible:
      return (
        <Eligible
          setStep={setStep}
          connectedAccount={connectedAccount}
          arbAirdropContract={arbAirdropContract}
          userAirdropInfo={userAirdropInfo}
          userAlreadyClaimed={userAlreadyClaimed}
        />
      );
    case FlowStep.Ineligible:
      return <Ineligible setStep={setStep} />;
    default:
      return (
        <CheckEligibility
          setStep={setStep}
          connectedAccount={connectedAccount}
          arbAirdropContract={arbAirdropContract}
          setUserAirdropInfo={setUserAirdropInfo}
          setUserAlreadyClaimed={setUserAlreadyClaimed}
        />
      );
  }
}

export default function Layout() {
  const history = useHistory();
  const location = useLocation();
  const { currentAccount } = useUserWalletDataContext();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const [arbAirdropContract, setArbAirdropContract] = useState<ArbAirdropContract | undefined>(
    undefined
  );
  const [userAirdropInfo, setUserAirdropInfo] = useState<
    { amount: BigNumber; proof: BytesLike[] } | undefined
  >(undefined);
  const [userAlreadyClaimed, setUserAlreadyClaimed] = useState<boolean>(false);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (currentMarketData.addresses.arbAirdrop !== undefined) {
      // Get airdrop contract, if deployed on this chain
      const arbAirdropContract = new ArbAirdropContract(
        getProvider(chainId),
        currentMarketData.addresses.arbAirdrop
      );
      setArbAirdropContract(arbAirdropContract);
    }
  }, [currentMarketData, chainId]);

  useEffect(() => {
    if (!!currentAccount || chainId !== ChainId.arbitrum_one) setStep(0);
  }, [currentAccount, history, location]);

  return (
    <>
      <div className="Layout">
        <div className="Layout__content">
          <BaseCard className="Layout__contentCard">
            <FlowStepSelector
              connectedAccount={currentAccount}
              step={step}
              setStep={setStep}
              arbAirdropContract={arbAirdropContract}
              setUserAirdropInfo={setUserAirdropInfo}
              userAirdropInfo={userAirdropInfo}
              setUserAlreadyClaimed={setUserAlreadyClaimed}
              userAlreadyClaimed={userAlreadyClaimed}
            />
          </BaseCard>
          <BaseCard>
            <AirdropStats />
          </BaseCard>
        </div>
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Layout {
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 32px;

            @include respond-to(xs) {
              padding: 16px;
            }

            &__content {
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 560px;
              gap: 16px;
            }

            &__contentCard {
              min-height: 548px;

              @include respond-to(sm) {
                min-height: 512px;
              }
            }
          }

          .FormContainer {
            gap: 32px;

            @include respond-to(xs) {
              gap: 16px;
            }
          }

          .FormContentContainer {
            display: flex;
            flex-direction: column;
            gap: 8px;

            @include respond-to(xs) {
              gap: 4px;
            }
          }

          .FormLabel {
            color: ${currentTheme.brand.main};
            font-weight: $fontWeightSemiBold;
            font-size: $fontSizeRegular;
            line-height: 135%;

            @include respond-to(xs) {
              font-size: $fontSizeMedium;
            }
          }

          .FormTitle {
            color: ${currentTheme.text.main};
            font-weight: $fontWeightSemiBold;
            font-size: $fontSizeXXLarge;
            line-height: 150%;

            @include respond-to(xs) {
              font-size: $fontSizeLarge;
            }
          }

          .FormDescription {
            color: ${currentTheme.text.main};
            font-weight: $fontWeightMedium;
            font-size: $fontSizeRegular;
            line-height: 135%;

            @include respond-to(xs) {
              font-size: $fontSizeMedium;
            }
          }

          .FormDescription > strong {
            color: inherit;
            font-weight: $fontWeightSemiBold;
          }

          .FormSectionTitle {
            color: ${currentTheme.text.main};
            font-weight: $fontWeightSemiBold;
            font-size: $fontSizeLarge;
            line-height: 150%;

            @include respond-to(xs) {
              font-size: $fontSizeRegular;
            }
          }

          .FormButtonsContainer {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            flex: 1;
            gap: 16px;
          }
        `}
      </style>
    </>
  );
}
