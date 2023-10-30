import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import messages from './messages';
import { FlowStepSelectorProps } from '../Layout';
import { useThemeContext, textCenterEllipsis } from 'aave-ui-kit';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import BaseButton from 'components/BaseButton';
import BaseLinkButton from 'components/BaseLinkButton';
import Arbitrum from 'icons/Arbitrum';
import ArbitrumPattern from 'images/ArbitrumPattern.svg';

interface IneligibleProps extends FlowStepSelectorProps {}

export default function Ineligible({ step, setStep }: IneligibleProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();

  return (
    <>
      <div className="FormContainer Ineligible">
        <div className="FormContentContainer Ineligible__contentContainer">
          {/* <h5 className="FormLabel">{intl.formatMessage(messages.step3Label)}</h5> */}
          <h2 className="FormTitle">{intl.formatMessage(messages.step3Title)}</h2>
          <p className="FormDescription">{intl.formatMessage(messages.step3Description)}</p>
        </div>
        <div className="Ineligible__airdropContainer">
          <div className="Ineligible__airdropContainerContent">
            <div className="Ineligible__airdropContainerContent--wallet FormDescription">
              <strong>{textCenterEllipsis(currentAccount, 4, 4)}</strong>
              {intl.formatMessage(messages.step2WalletTextA)}
            </div>
            <div className="Ineligible__airdropContainerContent--tokenContainer">
              <img
                className="Ineligible__arbitrumPattern Ineligible__arbitrumPattern--left"
                src={ArbitrumPattern}
                alt="Arbitrum logo pattern"
              />
              <div className="Ineligible__airdropContainerContent--tokens">0.00</div>
              <Arbitrum hasText={false} />
              <img
                className="Ineligible__arbitrumPattern Ineligible__arbitrumPattern--right"
                src={ArbitrumPattern}
                alt="Arbitrum logo pattern"
              />
            </div>
          </div>
        </div>
        <div className="FormButtonsContainer Ineligible__buttonContainer">
          <BaseButton
            action={() => history.push('/manage')}
            text={intl.formatMessage(messages.step3CompleteButton)}
            isArrowVisible
          ></BaseButton>
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
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Ineligible {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 32px;

            @include respond-to(xs) {
              gap: 16px;
            }

            &__airdropContainer {
              position: relative;
              padding: 16px;
              height: 100%;
              border: 1px solid ${currentTheme.interface.tableBorder};
              border-radius: $surfaceBorderRadius;
              overflow: hidden;
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
