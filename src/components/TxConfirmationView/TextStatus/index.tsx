import { ChangeEvent } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from 'aave-ui-kit';
import { TxStatusType } from 'helpers/send-ethereum-tx';
import messages from './messages';
import ContainedButton from 'components/basic/ContainedButton';

interface TextStatusProps {
  txStatus?: TxStatusType;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  submitted?: boolean;
  numberOfSteps?: number;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
}

export default function TextStatus({
  txStatus,
  goToAfterSuccess = '/dashboard',
  successButtonTitle,
  submitted,
  numberOfSteps,
  onAfterSuccessClick = () => {},
}: TextStatusProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  let statusTitle: MessageDescriptor | undefined = undefined;
  if (txStatus === 'confirmed') {
    statusTitle = messages.confirmed;
  } else if (txStatus === 'error') {
    statusTitle = messages.failed;
  } else if (submitted) {
    statusTitle = messages.pending;
  }

  const step = (numberOfSteps || 1) + 1;

  return (
    <div className={classNames('TextStatus', `TextStatus__${txStatus}`)}>
      {statusTitle && (
        <p className="TextStatus__text">
          {txStatus === 'confirmed'
            ? `Step ${step} of ${step} ${intl.formatMessage(statusTitle)}`
            : intl.formatMessage(statusTitle)}
        </p>
      )}

      {txStatus === 'confirmed' && (
        <ContainedButton
          size="small"
          href={goToAfterSuccess}
          onClick={onAfterSuccessClick}
          className="TextStatus__button"
        >
          {successButtonTitle || intl.formatMessage(messages.dashboard)}
        </ContainedButton>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .TextStatus {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            color: ${currentTheme.brand.main};

            &__text {
              font-size: $fontSizeRegular;
              color: ${currentTheme.brand.main};
              font-weight: bold;
            }

            &__submitted {
              .TextStatus__text {
                color: ${currentTheme.brand.main};
              }
            }
            &__error {
              .TextStatus__text {
                color: ${currentTheme.text.negative};
              }
            }
            &__confirmed {
              .TextStatus__text {
                color: ${currentTheme.brand.main};
              }
            }
          }
        `}
      </style>
    </div>
  );
}
