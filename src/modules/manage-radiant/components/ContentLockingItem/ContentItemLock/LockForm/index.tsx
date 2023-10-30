import { FormEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import Value from 'components/basic/Value';
import AmountField from 'components/fields/AmountField';
import GradientButton from 'components/basic/GradientButton';
import messages from './messages';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';

interface LockFormProps {
  maxAmount?: string | number;
  currencySymbol: string;
  walletBalance: BigNumber;
  lockPrice: number;
  lockingAprCalc: number;
  selectedDuration: number;
  setSelectedDuration: (value: number) => void;
  onSubmit: (amount: string, max?: boolean) => void;
  className?: string;
}

export default function LockForm({
  maxAmount,
  currencySymbol,
  walletBalance,
  lockingAprCalc,
  onSubmit,
  className,
}: LockFormProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { minDLPBalance } = useUserRank();
  const { prices } = useRdntPrices();

  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (maxAmount && newAmountValue.gt(maxAmount)) {
      setAmount(maxAmount as string);
      return setIsMaxSelected(true);
    } else if (newAmountValue.isNegative()) {
      setAmount('0');
      setIsMaxSelected(false);
    } else if (newAmount !== amount) {
      setAmount(newAmount);
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
      return onSubmit(amount, isMaxSelected);
    }

    setError(intl.formatMessage(messages.error));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('LockForm', className)}>
      <div className="LockForm__balance">
        <label className="LockForm__label">dLP token balance:</label>
        <Value
          className="LockForm__value"
          symbol={currencySymbol}
          value={walletBalance.toString()}
          tokenIcon={false}
          hideSuffix={true}
          maximumValueDecimals={2}
        />
      </div>

      <AmountField
        maxAmount={maxAmount}
        symbol={currencySymbol}
        value={amount}
        onChange={handleAmountChange}
        onMaxButtonClick={handleMaxButtonClick}
        error={error}
      />

      <div className="LockForm__apr">
        {/* TEMPORARILY HIDDEN UNTIL WE FIX CALCULATION: TASKED BY AARON */}
        {/* <label className="LockForm__label">Your current lock APR</label>
        <div className="LockForm__apr__value">
          <CompactNumber
            value={lockingAprCalc * 100}
            maximumFractionDigits={1}
            minimumFractionDigits={0}
            showFullNum={true}
          />
          % APR
        </div> */}
      </div>

      {parseFloat(amount) < minDLPBalance && (
        <div className="LockForm__error">
          Minimum stake amount: {minDLPBalance.toFixed(3)} dLP {`(`}$
          {(minDLPBalance * (prices?.lpTokenPrice || 0)).toFixed(2)}
          {`)`}
        </div>
      )}

      <GradientButton
        type="submit"
        fullWidth
        size="medium"
        disabled={parseFloat(amount) < minDLPBalance}
      >
        {intl.formatMessage(messages.continue)}
      </GradientButton>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .LockForm {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            &__error {
              color: red;
              margin-bottom: 15px;
            }

            &__balance {
              display: flex;
              justify-content: flex-start;
              width: 100%;
              margin-bottom: 8px;
            }

            &__apr {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin-top: 18px;
              margin-bottom: 24px;

              &__value {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                color: ${currentTheme.text.offset1};
              }
            }

            &__label {
              font-size: 13px;
              font-weight: 600;
              color: ${currentTheme.text.offset2};
            }

            &__value {
              text-align: right;
              padding-left: 4px;
              display: flex;
              justify-content: center;
              .Value__value {
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </form>
  );
}
