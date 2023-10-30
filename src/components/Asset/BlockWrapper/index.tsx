import { ReactNode } from 'react';
import { useThemeContext } from 'aave-ui-kit';

export interface BlockWrapperProps {
  title?: string;
  titleComponent?: ReactNode;
  children: ReactNode;
}

export default function BlockWrapper({ title, titleComponent, children }: BlockWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="BlockWrapper">
      <div className="BlockWrapper__title-inner">
        {title && <p>{title}</p>}
        {titleComponent && titleComponent}
      </div>
      <div className="BlockWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BlockWrapper {
            display: flex;
            flex-direction: column;
            color: ${currentTheme.textDarkBlue.hex};

            &__title-inner {
              .TextWithModal__text,
              p {
                font-size: $fontSizeSmall;
                @include respond-to(md) {
                  font-size: $fontSizeSmall;
                }
                @include respond-to(sm) {
                  font-size: $fontSizeMedium;
                }
              }
            }
          }
        `}
      </style>
    </div>
  );
}
