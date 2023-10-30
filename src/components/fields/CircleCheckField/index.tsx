import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';

export interface onChange {
  name: string;
  value: boolean;
}

interface CircleCheckFieldProps {
  className?: string;
  title?: string | ReactNode;
  value: boolean;
  name: string;
  onChange: (event: onChange) => void;
}

export default function CircleCheckField({
  className,
  title,
  value,
  onChange,
  name,
}: CircleCheckFieldProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('CircleCheckField', className)}>
      <input
        checked={value}
        id={`${name}FieldId`}
        type="checkbox"
        onChange={() => onChange({ name, value: !value })}
      />

      <label className="CircleCheckField__label" htmlFor={`${name}FieldId`}>
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
        .CircleCheckField__label span {
          background: #ffffff;
          border: 1px solid ${currentTheme.brand.main};
          border-radius: 50%;
          box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
        }

        .CircleCheckField__label p {
          color: ${currentTheme.text.offset2};
        }

        .CircleCheckField__label:hover p {
          color: ${currentTheme.text.main};
        }

        .CircleCheckField__label span svg {
          stroke: ${currentTheme.whiteElement.hex};
        }

        .CircleCheckField input[type='checkbox']:disabled + .CircleCheckField__label span {
          border-color: ${currentTheme.text.main};
          background: ${currentTheme.text.main};
        }

        .CircleCheckField input:checked + .CircleCheckField__label span {
          background: ${currentTheme.brand.main};
          border-color: ${currentTheme.brand.main};
        }
      `}</style>
    </div>
  );
}
