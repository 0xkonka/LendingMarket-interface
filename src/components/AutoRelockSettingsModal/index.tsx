import { useState, useCallback, useEffect } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import RadiantModal from 'components/basic/RadiantModal';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import TimeSelector from 'components/basic/TimeSelector';
import messages from './messages';

interface ModalPosition {
  x: number;
  y: number;
}

interface AutoRelockSettingsProps {
  setOpenAutoRelockModal: (openModal: boolean) => void;
  modalPosition?: ModalPosition;
  className?: string;
  onMainTxConfirmed?: () => void;
  onChangeValue: (value: string) => void;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function AutoRelockSettingsModal({
  setOpenAutoRelockModal,
  className,
  modalPosition,
  onMainTxConfirmed = () => {},
  onChangeValue,
}: AutoRelockSettingsProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lockDurations } = useMFDStats();
  const { defaultLockIndex } = useUserMFDStats();
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedDuration(defaultLockIndex);
  }, [defaultLockIndex]);

  const closeButtonHandler = useCallback(() => {
    setOpenAutoRelockModal(false);
  }, [setOpenAutoRelockModal]);

  return (
    <RadiantModal
      onBackdropPress={closeButtonHandler}
      isVisible={true}
      withCloseButton={true}
      className={classNames('AutoRelockModal', className)}
    >
      <div className="AutoRelockModal__title">{intl.formatMessage(messages.title)}</div>

      <div className="AutoRelockModal__relock">
        <p className="AutoRelockModal__subtitle">{intl.formatMessage(messages.subTitle)}</p>
        <p className="AutoRelockModal__description">
          {intl.formatMessage(messages.description, { duration: <b>12 months</b> })}
        </p>
        <TimeSelector
          values={lockDurations}
          selectedValue={selectedDuration}
          setSelectedValue={setSelectedDuration}
          onChangeHandler={onChangeValue}
        />
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AutoRelockModal {
            position: absolute !important;
            left: ${modalPosition?.x! - 340} !important;
            top: ${windowDimensions.height - 250 > modalPosition?.y!
              ? modalPosition?.y
              : modalPosition?.y! - 250} !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 340px;
            width: 100%;
            max-height: 250px;
            height: 100%;
            padding: 0px !important;

            &__title {
              padding: 18px 24px 12px 24px;
              width: 100%;
              font-weight: 600;
              font-size: 16px;
              line-height: 22px;
              border-bottom: 1px solid ${currentTheme.interface.divider};
            }

            &__relock {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              padding: 24px;
            }

            &__compound {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              padding: 24px;
            }

            &__subtitle {
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
            }

            &__description {
              font-weight: 400;
              font-size: 12px;
              line-height: 17px;
            }
          }
        `}
      </style>
    </RadiantModal>
  );
}
