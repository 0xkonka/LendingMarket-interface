import { ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useThemeContext } from 'aave-ui-kit';

export interface GradientButtonProps {
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  color?: 'primary' | 'secondary' | 'grey';
  size?: 'big' | 'medium' | 'small' | string;
  disabled?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export default function GradientButton({
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
}: GradientButtonProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  return (
    <>
      {href ? (
        <Link
          className={classNames(
            `GradientButton`,
            `GradientButton__${color}`,
            `GradientButton__${size}`,
            {
              GradientButton__disabled: disabled,
              GradientButton__round: round,
              GradientButton__fullWidth: fullWidth,
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
            `GradientButton`,
            `GradientButton__${color}`,
            `GradientButton__${size}`,
            {
              GradientButton__disabled: disabled,
              GradientButton__round: round,
              GradientButton__fullWidth: fullWidth,
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

        .GradientButton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 50px !important;
          padding: 16px 24px;
          width: fit-content;

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

          &__medium {
            font-size: 14px;
            line-height: 17px;
            height: 40px;
            border-radius: $borderRadius;
          }

          &__small {
            font-size: 12px;
            padding: 8px 24px;
            border-radius: $borderRadius;
          }

          &__primary {
            color: #ffffff;
            background: ${isCurrentThemeDark
              ? currentTheme.brand.primary
              : currentTheme.brand.main};
            transition: 0.6s;
          }

          &__grey {
            font-family: 'PP Mori';
            font-style: normal;
            line-height: 30px;
            text-align: center;
            color: ${currentTheme.text.offset1};

            /* Table Offset 3 */
            background: #eaeff5;
            /* Offset 4 */
            border: 1px solid ${currentTheme.text.offset4};
            border-radius: 60px;
            opacity: 1;
          }

          &:hover {
            background-position: ${isCurrentThemeDark ? '30%' : 'left'};
          }
        }
      `}</style>
    </>
  );
}
