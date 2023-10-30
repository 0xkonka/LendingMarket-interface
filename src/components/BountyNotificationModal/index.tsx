import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import RadiantModal from 'components/basic/RadiantModal';
import ContainedButton from 'components/basic/ContainedButton';
import WarningIcon from 'icons/Warning';
import messages from './messages';

interface BountyNotificationModalProps {
  setOpenModal: (openModal: boolean) => void;
  isVisible: boolean;
  errorMessage: string;
  isEligibleForBounty: boolean;
}

export default function BountyNotificationModal({
  setOpenModal,
  isVisible,
  errorMessage,
  isEligibleForBounty,
}: BountyNotificationModalProps) {
  const intl = useIntl();
  const { isCurrentThemeDark } = useThemeContext();

  const closeButtonHandler = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <RadiantModal
      onBackdropPress={closeButtonHandler}
      isVisible={isVisible}
      withCloseButton={true}
      className={'BountyNotificationModal'}
    >
      <div className="BountyNotificationModal__warning">
        <WarningIcon />
      </div>

      {errorMessage && (
        <div>
          <p className="BountyNotificationModal__title">
            {intl.formatMessage(messages.bountyContractError)}
          </p>
          <p className="BountyNotificationModal__description">{errorMessage}</p>
        </div>
      )}

      {!isEligibleForBounty && (
        <div>
          <p className="BountyNotificationModal__title">
            {intl.formatMessage(messages.notEligible)}
          </p>
          <p className="BountyNotificationModal__description">
            {intl.formatMessage(messages.notEligibleDescription)}
          </p>
        </div>
      )}

      <ContainedButton fullWidth onClick={closeButtonHandler}>
        {intl.formatMessage(messages.ok)}
      </ContainedButton>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .BountyNotificationModal {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: $maxFormWidth;
          min-width: 400px;
          height: 262px;
          padding: 1em;

          &__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 28px;
            padding-top: 20px;
            color: ${isCurrentThemeDark ? '#fff' : '#000000'};
          }

          &__description {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #6b6b6b;
            text-align: center;
            padding-top: 8px;
            padding-bottom: 32px;
          }

          &__warning {
            position: absolute;
            padding-top: 15px;
          }
        }
      `}</style>
    </RadiantModal>
  );
}
