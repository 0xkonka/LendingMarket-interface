import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

interface CardWrapperProps {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  size?: 'big' | 'medium' | 'small';
}

export default function CardWrapper({
  header,
  children,
  className,
  size = 'medium',
}: CardWrapperProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className={classNames('CardWrapper', className)}>
      {header && (
        <div className={classNames(`CardWrapper__header`, `CardWrapper__header__${size}`)}>
          {header}
        </div>
      )}
      <div className="CardWrapper__children">{children}</div>

      <style jsx={true} global>{`
        .CardWrapper {
          height: fit-content;
          background: ${currentTheme.interface.mainTable};
          border: 1px solid ${currentTheme.interface.tableBorder};
          box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.03), 0px 10px 30px rgba(0, 0, 0, 0.03);
          border-radius: 10px;

          &__header {
            padding: 14px 24px;
            border-bottom: 1px solid ${currentTheme.interface.divider};

            p {
              color: ${isCurrentThemeDark ? currentTheme.text.offset1 : currentTheme.text.main};
              font-weight: 600;
            }
          }

          &__header__medium {
            p {
              font-size: 18px;
            }
          }

          &__header__small {
            p {
              font-size: 16px;
            }
          }

          &__children {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
