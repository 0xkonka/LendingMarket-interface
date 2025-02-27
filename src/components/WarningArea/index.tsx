import { ReactNode, ReactNodeArray } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';
import WarningIcon from 'images/WarningIcon';

interface WarningAreaProps {
  title?: string | null | {} | ReactNodeArray;
  children?: ReactNode;
  withMargin?: boolean;
  orangeFill?: boolean;
  className?: string;
}

export default function WarningArea({ title, children, className }: WarningAreaProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('WarningArea', className)}>
      <div
        className={classNames('WarningArea__top-line', {
          WarningAreaTopLine: !!children,
        })}
      >
        {title && (
          <p>
            <WarningIcon />
            {title}
          </p>
        )}
      </div>

      {!!children && <div className="WarningArea__content">{children}</div>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .WarningArea {
          border-color: ${currentTheme.red.hex};
          &__top-line {
            p {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
          &__content {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
