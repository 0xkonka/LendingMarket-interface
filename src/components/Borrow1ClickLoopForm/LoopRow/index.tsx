import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';
import LoopHelpModal from 'components/HelpModal/LoopHelpModal';

export interface LoopRowProps {
  children?: ReactNode;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  className?: string;
  isColumn?: boolean;
  withMargin?: boolean;
  color?: 'dark' | 'lightBlue' | 'white';
  weight?: 'normal' | 'light';
  onWhiteBackground?: boolean;
}

export default function LoopRow({
  children,
  title,
  subTitle,
  className,
  isColumn,
  withMargin,
  color = 'dark',
  weight = 'normal',
  onWhiteBackground,
}: LoopRowProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('Row', className, `Row__${color}`, `Row__${weight}`, {
        Row__column: isColumn,
        Row__withMargin: withMargin,
      })}
    >
      {title && (
        <div className="Row__title-inner">
          <div className="Row__title">
            {title}
            <div className="Row__tooltip">
              <LoopHelpModal text="" />
            </div>
          </div>

          {subTitle && <p className="Row__subtitle">{subTitle}</p>}
        </div>
      )}

      {children && <div className="Row__content">{children}</div>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .Row {
          &__title {
            font-size: 12px;
            color: ${currentTheme.text.offset1};
            display: flex;
          }

          &__tooltip {
            padding-left: 5px;
          }

          &__dark {
            color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
          }
          &__lightBlue {
            color: ${currentTheme.lightBlue.hex};
          }
          &__white {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
