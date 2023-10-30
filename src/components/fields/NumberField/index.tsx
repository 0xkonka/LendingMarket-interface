import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext } from 'aave-ui-kit';

import Row from 'components/basic/Row';
import Preloader from 'components/basic/Preloader';
import NumberFormatBasicField from 'components/fields/NumberFormatBasicField';
import messages from './messages';
import staticStyles from './style';
import { useCallback } from 'react';

type NumberFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onMaxButtonClick?: () => void;
  error?: string;
  title?: string;
  minAmount?: number | string;
  maxAmount?: number | string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  maxDecimals?: number;
  topDecimals?: number;
};

export default function NumberField({
  value,
  onChange,
  error,
  title,
  minAmount = 0,
  maxAmount,
  className,
  disabled,
  loading,
  maxDecimals = 18,
  onMaxButtonClick,
  topDecimals,
}: NumberFieldProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const [onFocus, setFocus] = useState(false);

  const blockInvalidChar = (event: React.KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const background = rgba(`${currentTheme.textDarkBlue.rgb}, 0.05`);

  const onChangeHandler = useCallback(
    (value: string) => {
      const integerPart = (value.split('.')[0] || '').replace(/^0[0-9]/, '0');
      const decimalPart = (value.split('.')[1] || '').substring(0, maxDecimals);
      const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
      onChange(formattedValue);
    },
    [onChange]
  );

  return (
    <div
      className={classNames(
        'NumberField',
        {
          NumberField__focus: onFocus,
          NumberField__error: error,
          NumberField__disabled: disabled || loading,
        },
        className
      )}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {title && maxAmount && (
        <Row className="NumberField__top-row" title={title}>
          {`Range: ${minAmount} ~ ${maxAmount}`}
        </Row>
      )}

      <div className="NumberField__wrapper">
        <NumberFormatBasicField
          value={value}
          onChange={onChangeHandler}
          placeholder={intl.formatMessage(messages.placeholder)}
          min={0}
          type="number"
          step="any"
          className="NumberField__input"
          disabled={disabled || loading}
          onKeyDown={blockInvalidChar}
          data-cy={'amountInput'}
        />

        {maxAmount && !loading && !!onMaxButtonClick && (
          <div className="NumberField__right-inner">
            <button
              className="NumberField__maxButton"
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

      {error && <p className="NumberField__error-text">{error}</p>}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NumberField {
          &:hover,
          &__focus,
          &__error {
            .NumberField__wrapper {
              background-color: ${background};
            }
          }

          &__error {
            .NumberField__wrapper {
              border: 1px solid ${currentTheme.red.hex};
            }
          }

          &__maxButton {
            color: ${currentTheme.purple.hex};
          }

          &__error-text {
            color: ${currentTheme.red.hex};
          }

          &__disabled {
            &:hover {
              .NumberField__wrapper {
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
