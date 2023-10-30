import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { Link } from 'react-router-dom';

export interface ContainedButtonProps {
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary' | 'third' | 'fourth';
  size?: 'big' | 'medium' | 'small' | string;
  disabled?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export default function ContainedButton({
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
}: ContainedButtonProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      {href ? (
        <Link
          className={classNames(
            `ContainedButton`,
            `ContainedButton__${color}`,
            `ContainedButton__${size}`,
            {
              ContainedButton__disabled: disabled,
              ContainedButton__round: round,
              ContainedButton__fullWidth: fullWidth,
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
            `ContainedButton`,
            `ContainedButton__${color}`,
            `ContainedButton__${size}`,
            {
              ContainedButton__disabled: disabled,
              ContainedButton__round: round,
              ContainedButton__fullWidth: fullWidth,
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

        .ContainedButton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 16px;
          font-weight: medium;
          border-radius: 50px !important;
          padding: 14px 24px;
          width: fit-content;
          font-family: 'Inter';

          &__disabled {
            opacity: 0.6;
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

          &__small {
            font-weight: 600;
            font-size: 11px;
            line-height: 15px;
            gap: 0px;
            padding: 6px 12px;
            border-radius: $borderRadius;
          }

          &__primary {
            color: ${currentTheme.interface.mainTable};
            background: ${currentTheme.brand.main};
          }

          &__secondary {
            color: ${currentTheme.text.main};
            background: ${currentTheme.brand.primary};
          }

          &__third {
            color: ${currentTheme.interface.mainTable};
            background: ${currentTheme.text.offset2};
          }

          &__fourth {
            color: ${currentTheme.text.offset1};
            background: ${currentTheme.interface.divider};
            height: 1.75rem;

            &:hover {
              color: ${currentTheme.interface.mainTable};
              background: ${currentTheme.brand.main} !important;

              & svg path {
                fill: ${currentTheme.interface.mainTable} !important;
                padding: 0px;
              }
            }
          }
        }
      `}</style>
    </>
  );
}
