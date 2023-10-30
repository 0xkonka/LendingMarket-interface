import classNames from 'classnames';
import { ReactElement } from 'react';
import { useThemeContext } from 'aave-ui-kit';

interface BaseCardProps {
  children: ReactElement;
  className?: string;
}

export default function BaseCard({ children, className }: BaseCardProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <div className={classNames('BaseCard', className)}>{children}</div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BaseCard {
            display: flex;
            flex-direction: column;
            position: relative;
            background: ${currentTheme.interface.mainTable};
            border-radius: $surfaceBorderRadius;
            border: 1px solid ${currentTheme.interface.tableBorder};
            padding: 32px;
            box-shadow: $boxShadow;

            @include respond-to(xs) {
              padding: 16px;
            }
          }
        `}
      </style>
    </>
  );
}
