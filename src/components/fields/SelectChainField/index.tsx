import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext, AnimationArrow, DropdownWrapper } from 'aave-ui-kit';

import staticStyles from './style';

interface SelectChainFieldProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  value: any;
  placeholder?: string;
  className?: string;
}

export default function SelectChainField({
  visible,
  setVisible,
  children,
  disabled,
  value,
  placeholder,
  className,
}: SelectChainFieldProps) {
  const { currentTheme, isCurrentThemeDark, xl } = useThemeContext();

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className={classNames('SelectChainField', { SelectChainField__active: visible }, className)}
      verticalPosition="bottom"
      horizontalPosition="left"
      buttonComponent={
        <button
          className={classNames('SelectChainField__select', {
            SelectChainField__selectActive: visible,
          })}
          disabled={disabled}
          type="button"
          onClick={() => setVisible(!visible)}
        >
          <div className="SelectChainField__select-value">
            {typeof value.image === 'string' ? (
              <img src={value.image} alt="network-icon" />
            ) : (
              <value.image className="network-icon" />
            )}
            <span>{placeholder && !value ? placeholder : value.name}</span>
          </div>

          <AnimationArrow
            active={visible}
            width={xl ? 14 : 18}
            height={xl ? 8 : 10}
            marginLeft={5}
            arrowTopPosition={4}
            arrowWidth={xl ? 9 : 11}
            arrowHeight={2}
            color={visible ? currentTheme.secondary.hex : currentTheme.textDarkBlue.hex}
          />
        </button>
      }
    >
      <div className="SelectChainField__items">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SelectChainField {
          .DropdownWrapper__content {
            width: 100%;
            top: 0;
            background-color: ${isCurrentThemeDark ? '#000000' : '#fff'};
          }

          &__select {
            background: ${isCurrentThemeDark ? '#000000' : '#fff'};
            border: 1px solid;
            border-color: ${isCurrentThemeDark ? '#475167' : currentTheme.text.offset4};
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03), 0px 10px 40px rgba(0, 0, 0, 0.05),
              inset 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 2px 4px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
