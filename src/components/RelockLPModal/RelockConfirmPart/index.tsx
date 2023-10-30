import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { MODAL_STEPS } from 'ui-config/relock-dlp';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import CompactNumber from 'components/basic/CompactNumber';
import GradientLine from 'components/basic/GradientLine';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import GradientButton from 'components/basic/GradientButton';
import RelockZapIcon from 'icons/RelockZap';
import RelockZapHoverIcon from 'icons/RelockZapHover';
import { getProvider } from 'helpers/config/markets-and-network-config';
import messages from './messages';

interface RelockConfirmPartProps {
  amount: string;
  isConfirm: boolean;
  setIsConfirm: (isConfirm: boolean) => void;
  setModalStep: (step: string) => void;
  onMainTxConfirmed?: () => void;
}

export default function RelockConfirmPart({
  amount,
  isConfirm,
  setIsConfirm,
  setModalStep,
  onMainTxConfirmed = () => {},
}: RelockConfirmPartProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const { user } = useDynamicPoolDataContext();
  const { requiredRdntToClaim, getVestData } = useVestHandler();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { prices: { lpTokenPrice = 0 } = {}, fetchPrice } = useRdntPrices();

  const handleMainTxExecuted = () => {
    getVestData();
    fetchPrice();
    onMainTxConfirmed();
    setIsConfirm(false);
    setModalStep(MODAL_STEPS[1]);
  };

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const userId = user?.id || '';

    const feeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    return await feeDistributionService.relock(userId, currentMarketData.addresses.stakingToken);
  }, [user]);

  const continueHandler = useCallback(() => {
    setIsConfirm(true);
  }, [setIsConfirm]);

  return (
    <div className={'RelockConfirmPart'}>
      <div className="RelockConfirmPart__container">
        <p className="RelockConfirmPart__annual-revenue-value">
          $
          <CompactNumber
            value={Number(amount) * lpTokenPrice}
            maximumFractionDigits={2}
            minimumFractionDigits={0}
            showFullNum={false}
          />
        </p>
        <p className="RelockConfirmPart__annual-revenue-description">
          {intl.formatMessage(messages.redeemableLocks)}
        </p>
      </div>

      <div className="RelockConfirmPart__footer">
        <GradientLine size={1} />
        <div className="RelockConfirmPart__info-container">
          <p className="RelockConfirmPart__description">
            {intl.formatMessage(messages.totalDepositValue)}
            <span>
              $
              <CompactNumber
                value={Number(user?.totalLiquidityUSD)}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="RelockConfirmPart__description">
            {intl.formatMessage(messages.requiredValue)}
            <span>
              $
              <CompactNumber
                value={requiredRdntToClaim}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
          <p className="RelockConfirmPart__description">
            {intl.formatMessage(messages.relockValue)}
            <span>
              $
              <CompactNumber
                value={Number(amount) * lpTokenPrice}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          </p>
        </div>

        {isConfirm ? (
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.submit)}
            boxTitle={intl.formatMessage(messages.submit)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetTransactionsRefreshRewards}
            onMainTxExecuted={handleMainTxExecuted}
            successButtonTitle={intl.formatMessage(messages.goConfirm)}
            blockingError={''}
            mainTxFailedMessage={intl.formatMessage(messages.tryError)}
            goBack={() => setIsConfirm(false)}
          />
        ) : (
          <GradientButton fullWidth className="RelockConfirmPart__button" onClick={continueHandler}>
            <RelockZapIcon
              className="RelockConfirmPart__button__relockzap"
              width={20}
              height={20}
              color="#FFFFFF"
            />
            <RelockZapHoverIcon
              className="RelockConfirmPart__button__relockzaphover"
              width={20}
              height={20}
              color="#FFFFFF"
            />
            {intl.formatMessage(messages.submit)}
          </GradientButton>
        )}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RelockConfirmPart {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            width: 100%;
            height: 100%;

            &__container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              width: 100%;
              padding: 50px 0px;
            }

            &__annual-revenue-value {
              font-weight: 700;
              font-size: 54px;
              line-height: 1;
              background: ${currentTheme.gradient.main};
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }

            &__annual-revenue-description {
              font-weight: 600;
              font-size: 15px;
              color: ${currentTheme.text.offset2};
            }

            &__footer {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              width: 100%;
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
            }

            &__button:hover {
              .RelockConfirmPart__button__relockzap {
                display: none;
              }

              .RelockConfirmPart__button__relockzaphover {
                display: block;
              }
            }

            &__button__relockzap {
              display: block;
            }

            &__button__relockzaphover {
              display: none;
            }

            &__description {
              display: flex;
              justify-content: space-between;
              width: 100%;
              font-size: 13px;
              color: ${currentTheme.text.offset2};

              & span {
                font-size: 14px;
                font-weight: 700;
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </div>
  );
}
