import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import AnimationCircle from 'images/AnimationCircle';

interface CaptionProps {
  title: string;
  description?: string | ReactNode;
  color?: 'primary' | 'secondary' | 'purple' | 'dark' | 'white';
  className?: string;
  marginBottom?: number;
  withAnimationCircle?: boolean;
  onWhiteBackground?: boolean;
}

export default function Caption({
  title,
  description,
  color = 'primary',
  className,
  marginBottom,
  withAnimationCircle,
  onWhiteBackground,
}: CaptionProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('Caption', `Caption__${color}`, className)}
      style={{ marginBottom: `${marginBottom}px` }}
    >
      <h2 className={classNames({ Caption__titleWithCircle: withAnimationCircle })}>
        {title} {withAnimationCircle && <AnimationCircle />}
      </h2>

      {description && (
        <p className={classNames('Caption__description', `Caption__description-${color}`)}>
          {description}
        </p>
      )}

      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .Caption {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;

          h2 {
            width: 100%;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            position: relative;

            &.Caption__titleWithCircle {
              left: 21px;
            }

            img {
              width: 32px;
              height: 32px;
              margin-left: 10px;
            }
          }

          &__market {
            h2 {
              color: ${currentTheme.primary.hex};
            }
          }

          &__purple {
            h2 {
              color: ${currentTheme.text.main};
            }
          }

          &__primary {
            h2 {
              color: ${currentTheme.text.main};
            }
          }

          &__secondary {
            h2 {
              color: ${currentTheme.secondary.hex};
            }
          }

          &__dark {
            h2 {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }

          &__white {
            h2 {
              color: ${currentTheme.white.hex};
            }
          }

          &__description {
            font-size: 12px;
            color: ${currentTheme.text.main};
          }

          &__description-white {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
