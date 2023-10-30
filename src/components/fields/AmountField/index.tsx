import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext } from 'aave-ui-kit';

import { TokenIcon } from 'helpers/config/assets-config';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import Preloader from 'components/basic/Preloader';
import NumberFormatBasicField from '../NumberFormatBasicField';
import messages from './messages';
import staticStyles from './style';
import { valueToBigNumber } from '@aave/protocol-js';

type AmountFieldProps = {
  symbol: string;
  value: string;
  onChange: (value: string) => void;
  onMaxButtonClick?: () => void;
  error?: string;
  title?: string;
  maxAmount?: number | string;
  minAmount?: number | string;
  className?: string;
  disabled?: boolean;
  isFocused?: boolean;
  placeholderMsgKey?: 'placeholder' | 'placeholderEth' | 'withdrawLimit';
  loading?: boolean;
  maxDecimals?: number;
  topDecimals?: number;
};

export default function AmountField({
  symbol,
  value,
  onChange,
  error,
  title,
  maxAmount = '',
  minAmount = '',
  className,
  disabled,
  loading,
  maxDecimals = 3,
  onMaxButtonClick,
  isFocused = false,
  placeholderMsgKey = 'placeholder',
  topDecimals,
}: AmountFieldProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const [onFocus, setFocus] = useState(isFocused);

  const blockInvalidChar = (event: React.KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const integerPart = (value.split('.')[0] || '').replace(/^0[0-9]/, '0');
  const decimalPart = (value.split('.')[1] || '').substring(0, maxDecimals);
  const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.05`);

  const inputHandler = (value: string) => {
    const newAmountValue = valueToBigNumber(value);

    if (minAmount && newAmountValue.lte(minAmount)) {
      onChange(minAmount as string);
      return;
    }

    if (maxAmount && newAmountValue.gt(maxAmount)) {
      onChange(maxAmount as string);
      return;
    }

    if (newAmountValue.isNegative()) {
      onChange('0');
      return;
    }

    onChange(value);
    return;
  };

  return (
    <div
      className={classNames(
        'AmountField',
        {
          AmountField__focus: onFocus,
          AmountField__error: error,
          AmountField__disabled: disabled || loading,
        },
        className
      )}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {title && (
        <Row className="AmountField__top-row" title={title}>
          {maxAmount && (
            <Value
              value={maxAmount}
              maximumValueDecimals={topDecimals ? topDecimals : 3}
              minimumValueDecimals={topDecimals}
              color="dark"
              symbol={symbol}
            />
          )}
        </Row>
      )}

      <div className="AmountField__wrapper">
        <TokenIcon tokenSymbol={symbol} width={25} height={25} />

        <NumberFormatBasicField
          value={formattedValue}
          onChange={inputHandler}
          isFocused={isFocused}
          placeholder={intl.formatMessage(messages[placeholderMsgKey])}
          min={0}
          type="number"
          step="any"
          className="AmountField__input"
          disabled={disabled || loading}
          onKeyDown={blockInvalidChar}
          data-cy={'amountInput'}
        />

        {maxAmount && !loading && !!onMaxButtonClick && (
          <div className="AmountField__right-inner">
            <button
              className="AmountField__maxButton"
              type="button"
              onClick={onMaxButtonClick}
              disabled={disabled}
              data-cy={'amountInput-maxBtn'}
            >
              {intl.formatMessage(messages.max)}
            </button>
          </div>
        )}

        {loading && <Preloader />}
      </div>

      <p className="AmountField__error-text">{error}</p>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AmountField {
          &__wrapper {
            background: ${isCurrentThemeDark
              ? currentTheme.background.footer
              : currentTheme.interface.mainTable};
            border: ${isCurrentThemeDark
              ? '1px solid #475167'
              : '1px solid ${currentTheme.text.offset4'};
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03), 0px 10px 40px rgba(0, 0, 0, 0.05),
              inset 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 2px 4px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
          }

          &:hover,
          &__focus,
          &__error {
            .AmountField__wrapper {
              background-color: ${background};
              font-family: 'Inter';
              font-size: 16px;
            }
          }

          &__error {
            .AmountField__wrapper {
              border: 1px solid ${currentTheme.red.hex};
            }
          }

          &__maxButton {
            color: ${isCurrentThemeDark ? currentTheme.brand.main : currentTheme.purple.hex};
          }

          &__error-text {
            color: ${currentTheme.red.hex};
          }

          &__disabled {
            &:hover {
              .AmountField__wrapper {
                background-color: transparent;
              }
            }
          }

          &__smallerThanMinSymbol {
            color: ${currentTheme.textDarkBlue.hex};
            margin-right: 3px;
          }
        }
      `}</style>
    </div>
  );
}
