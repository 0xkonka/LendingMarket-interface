import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';
import SortIcon from 'icons/Sort';

type TableHeaderProps = {
  head: string[];
  colWidth: (string | number)[];
  className?: string;
  skipActions?: boolean;
};

export default function TableHeader({
  head,
  colWidth,
  className,
  skipActions = false,
}: TableHeaderProps) {
  const { currentTheme, sm, md } = useThemeContext();

  return (
    <div className={classNames('TableHeader', className)}>
      <div className="TableHeader__inner">
        {head.map((title, i) => (
          <div
            className={classNames('TableHeader__item', title)}
            style={{ maxWidth: colWidth[i], paddingRight: md ? 20 : 0, width: '100%' }}
            key={i}
          >
            <p className="TableHeader__title">{title}</p>
            {title && <SortIcon />}
          </div>
        ))}
        {!sm && !skipActions && (
          <>
            <div className="TableHeader__item" />
            <div className="TableHeader__item" />
          </>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableHeader {
          color: ${currentTheme.textDarkBlue.hex};

          &__item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          }

          &__title {
            padding-right: 5px;
          }
        }
      `}</style>
    </div>
  );
}
