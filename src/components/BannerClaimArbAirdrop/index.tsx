import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'helpers/utility';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import messages from './messages';
import Close from 'icons/Close';
import Arbitrum from 'images/chains/arbitrum';
import Arrow from 'icons/Arrow';

interface BannerClaimArbAirdropProps {
  openZapModal: (arg0: boolean) => void;
}

export default function BannerClaimArbAirdrop({ openZapModal }: BannerClaimArbAirdropProps) {
  const { user, reserves } = useDynamicPoolDataContext();
  const intl = useIntl();
  const history = useHistory();

  const [isVisible, setIsVisible] = useState(() => {
    // Use function form of useState to read from localStorage only once, when the component mounts.
    const savedState = localStorage.getItem('BannerClaimArbAirdropVisible');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    // Every time isVisible changes, this will run and save its state to localStorage.
    localStorage.setItem('BannerClaimArbAirdropVisible', JSON.stringify(isVisible));
  }, [isVisible]);

  if (!isVisible) {
    // If isVisible is false, don't render anything.
    return null;
  }

  const openProposal = function () {
    window.open(
      'https://dao.radiant.capital/#/proposal/0x3ce311fafd8e5db5f8d055515eea17d3bc8c8312440e039effca885c0e9380da',
      '_blank'
    );
  };

  if (isEmpty(user) || isEmpty(reserves)) return null;

  return (
    <>
      <div className="BannerClaimArbAirdrop" onClick={() => history.push('/arb-airdrop')}>
        <div className="BannerClaimArbAirdrop__body">
          <div className="BannerClaimArbAirdrop__content">
            <div className="BannerClaimArbAirdrop__label">
              <small>{intl.formatMessage(messages.label)}</small>
              <div className="BannerClaimArbAirdrop__orb"></div>
            </div>
            <p className="BannerClaimArbAirdrop__title">{intl.formatMessage(messages.title)}</p>
            <div className="BannerClaimArbAirdrop__subtext">
              <p
                className="BannerClaimArbAirdrop__subtext__text"
                onClick={(e) => {
                  e.stopPropagation();
                  openProposal();
                }}
              >
                {intl.formatMessage(messages.subtext)}
              </p>
              <Arrow width={16} height={16} rotation="-45deg" color="#dfe7f3" />
            </div>
          </div>
          <div className="BannerClaimArbAirdrop__closeContainer">
            <div
              className="BannerClaimArbAirdrop__closeButton"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
            >
              <Close width={20} height={20}></Close>
            </div>
          </div>
        </div>
        <div className="BannerClaimArbAirdrop__background">
          <div className="BannerClaimArbAirdrop__backgroundForeground">
            <div className="BannerClaimArbAirdrop__arbitrumBadge BannerClaimArbAirdrop__arbitrumBadge__1">
              <Arbitrum />
            </div>
            <div className="BannerClaimArbAirdrop__arbitrumBadge BannerClaimArbAirdrop__arbitrumBadge__2">
              <Arbitrum />
            </div>
            <div className="BannerClaimArbAirdrop__arbitrumBadge BannerClaimArbAirdrop__arbitrumBadge__3">
              <Arbitrum />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BannerClaimArbAirdrop {
            border-radius: 16px;
            padding: 24px;
            background: rgba(21, 23, 24, 1);
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: $boxShadow;
            overflow: hidden;

            &:hover {
              transform: scale(1.005);
            }

            @include respond-to(sm) {
              padding: 24px 16px;
            }
            &__body {
              display: flex;
              flex-direction: row;
              z-index: 1;
              position: relative;
            }
            &__content {
              display: flex;
              flex-direction: column;
              flex: 1;
            }
            &__background {
              z-index: 0;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: radial-gradient(
                    29.6% 77.17% at -4.1% 50%,
                    rgba(3, 221, 173, 0.5) 0%,
                    rgba(255, 255, 255, 0) 100%
                  )
                  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
                radial-gradient(
                    43.88% 104.12% at 115.48% 35.07%,
                    rgba(82, 116, 242, 0.5) 0%,
                    rgba(255, 255, 255, 0) 100%
                  )
                  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
                radial-gradient(
                    75.88% 75.88% at 47.09% -3.92%,
                    rgba(8, 150, 253, 0.8) 0%,
                    rgba(255, 255, 255, 0) 100%
                  )
                  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
            }
            &__backgroundForeground {
              position: relative;
              width: 100%;
              height: 100%;
              background: rgba(21, 23, 24, 0.6);
            }
            &__arbitrumBadge {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              background: linear-gradient(180deg, #146091 0%, rgba(20, 96, 145, 0.4) 100%), #258bcd;
              box-shadow: 0px 0px 24px rgba(39, 117, 202, 0.5);
              padding: 3px;
              position: absolute;
              width: 36px;
              height: 36px;
              img {
                width: 100%;
                height: 100%;
              }
              &__1 {
                width: 32px;
                height: 32px;
                top: 8px;
                transform: translateY(-50%);
                right: 240px;
                @include respond-to(sm) {
                  top: -4px;
                  right: 80px;
                }
              }
              &__2 {
                width: 36px;
                height: 36px;
                top: 50%;
                transform: translateY(-50%) rotate(10deg);
                right: 160px;
                @include respond-to(sm) {
                  right: -24px;
                }
              }
              &__3 {
                width: 24px;
                height: 24px;
                bottom: -16px;
                transform: translateY(-50%) rotate(-15deg);
                right: 300px;
                @include respond-to(sm) {
                  bottom: -28px;
                  right: 56px;
                }
              }
            }
            &__closeContainer {
              display: flex;
              position: relative;
            }
            &__closeButton {
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              top: -8px;
              right: -8px;
              height: 36px;
              width: 36px;
              border-radius: 100%;
              background: rgba(21, 23, 24, 0.6);
              transition: background 0.3s ease;
              @include respond-to(sm) {
                top: -16px;
              }
            }
            &__closeButton:hover {
              background: rgba(21, 23, 24, 1);
            }
            &__label {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
            }
            &__label > small {
              font-size: 13px;
              font-weight: $fontWeightMedium;
              font-family: 'Inter';
              text-transform: uppercase;
              color: rgba(0, 255, 170, 1);
              margin-right: 4px;
            }
            &__title {
              color: white;
              font-size: 20px;
              font-weight: $fontWeightMedium;
              margin-bottom: 4px;
              @include respond-to(md) {
                max-width: 480px;
              }
              @include respond-to(sm) {
                font-size: 16px;
              }
            }
            &__subtext {
              display: flex;

              &__text {
                color: #dfe7f3;
                font-size: 14px;
                font-weight: $fontWeightMedium;
                margin-right: 2px;
              }
              &__text:hover {
                text-decoration: underline;
              }
            }

            &__orb {
              position: relative;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: rgba(0, 255, 170, 1);
              margin-left: 2px;
              animation: pulse 2s infinite;
            }

            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 0.6;
              }
              50% {
                transform: scale(1.3);
                opacity: 0.3;
              }
              100% {
                transform: scale(1);
                opacity: 0.6;
              }
            }
          }
        `}
      </style>
    </>
  );
}
