import React, { ReactNode, ForwardedRef, RefObject } from 'react';
import classNames from 'classnames';
import { useThemeContext, SpinLoader } from 'aave-ui-kit';
import CompactNumber from 'components/basic/CompactNumber';
import { valueToBigNumber } from '@aave/protocol-js';
import NumberFormat from 'react-number-format';
import Wallet from 'icons/Wallet';
import SelectField from 'components/fields/SelectField';
import { TokenIcon } from 'aave-ui-kit';

type ZapAssetAmountFieldProps = {
  forwardedRef?: ForwardedRef<HTMLInputElement> | RefObject<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  onMaxButtonClick?: () => void;
  error?: boolean;
  maxAmount?: number | string;
  minAmount?: number | string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  maxDecimals?: number;
  topDecimals?: number;
  zapAssetSelected: string;
  zapAssetOptions?: { label: string; value: string }[];
  setZapAsset?: (zapAsset: string) => void;
  bottomLeftContent?: ReactNode;
  bottomRightContent?: ReactNode;
  onEdit?: () => void;
};

export default function ZapAssetAmountField({
  forwardedRef,
  value,
  onChange,
  error,
  maxAmount = '',
  minAmount = '',
  className,
  disabled,
  loading,
  maxDecimals = 3,
  onMaxButtonClick,
  topDecimals,
  zapAssetSelected,
  zapAssetOptions,
  setZapAsset,
  bottomLeftContent,
  bottomRightContent,
  placeholder,
  onEdit,
}: ZapAssetAmountFieldProps) {
  const { currentTheme } = useThemeContext();

  const blockInvalidChar = (event: React.KeyboardEvent<HTMLInputElement>) =>
    ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const integerPart = (value.split('.')[0] || '').replace(/^0[0-9]/, '0');
  const decimalPart = (value.split('.')[1] || '').substring(0, maxDecimals);
  const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  const inputHandler = (value: string) => {
    const newAmountValue = valueToBigNumber(value);

    if (minAmount && newAmountValue.lte(minAmount)) {
      onChange(minAmount as string);
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
        'ZapAssetAmountField',
        {
          ZapAssetAmountField__error: error,
          ZapAssetAmountField__disabled: disabled || loading,
        },
        className
      )}
    >
      <div className="ZapAssetAmountField__row">
        {loading && (
          <div className="ZapAssetAmountField__loading">
            <SpinLoader
              className="ZapAssetAmountField__SpinLoader"
              color={currentTheme.text2.subdued.hex}
            />
          </div>
        )}

        <div
          onClick={() => {
            if (disabled && onEdit) onEdit();
          }}
          className="ZapAssetAmountField__input-container"
        >
          <NumberFormat
            className="ZapAssetAmountField__input"
            value={formattedValue}
            onValueChange={(values) => inputHandler(values.value)}
            onKeyDown={blockInvalidChar}
            getInputRef={forwardedRef}
            min={0}
            disabled={disabled || loading}
            thousandSeparator
            allowNegative={false}
            decimalScale={18}
            placeholder={placeholder || '0.0'}
            data-cy={'amountInput'}
          />
        </div>

        {zapAssetOptions && setZapAsset ? (
          <SelectField
            disabled={disabled || loading}
            icon={<TokenIcon tokenSymbol={zapAssetSelected} width={16} height={16} />}
            className="ZapAssetAmountField__select-field"
            value={zapAssetSelected}
          >
            {zapAssetOptions.map((option) => (
              <button
                className={classNames(
                  'ZapAssetAmountField__select-option',
                  option.value === zapAssetSelected &&
                    'ZapAssetAmountField__select-option--disabled'
                )}
                onClick={() => {
                  setZapAsset(option.value);
                  if (forwardedRef && 'current' in forwardedRef) forwardedRef.current?.focus();
                }}
                key={option.value}
                disabled={option.value === zapAssetSelected}
                type="button"
              >
                <TokenIcon tokenSymbol={option.label} width={16} height={16} />
                <span>{option.label}</span>
              </button>
            ))}
          </SelectField>
        ) : (
          <div className="ZapAssetAmountField__single-asset">
            <TokenIcon
              className="ZapAssetAmountField__single-asset-icon"
              tokenSymbol={zapAssetSelected}
              width={16}
              height={16}
            />
            <p>{zapAssetSelected}</p>
          </div>
        )}
      </div>
      <div className="ZapAssetAmountField__row">
        {bottomLeftContent && (
          <div className="ZapAssetAmountField__bottom-left-content">{bottomLeftContent}</div>
        )}

        {bottomRightContent ? (
          <div className="ZapAssetAmountField__bottom-right-content">{bottomRightContent}</div>
        ) : (
          <>
            {maxAmount && (
              <span
                className="ZapAssetAmountField__max-amount"
                onClick={() => {
                  if (onMaxButtonClick) onMaxButtonClick();
                }}
              >
                <CompactNumber
                  value={maxAmount}
                  maximumFractionDigits={topDecimals || 5}
                  minimumFractionDigits={topDecimals || 0}
                  showFullNum={false}
                />
                <Wallet color={currentTheme.accent.default.hex} width={16} height={16} />
              </span>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ZapAssetAmountField {
          display: flex;
          flex-direction: column;
          border: 1px solid ${currentTheme.palette.token4.hex};
          border-radius: 12px;
          padding: 16px;
          gap: 16px;
          background: ${currentTheme.palette.token2.hex};

          &__select-option {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 8px 16px;
            gap: 8px;
            background: ${currentTheme.palette.token2.hex};
            font-size: 14px;
            font-weight: $fontWeightMedium;

            span {
              color: ${currentTheme.text2.default.hex};
            }

            &:hover {
              background: ${currentTheme.palette.token1.hex};
            }

            &--disabled span {
              color: ${currentTheme.text2.subdued.hex};
            }
          }

          &__error {
            border: 1px solid ${currentTheme.states.negative.hex};
          }

          &__loading {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 44px;
            height: 44px;
          }

          &__SpinLoader {
            position: relative;
            top: 2px;
            left: 2px;
          }

          &__disabled {
            background: ${currentTheme.palette.token1.hex};
          }

          &__disabled &__input {
            color: ${currentTheme.text2.subdued.hex};
            transition: ease 0.2s;
            cursor: pointer;

            &:hover {
              color: ${currentTheme.text2.default.hex};
            }
          }

          &__single-asset {
            display: flex;
            align-items: center;
            color: ${currentTheme.text2.default.hex};
            font-family: 'Inter';
            font-weight: 500;
            font-size: 14px;
            line-height: 1;
            gap: 8px;
            min-height: 40px;
          }

          &__single-asset-icon {
            position: relative;
            border-radius: 100%;
            background: ${currentTheme.palette.token2.hex};
          }

          &__row {
            display: flex;
            flex-direction: row;
            flex: 1;
            min-height: 32px;
            gap: 8px;
          }

          &__input-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex: 1;
            min-width: 0;
          }

          &__input {
            font-weight: $fontWeightSemiBold;
            font-size: 24px;
            border: unset;
            color: ${currentTheme.text2.default.hex};
            background: unset;
            min-width: 0;
            width: 100%;
          }

          &__input::placeholder {
            color: ${currentTheme.text2.subdued.hex};
          }

          &__max-amount {
            display: flex;
            align-items: center;
            font-weight: $fontWeightSemiBold;
            font-size: 16px;
            gap: 4px;
            color: ${currentTheme.accent.default.hex};
            cursor: pointer;
            margin-left: auto;
          }

          &__select-field .SelectField__select {
            min-width: 132px;
          }

          &__bottom-left-content,
          &__bottom-right-content {
            display: flex;
            align-items: center;
            flex: 1;
          }

          &__bottom-right-content {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
