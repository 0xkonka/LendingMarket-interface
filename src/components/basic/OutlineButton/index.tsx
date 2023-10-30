import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { Link } from 'react-router-dom';

export interface OutlineButtonProps {
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary' | 'third' | 'fourth' | 'fifth';
  size?: 'big' | 'medium' | 'small' | string;
  disabled?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export default function OutlineButton({
  onClick,
  color = 'primary',
  type = 'button',
  size = 'medium',
  href,
  disabled,
  round = false,
  fullWidth = false,
  className,
  children,
}: OutlineButtonProps) {
  const { isCurrentThemeDark, currentTheme } = useThemeContext();

  return (
    <>
      {href ? (
        <Link
          className={classNames(
            `OutlineButton`,
            `OutlineButton__${color}`,
            `OutlineButton__${size}`,
            {
              OutlineButton__disabled: disabled,
              OutlineButton__round: round,
              OutlineButton__fullWidth: fullWidth,
            },
            className
          )}
          to={href}
        >
          {children}
        </Link>
      ) : (
        <button
          className={classNames(
            `OutlineButton`,
            `OutlineButton__${color}`,
            `OutlineButton__${size}`,
            {
              OutlineButton__disabled: disabled,
              OutlineButton__round: round,
              OutlineButton__fullWidth: fullWidth,
            },
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

        .OutlineButton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 50px !important;
          padding: 16px 24px;
          width: fit-content;

          &:hover {
            opacity: 0.6;
          }

          &__disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
          }

          &__round {
            border-radius: 50px !important;
          }

          &__fullWidth {
            width: 100%;
          }

          &__big {
            font-size: 20px;
          }

          &__medium {
            height: 40px;
            font-size: 12px;
            line-height: 17px;
            letter-spacing: 0.02em;
            border-radius: $borderRadius;
          }

          &__small {
            font-size: 12px;
            line-height: 17px;
            letter-spacing: 0.02em;
            padding: 8px 24px;
            border-radius: $borderRadius;
          }

          &__primary {
            color: ${currentTheme.brand.main};
            border: 1px solid ${currentTheme.brand.main};
          }

          &__secondary {
            color: ${currentTheme.brand.primary};
            border: 1px solid ${currentTheme.brand.primary};
          }

          &__third {
            color: ${isCurrentThemeDark ? currentTheme.text.main : '#0F172A'};
            border: 1px solid
              ${isCurrentThemeDark ? currentTheme.text.main : currentTheme.text.offset4};
          }

          &__third:hover {
            background-color: ${isCurrentThemeDark ? '#DFE7F3' : ''};
            border: 1px solid;
            border-color: ${isCurrentThemeDark ? '#DFE7F3' : '#0F172A'};
            color: ${isCurrentThemeDark ? '#0B0E14' : '#000000'};
            opacity: 1;
          }

          &__fourth {
            color: #ffffff;
            border: 1px solid #ffffff;
          }

          &__fifth {
            color: #ffffff;
            border: 1px solid #ffffff;
          }

          &__fifth:hover {
            color: ${currentTheme.text.offset1};
            background: ${currentTheme.text.offset5};
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
