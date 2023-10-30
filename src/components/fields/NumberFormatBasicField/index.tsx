import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import NumberFormat from 'react-number-format';

import staticStyles from './style';

interface NumberFormatBasicFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  type: string;
  isRequired?: boolean;
  isFocused?: boolean;
  placeholder?: string;
  step?: string;
  min?: number;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function NumberFormatBasicField({
  value,
  onChange,
  className,
  type,
  isRequired,
  placeholder,
  step,
  min,
  disabled,
  isFocused,
  onKeyDown,
  ...props
}: NumberFormatBasicFieldProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('BasicField', className)}>
      <NumberFormat
        value={value}
        onValueChange={(values) => {
          onChange(values.value);
        }}
        min={min}
        getInputRef={(el: HTMLInputElement) => {
          if (el && isFocused) {
            el.focus();
          }
        }}
        disabled={disabled}
        thousandSeparator
        placeholder={placeholder}
        allowNegative={false}
        onKeyDown={onKeyDown}
        {...props}
        decimalScale={18}
      />
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .BasicField {
          input {
            color: ${currentTheme.text.offset1};
            &::placeholder {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
