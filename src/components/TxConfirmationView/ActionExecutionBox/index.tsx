import { ChangeEvent, FormEvent } from 'react';
import { useIntl } from 'react-intl';

import { TxStatusType } from 'helpers/send-ethereum-tx';
import TxTopInfo from '../TxTopInfo';
import messages from '../messages';

export interface ActionExecutionBoxProps {
  txStatus?: TxStatusType;
  title: string;
  description?: string;
  buttonTitle?: string;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  loading?: boolean;
  failed?: string;
  error?: boolean;
  numberOfSteps?: number;
  mainTxFailedMessage?: string;
  exceptionTxFailedMessages?: { error: string; message: string }[];
  onSubmitTransaction: () => Promise<void>;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
  previousStep?: () => void;
  initTxn?: () => void;
}

export default function ActionExecutionBox({
  txStatus,
  title,
  description,
  buttonTitle,
  goToAfterSuccess,
  successButtonTitle,
  loading,
  failed,
  error,
  numberOfSteps,
  mainTxFailedMessage,
  exceptionTxFailedMessages,
  onSubmitTransaction,
  onAfterSuccessClick = () => {},
  previousStep = () => {},
  initTxn = () => {},
}: ActionExecutionBoxProps) {
  const intl = useIntl();

  const handleSubmitTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return onSubmitTransaction();
  };

  return (
    <form onSubmit={handleSubmitTransaction} className="ActionExecutionBox">
      <TxTopInfo
        txStatus={txStatus}
        title={title}
        description={
          !!failed ? intl.formatMessage(messages.txFailReason, { reason: failed }) : description
        }
        buttonTitle={buttonTitle}
        goToAfterSuccess={goToAfterSuccess}
        successButtonTitle={successButtonTitle}
        loading={loading}
        error={error}
        failed={failed}
        numberOfSteps={numberOfSteps}
        onAfterSuccessClick={onAfterSuccessClick}
        mainTxFailedMessage={mainTxFailedMessage}
        exceptionTxFailedMessages={exceptionTxFailedMessages}
        previousStep={() => previousStep()}
        initTxn={() => initTxn()}
      />
    </form>
  );
}
