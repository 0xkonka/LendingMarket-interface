import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import Link from 'components/basic/Link';

export interface TextButtonProps {
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  size?: 'big' | 'medium' | 'small' | string;
  color?: 'primary' | 'secondary' | 'white';
  absolute?: boolean;
  inNewWindow?: boolean;
  disabled?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export default function TextButton({
  onClick,
  type = 'button',
  size = 'medium',
  color = 'primary',
  absolute = false,
  inNewWindow = false,
  href,
  disabled,
  className,
  children,
}: TextButtonProps) {
  const { currentTheme } = useThemeContext();
  return (
    <>
      {href ? (
        <Link
          className={classNames(
            `TextButton`,
            `TextButton__${size}`,
            `TextButton__${color}`,
            className
          )}
          to={href}
          absolute={absolute}
          inNewWindow={inNewWindow}
        >
          {children}
        </Link>
      ) : (
        <button
          className={classNames(
            `TextButton`,
            `TextButton__${size}`,
            `TextButton__${color}`,
            className
          )}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .TextButton {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: bold;
          border-radius: $borderRadius;
          transition: all 0.8s;

          &:hover {
            text-decoration: underline;
          }

          &__big {
            font-size: 20px;
          }

          &__small {
            font-size: 14px;
          }

          &__primary {
            color: ${currentTheme.text.main};
          }

          &__white {
            color: ${currentTheme.interface.mainTable};
          }
        }
      `}</style>
    </>
  );
}
