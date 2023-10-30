import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import goToTop from 'helpers/goToTop';

interface TableItemWrapperProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  withGoToTop?: boolean;
}

export default function TableItemWrapper({
  onClick = () => {},
  disabled,
  className,
  children,
  withGoToTop,
}: TableItemWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames(
        'TableItemWrapper',
        { TableItemWrapper__disabled: disabled },
        className
      )}
      onClick={() => {
        !disabled && onClick();
        withGoToTop && goToTop();
      }}
    >
      {children}

      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TableItemWrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          box-shadow: $boxShadow;
          border: 1px solid ${currentTheme.interface.divider};
          padding: 18px 24px;
          cursor: pointer;
          transition-property: box-shadow;
          transition-duration: 0.2s;
          transition-timing-function: ease;
          background: ${currentTheme.interface.mainTable};

          &:hover {
            box-shadow: 0 0 9px 0 ${currentTheme.brand.main};
          }
          &:active {
            border-color: ${currentTheme.interface.hover};
          }

          &__disabled {
            cursor: default;
            box-shadow: none;
            &:hover,
            &:active {
              box-shadow: none;
            }
          }
        }
      `}</style>
    </div>
  );
}
