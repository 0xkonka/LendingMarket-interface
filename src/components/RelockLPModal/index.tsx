import { useState, useCallback, useEffect } from 'react';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import RadiantModal from 'components/basic/RadiantModal';
import RelockConfirmPart from './RelockConfirmPart';
import RelockCongratulationPart from './RelockCongratulationPart';
import { MODAL_STEPS } from 'ui-config/relock-dlp';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';

interface RelockLPModalProps {
  setOpenModal: (openModal: boolean) => void;
  onMainTxConfirmed?: () => void;
}

export default function RelockLPModal({
  setOpenModal,
  onMainTxConfirmed = () => {},
}: RelockLPModalProps) {
  const { user } = useDynamicPoolDataContext();
  const { lpUnlockable } = useUserMFDStats();

  const [modalStep, setModalStep] = useState(MODAL_STEPS[0]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [amount, setAmount] = useState('0');

  useEffect(() => {
    if (!Number(amount)) {
      setAmount(lpUnlockable);
    }
  }, [lpUnlockable]);

  const closeButtonHandler = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const backButtonHandler = useCallback(() => {
    setIsConfirm(false);
  }, [setIsConfirm]);

  if (!user) {
    return null;
  }

  if (modalStep === MODAL_STEPS[1]) {
    return <RelockCongratulationPart amount={amount} onClose={closeButtonHandler} />;
  }

  return (
    <RadiantModal
      onBack={backButtonHandler}
      onBackdropPress={closeButtonHandler}
      isVisible={true}
      withBackButton={isConfirm}
      withCloseButton={true}
      className={'RelockLPModal'}
      title={modalStep}
    >
      {modalStep === MODAL_STEPS[0] && (
        <RelockConfirmPart
          isConfirm={isConfirm}
          setIsConfirm={setIsConfirm}
          amount={lpUnlockable}
          setModalStep={setModalStep}
          onMainTxConfirmed={onMainTxConfirmed}
        />
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RelockLPModal {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            max-width: 450px;
            width: 100%;
            max-height: 700px;
            height: 100%;
          }
        `}
      </style>
    </RadiantModal>
  );
}
