import { ReactNode, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import OpenArrow from 'icons/OpenArrow';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';

interface SelectFieldProps {
  visible?: boolean;
  setVisible?: (value: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function SelectField({
  visible: providedVisible,
  setVisible: providedSetVisible,
  children,
  disabled,
  value,
  icon,
  className,
}: SelectFieldProps) {
  const { currentTheme } = useThemeContext();
  const [internalVisible, setInternalVisible] = useState(false);

  const visible = providedVisible ?? internalVisible;
  const setVisible = useCallback(
    (newVisible: boolean) => {
      setInternalVisible(newVisible);
      providedSetVisible?.(newVisible);
    },
    [providedSetVisible]
  );

  useEffect(() => {
    setVisible(false);
  }, [value]);

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className={classNames('SelectField', { SelectField__active: visible }, className)}
      verticalPosition="bottom"
      horizontalPosition="left"
      buttonComponent={
        <button
          className={classNames('SelectField__select', { SelectField__selectActive: visible })}
          disabled={disabled}
          type="button"
          onClick={() => setVisible(!visible)}
        >
          {icon && <div className="SelectField__icon">{icon}</div>}

          <span
            className={classNames('SelectField__select-value', {
              SelectField__selectValueActive: !!value,
            })}
          >
            {value}
          </span>

          <div className="SelectField__button-horizontalDivider"></div>

          <OpenArrow
            className={visible ? 'SelectField__button-arrowExpanded' : ''}
            color={currentTheme.text.offset1}
            width={10}
            height={10}
          ></OpenArrow>
        </button>
      }
    >
      <div className="SelectField__items">{children}</div>

      <style jsx global>
        {`
          @import 'src/_mixins/screen-size';
          @import 'src/_mixins/variables';

          .SelectField {
            .DropdownWrapper__content {
              min-width: 100%;
              box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid ${currentTheme.palette.token4.hex};
              top: calc(100% + 4px);
            }

            &__icon {
              position: relative;
              border: 1px solid ${currentTheme.palette.token4.hex};
              border-radius: 100%;
              background: ${currentTheme.palette.token2.hex};
            }

            &__select {
              display: flex;
              align-items: center;
              position: relative;
              border-radius: 32px;
              border: 1px solid ${currentTheme.palette.token4.hex};
              color: ${currentTheme.text2.default.hex};
              font-family: 'Inter';
              padding: 12px 16px;
              font-weight: 500;
              font-size: $fontSizeMedium;
              line-height: 1;
              gap: 8px;
              min-height: 40px;

              &:hover {
                background: ${currentTheme.palette.token1.hex};
              }
            }

            &__button-horizontalDivider {
              content: '';
              position: relative;
              height: 14px;
              width: 1px;
              background: ${currentTheme.palette.token4.hex};
            }

            &__select-value {
              opacity: 0.5;
            }

            &__selectValueActive {
              opacity: 1;
              color: ${currentTheme.text2.default.hex};
            }

            &__items {
              display: flex;
              flex-direction: column;
              flex: 1;
              background: ${currentTheme.palette.token2.hex};
              padding: 4px 0px;
            }

            &__button-horizontalDivider {
              content: '';
              position: relative;
              height: 14px;
              width: 1px;
              background: ${currentTheme.palette.token4.hex};
              margin-left: auto;
            }

            &__button-arrowExpanded {
              position: relative;
              transform: rotate(180deg);
            }
          }
        `}
      </style>
    </DropdownWrapper>
  );
}
