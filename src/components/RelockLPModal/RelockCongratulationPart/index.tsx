import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import CompactNumber from 'components/basic/CompactNumber';
import MARKET_HEADER_BACKGROUND from 'images/background/congratulation-background.png';
import RadiantModal from 'components/basic/RadiantModal';
import ContainedButton from 'components/basic/ContainedButton';
import LoadingLogo from 'images/radiant/LoadingLogo';
import CheckIcon from 'icons/Check';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import messages from './messages';

interface RelockCongratulationPartProps {
  amount: string;
  onClose: () => void;
}

export default function RelockCongratulationPart({
  amount,
  onClose,
}: RelockCongratulationPartProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lockDurations } = useMFDStats();
  const { defaultLockIndex } = useUserMFDStats();

  return (
    <RadiantModal isVisible={true} onBackdropPress={onClose} className={'RelockCongratulationPart'}>
      <div className="RelockCongratulationPart__logo-container">
        <LoadingLogo className="RelockCongratulationPart__logo" />
        <CheckIcon
          color={currentTheme.brand.main}
          width={50}
          height={50}
          className="RelockCongratulationPart__check"
        />
      </div>
      <p className="RelockCongratulationPart__title">{intl.formatMessage(messages.title)}</p>
      <p className="RelockCongratulationPart__description">
        {intl.formatMessage(messages.description, {
          token: (
            <span>
              <CompactNumber
                value={Number(amount)}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
              {' dLP'}
            </span>
          ),
          lock: <span>{lockDurations[defaultLockIndex].lockDuration}</span>,
        })}
      </p>

      <ContainedButton fullWidth onClick={onClose}>
        {intl.formatMessage(messages.complete)}
      </ContainedButton>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RelockCongratulationPart {
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
              font-size: 15px;
              font-weight: 600;
              max-width: 250px;
              text-align: center;
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
