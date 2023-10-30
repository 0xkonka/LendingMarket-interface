import { useEffect, useState } from 'react';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useChainInfo } from 'libs/aave-protocol-js/hooks/use-chain-info';
import { useThemeContext } from 'aave-ui-kit';
import StatsInfoItem from 'components/StatsInfoItem';
import ZapLPModal from 'components/ZapLPModal';
import BuyRDNTModal from 'components/BuyRDNTModal';
import LoadingSpinner from 'components/LoadingSpinner';
import CompactNumber from 'components/basic/CompactNumber';
import ContainedButton from 'components/basic/ContainedButton';
import GradientButton from 'components/basic/GradientButton';
import ZapIcon from 'icons/Zap';
import StatusBar from 'components/basic/StatusBar';
import PlayCircleIcon from 'icons/PlayCircle';
import MARKET_HEADER_BACKGROUND from 'images/background/market-header.jpg';
import { isEmpty, humanize } from 'helpers/utility';

interface EmissionEligibilityHeaderProps {
  onZapConfirmed?: () => void;
}

export default function EmissionEligibilityHeader({
  onZapConfirmed = () => {},
}: EmissionEligibilityHeaderProps) {
  const { user, reserves } = useDynamicPoolDataContext();
  const { chainTime } = useChainInfo();
  const { currentTheme } = useThemeContext();
  const {
    isEligible,
    requiredRdntToClaim,
    lockedValue,
    lastEligibleTime,
    disqualifierTime,
    getVestData,
  } = useVestHandler();

  const [openZapModal, setOpenZapModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);

  useEffect(() => {
    getVestData();
  }, []);

  const awayPercent = 0.8;
  const lastEligibleTimeDate = new Date(lastEligibleTime * 1000);
  const disqualifierTimeDate = new Date(disqualifierTime * 1000);

  return (
    <div className="EmissionEligibilityHeader">
      <LoadingSpinner loading={isEmpty(user) || isEmpty(reserves)} />
      {openZapModal && (
        <ZapLPModal setOpenModal={setOpenZapModal} onMainTxConfirmed={onZapConfirmed} />
      )}
      {openBuyModal && <BuyRDNTModal setOpenModal={setOpenBuyModal} />}

      <div className="EmissionEligibilityHeader__container">
        <h3 className="EmissionEligibilityHeader__title">DYNAMIC LIQUIDITY PROVIDERS</h3>

        <p className="EmissionEligibilityHeader__apr">
          You are <span>{((1 - awayPercent) * 100).toLocaleString()}%</span> away from activating
          boosted APR
        </p>

        {isEligible ? (
          <p className="EmissionEligibilityHeader__boostActive">Emissions Active</p>
        ) : (
          <p className="EmissionEligibilityHeader__boostInActive">Emissions InActive</p>
        )}

        <p className="EmissionEligibilityHeader__description">
          Lock dLP to activate RDNT emissions.
        </p>

        <div className="EmissionEligibilityHeader__footerContainer">
          <div className="EmissionEligibilityHeader__infoCard">
            <p className="EmissionEligibilityHeader__infoCard-title">Your Locked dLP Value</p>
            <p className="EmissionEligibilityHeader__infoCard-value">
              $
              <CompactNumber
                value={lockedValue}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </p>
          </div>

          <div className="EmissionEligibilityHeader__buttonContainer">
            <ContainedButton
              color="fourth"
              className="EmissionEligibilityHeader__button"
              onClick={() => setOpenBuyModal(true)}
            >
              Buy RDNT
            </ContainedButton>
            <GradientButton
              className="EmissionEligibilityHeader__button"
              onClick={() => setOpenZapModal(true)}
            >
              <ZapIcon color={currentTheme.interface.mainTable} /> Mint dLP
            </GradientButton>
          </div>

          <div className="EmissionEligibilityHeader__infoCard">
            <p className="EmissionEligibilityHeader__infoCard-title">Required Locked LP</p>
            <p className="EmissionEligibilityHeader__infoCard-value-wrapper">
              $
              <CompactNumber
                value={requiredRdntToClaim}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </p>
          </div>
        </div>

        <div className="EmissionEligibilityHeader__playContainer">
          <PlayCircleIcon />
          <p className="EmissionEligibilityHeader__playDescription">Replay Intro</p>
        </div>

        {false && (
          <>
            <div className="EmissionEligibilityHeader__revenue-item">
              <StatsInfoItem
                title={`Deposits`}
                value={
                  user && Number(user?.totalLiquidityUSD) !== 0
                    ? Number(user?.totalLiquidityUSD)
                    : 0.0
                }
                dollarPrefix
                showFullNum
              />
            </div>

            <div className="EmissionEligibilityHeader__revenue-item">
              <StatsInfoItem title={`Eligible for Emissions`} />
              {isEligible ? (
                <>
                  <p className="eligible-emissions">Yes</p>
                  <p className="eligible-date">
                    Estimated For: {humanize(lastEligibleTimeDate, chainTime)}
                  </p>
                </>
              ) : (
                <>
                  <p className="eligible-emissions">No</p>
                  {lastEligibleTime !== 0 && (
                    <>
                      {disqualifierTime !== 0 ? (
                        <p className="eligible-date">
                          Disqualified: {humanize(disqualifierTimeDate, chainTime, true)} ago
                        </p>
                      ) : (
                        <p className="eligible-date">DQ PENDING: relock now!</p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      <StatusBar
        percent={Number(awayPercent * 100)}
        round={false}
        color={isEligible ? 'positive' : 'negative'}
      />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .EmissionEligibilityHeader {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            background-image: url(${MARKET_HEADER_BACKGROUND});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;

            &__container {
              display: flex;
              flex-direction: column;
              align-items: center;
              max-width: $maxDeskWidth;
              width: 100%;
              padding: 58px 24px;
            }

            &__title {
              font-weight: 700;
              font-size: 48px;
              text-align: center;
              color: #ffffff;
              margin-bottom: 8px;
            }

            &__boostActive {
              font-weight: 700;
              font-size: 20px;
              text-transform: uppercase;
              color: ${currentTheme.text.positive};
            }

            &__boostInActive {
              font-weight: 700;
              font-size: 20px;
              text-transform: uppercase;
              color: ${currentTheme.text.negative};
            }

            &__apr {
              font-weight: 700;
              font-size: 22px;
              line-height: 37px;
              text-align: center;
              color: #ffffff;
              margin: 4px 0;

              & span {
                color: ${currentTheme.brand.primary};
              }
            }

            &__description {
              font-style: italic;
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              color: #ffffff;
              margin-bottom: 20px;
            }

            &__footerContainer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              gap: 20px;

              @include respond-to(md) {
                flex-direction: column;
              }
            }

            &__infoCard {
              display: flex;
              flex-direction: column;
              background: #090c10;
              border: 1px solid #eaeff5;
              box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.03), 0px 10px 30px rgba(0, 0, 0, 0.03);
              border-radius: 10px;
              padding: 15px;
            }

            &__infoCard-title {
              font-weight: 600;
              font-size: 14px;
              color: #9199a5;
            }

            &__infoCard-value {
              font-weight: 700;
              font-size: 25px;
              color: #ffffff;
            }

            &__infoCard-value-wrapper {
              font-weight: 700;
              font-size: 25px;
              color: #ffffff;
              text-align: right;
            }

            &__buttonContainer {
              display: flex;
              align-items: center;
              gap: 14px;

              @include respond-to(sm) {
                flex-direction: column;
              }
            }

            &__button {
              width: 270px;
              padding: 20px;
              @include respond-to(sm) {
                width: 100%;
              }
            }

            &__playContainer {
              position: absolute;
              bottom: 20px;
              right: 30px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            &__playDescription {
              font-weight: 600;
              font-size: 12px;
              text-align: center;
              color: #ffffff;
            }

            &__revenue-item {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 100%;
              max-width: 300px;

              @include respond-to(sm) {
                margin-top: 20px;
                max-width: 100%;
              }
            }

            &__revenue-item-row {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .eligible-emissions {
              font-weight: bold;
              font-size: 34px;
              color: #ffffff;
            }

            .eligible-date {
              font-size: 16px;
              color: #ffffff;
            }
          }
        `}
      </style>
    </div>
  );
}
