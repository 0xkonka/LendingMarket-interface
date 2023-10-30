import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';

export interface onChange {
  name: string;
  value: boolean;
}

interface CheckBoxFieldProps {
  className?: string;
  title?: string | ReactNode;
  value: boolean;
  name: string;
  onChange: (event: onChange) => void;
}

export default function CheckBoxField({
  className,
  title,
  value,
  onChange,
  name,
}: CheckBoxFieldProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('CheckBoxField', className)}>
      <input
        checked={value}
        id={`${name}FieldId`}
        type="checkbox"
        onChange={() => onChange({ name, value: !value })}
      />

      <label className="CheckBoxField__label" htmlFor={`${name}FieldId`}>
        <span>
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>

        {title && <p>{title}</p>}
      </label>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CheckBoxField__label span {
          background: #ffffff;
          border: 1px solid ${currentTheme.text.offset4};
          box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
        }

        .CheckBoxField__label p {
          color: ${currentTheme.text.offset2};
          font-weight: 600;
          font-size: 13px;
        }

        .CheckBoxField__label:hover p {
          color: ${currentTheme.text.main};
        }

        .CheckBoxField__label span svg {
          stroke: ${currentTheme.whiteElement.hex};
        }

        .CheckBoxField input[type='checkbox']:disabled + .CheckBoxField__label span {
          border-color: ${currentTheme.text.main};
          background: ${currentTheme.text.main};
        }

        .CheckBoxField input:checked + .CheckBoxField__label span {
          background: ${currentTheme.brand.main};
          border-color: ${currentTheme.brand.main};
        }
      `}</style>
    </div>
  );
}
