import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import CompactNumber from 'components/basic/CompactNumber';
import MARKET_HEADER_BACKGROUND from 'images/background/congratulation-background.png';
import RadiantModal from 'components/basic/RadiantModal';
import ContainedButton from 'components/basic/ContainedButton';
import LoadingLogo from 'images/radiant/LoadingLogo';
import CheckIcon from 'icons/Check';
import messages from './messages';

interface ZapCongratulationPartProps {
  amount: string;
  nativeTokenPrice: number;
  selectedDuration: number;
  newLockingValue: number;
  onClose: () => void;
}

export default function ZapCongratulationPart({
  amount,
  nativeTokenPrice,
  selectedDuration,
  newLockingValue,
  onClose,
}: ZapCongratulationPartProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lockDurations } = useMFDStats();

  return (
    <RadiantModal isVisible={true} onBackdropPress={onClose} className={'ZapCongratulationPart'}>
      <div className="ZapCongratulationPart__logo-container">
        <LoadingLogo className="ZapCongratulationPart__logo" />
        <CheckIcon
          color={currentTheme.brand.main}
          width={50}
          height={50}
          className="ZapCongratulationPart__check"
        />
      </div>
      <p className="ZapCongratulationPart__title">{intl.formatMessage(messages.congratulations)}</p>
      <p className="ZapCongratulationPart__description">
        {intl.formatMessage(messages.description, {
          locked: (
            <span>
              $
              <CompactNumber
                value={newLockingValue}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </span>
          ),
          lockDuration: <span>{lockDurations[selectedDuration].lockDuration}</span>,
        })}
      </p>

      <ContainedButton fullWidth onClick={onClose}>
        {intl.formatMessage(messages.complete)}
      </ContainedButton>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ZapCongratulationPart {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            gap: 40px;
            max-width: 450px;
            width: 100%;
            max-height: 650px;
            height: 100%;
            background-image: url(${MARKET_HEADER_BACKGROUND});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: top center;

            &__logo-container {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 200px;
              height: 200px;
            }

            &__check {
              position: relative;
              z-index: 2;
            }

            &__logo {
              position: absolute;
              width: 200px;
              height: 200px;
              animation: rotation 2s infinite linear;
            }

            @keyframes rotation {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(359deg);
              }
            }
            &__title {
              font-weight: 600;
              font-size: 30px;
              color: ${currentTheme.text.main};
            }

            &__description {
              font-weight: 600;
              font-size: 18px;
              color: ${currentTheme.text.offset2};

              & span {
                color: ${currentTheme.brand.main};
              }
            }
          }
        `}
      </style>
    </RadiantModal>
  );
}
