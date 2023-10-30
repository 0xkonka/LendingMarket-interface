import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import messages from './messages';
import { FlowStepSelectorProps } from '../Layout';
import { useThemeContext } from 'aave-ui-kit';
import Arrow from 'icons/Arrow';
import Arbitrum from 'icons/Arbitrum';
import Radiant from 'icons/Radiant';
import BaseButton from 'components/BaseButton';
import BaseLinkButton from 'components/BaseLinkButton';

interface AirdropEndedProps extends FlowStepSelectorProps {}

export default function AirdropEnded({ step, setStep }: AirdropEndedProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <>
      <div className="FormContainer AirdropEnded">
        <div className="AirdropEnded__banner">
          <div className="AirdropEnded__bannerContent">
            <div className="AirdropEnded__bannerContent--arbitrum">
              <Arbitrum
                className="AirdropEnded__bannerContent--arbitrum--logo"
                hasText
                textColor={currentTheme.text.main}
              />
            </div>
            <div className="AirdropEnded__bannerContentDivider"></div>
            <div className="AirdropEnded__bannerContent--radiant">
              <Radiant
                className="AirdropEnded__bannerContent--radiant--star"
                hasText={false}
                color={currentTheme.text.main}
              />
              <p>Radiant DAO Airdrop</p>
            </div>
          </div>
        </div>
        <div className="FormContentContainer AirdropEnded__contentContainer">
          <h5 className="FormLabel">{intl.formatMessage(messages.stepFinalLabel)}</h5>
          <h2 className="FormTitle">{intl.formatMessage(messages.stepFinalTitle)}</h2>
          <p className="FormDescription">{intl.formatMessage(messages.stepFinalDescription)}</p>
        </div>
        <div className="FormButtonsContainer AirdropEnded__buttonContainer">
          <BaseButton
            action={() =>
              window.open(
                'https://dao.radiant.capital/#/proposal/0x3ce311fafd8e5db5f8d055515eea17d3bc8c8312440e039effca885c0e9380da'
              )
            }
            text={intl.formatMessage(messages.stepFinalButton)}
            isArrowVisible={false}
            iconRight={<Arrow width={16} height={16} rotation="-45deg" color="#FFFFFF" />}
          ></BaseButton>
          <BaseLinkButton
            action={() => history.push('/markets')}
            text={intl.formatMessage(messages.stepFinalLink)}
          ></BaseLinkButton>
        </div>
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AirdropEnded {
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
