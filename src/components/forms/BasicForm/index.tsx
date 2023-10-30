import { FormEvent, ReactNode, SetStateAction, useState, Dispatch } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { ChainId } from '@radiantcapital/contract-helpers';
import { valueToBigNumber, EthereumTransactionTypeExtended } from '@aave/protocol-js';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import TxEstimation from 'components/TxEstimation';
import RiskBar, { Action } from 'components/basic/RiskBar';
import GradientButton from 'components/basic/GradientButton';
import AmountField from 'components/fields/AmountField';
import ConnectButton from 'components/ConnectButton';
import messages from './messages';

interface BasicFormProps {
  title?: string;
  description?: string | ReactNode;
  maxAmount?: string | number;
  action: Action;
  amountFieldTitle?: string;
  currencySymbol: string;
  onSubmit: (amount: string, max?: boolean) => void;
  withRiskBar?: boolean;
  submitButtonTitle?: string;
  absoluteMaximum?: boolean;
  className?: string;
  maxDecimals?: number;
  warning?: ReactNode;
  children?: ReactNode;
  getTransactionData?: (
    user: string
  ) => () => Promise<EthereumTransactionTypeExtended[]> | EthereumTransactionTypeExtended[];
  setFormAmount?: Dispatch<SetStateAction<string>>;
}

export default function BasicForm({
  title,
  description,
  maxAmount,
  action,
  amountFieldTitle,
  currencySymbol,
  onSubmit,
  withRiskBar,
  submitButtonTitle,
  absoluteMaximum,
  className,
  maxDecimals,
  warning,
  children,
  getTransactionData,
  setFormAmount,
}: BasicFormProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { chainId } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();

  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (maxAmount && newAmountValue.gt(maxAmount)) {
      setAmount(maxAmount as string);
      setFormAmount && setFormAmount(maxAmount as string);
      return setIsMaxSelected(true);
    } else if (newAmountValue.isNegative()) {
      setAmount('0');
      setFormAmount && setFormAmount('0');
      setIsMaxSelected(false);
    } else if (newAmount !== amount) {
      setAmount(newAmount);
      setFormAmount && setFormAmount(newAmount);
      setIsMaxSelected(false);
    }
  };

  const handleMaxButtonClick = () => {
    setAmount(maxAmount as string);
    setIsMaxSelected(true);
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueToBigNumber(amount).isNaN() && +amount !== 0) {
      return onSubmit(amount, absoluteMaximum && isMaxSelected);
    }

    setError(intl.formatMessage(messages.error));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('BasicForm', className)}>
      {!!title && <h2 className="BasicForm__title">{title}</h2>}

      {!!description && <p className="BasicForm__description">{description}</p>}

      <div className="BasicForm__inner">
        {children}

        <AmountField
          title={amountFieldTitle}
          maxAmount={maxAmount}
          symbol={currencySymbol}
          maxDecimals={maxDecimals}
          value={amount}
          onChange={handleAmountChange}
          onMaxButtonClick={handleMaxButtonClick}
          error={error}
        />

        {[ChainId.mainnet].includes(chainId) && getTransactionData && (
          <TxEstimation getTransactionsData={getTransactionData} amount={amount} />
        )}

        {withRiskBar && (
          <RiskBar
            value={Number(amount)}
            action={action}
            onChange={handleAmountChange}
            maxAmount={maxAmount as string}
            currencySymbol={currencySymbol}
          />
        )}

        {!!warning && <div className="BasicForm__warning">{warning}</div>}
      </div>

      {!currentAccount ? (
        <ConnectButton />
      ) : (
        <GradientButton type="submit" fullWidth>
          {submitButtonTitle || intl.formatMessage(messages.continue)}
        </GradientButton>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BasicForm {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: $maxFormWidth;
            width: 100%;

            &__title {
              font-size: 18px;
              font-weight: 600;
              color: ${currentTheme.text.main};
            }

            &__description {
              width: 100%;
              font-size: 12px;
              color: ${currentTheme.text.main};
              margin-bottom: 10px;
            }

            &__warning {
              text-align: center;
              width: 100%;
            }
          }
        `}
      </style>
    </form>
  );
}
