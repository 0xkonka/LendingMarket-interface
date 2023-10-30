import { Dispatch, SetStateAction, useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import RadiantModal from 'components/basic/RadiantModal';
import ContainedButton from 'components/basic/ContainedButton';
import WarningIcon from 'icons/Warning';
import messages from './messages';

interface ExitVestTableModalProps {
  isVisible: boolean;
  penaltyValue?: string;
  unlocktime: string;
  ieeHandler?: any;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function ExitVestTableModal({
  isVisible,
  penaltyValue,
  unlocktime,
  setOpenModal,
  ieeHandler,
}: ExitVestTableModalProps) {
  const intl = useIntl();
  const { isCurrentThemeDark } = useThemeContext();

  const closeButtonHandler = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleIee = (unlockTime: string, penaltyValue: string) => {
    ieeHandler(unlockTime, penaltyValue);
    setOpenModal(false);
  };

  return (
    <RadiantModal
      onBackdropPress={closeButtonHandler}
      isVisible={isVisible}
      withCloseButton={true}
      className={'ExitVestTableModal'}
    >
      <div className="ExitVestTableModal__warning">
        <WarningIcon />
      </div>
      <p className="ExitVestTableModal__title">{intl.formatMessage(messages.title)}</p>
      <p className="ExitVestTableModal__description">
        {intl.formatMessage(messages.description, { penalty: penaltyValue })}
      </p>

      <ContainedButton
        fullWidth
        onClick={() => {
          handleIee(unlocktime, penaltyValue ?? '0');
        }}
      >
        {intl.formatMessage(messages.ok)}
      </ContainedButton>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ExitVestTableModal {
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
            padding-top: 40px;
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
            padding-top: 30px;
          }
        }
      `}</style>
    </RadiantModal>
  );
}
