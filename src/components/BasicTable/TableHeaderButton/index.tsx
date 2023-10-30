import { ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import staticStyles from './style';

interface TableHeaderButtonProps {
  sortName?: string;
  sortDesc?: boolean;
  sortKey?: string;
  setSortName?: (value: string) => void;
  setSortDesc?: (value: boolean) => void;
  withSorting?: boolean;
  subTitle?: string;
  title: string | ReactNode;
  className?: string;
  size?: 'normal' | 'small';
}

export default function TableHeaderButton({
  sortName,
  sortDesc,
  sortKey,
  setSortName,
  setSortDesc,
  withSorting,
  subTitle,
  title,
  className,
  size = 'normal',
}: TableHeaderButtonProps) {
  const { currentTheme } = useThemeContext();

  const handleSorting = useCallback(
    (name: string) => {
      setSortDesc && setSortDesc(false);
      setSortName && setSortName(name);
      if (sortName === name) {
        setSortDesc && setSortDesc(!sortDesc);
      }
    },
    [sortName, sortDesc, setSortDesc, setSortName]
  );

  return (
    <>
      {withSorting && sortKey ? (
        <button
          onClick={() => handleSorting(sortKey)}
          className={classNames(
            'TableHeaderButton TableHeaderButton__withSort',
            {
              TableHeaderButton__desk: sortName === sortKey && sortDesc,
              TableHeaderButton__sort: sortName === sortKey,
              TableHeaderButton__withSubTitle: !!subTitle,
            },
            className,
            `TableHeaderButton__${size}`
          )}
          type="button"
        >
          {!!subTitle && <span>{subTitle}</span>}
          {typeof title === 'string' ? <p>{title}</p> : title}
        </button>
      ) : (
        <div
          className={classNames(
            'TableHeaderButton',
            {
              TableHeaderButton__withSubTitle: !!subTitle,
            },
            className
          )}
        >
          {!!subTitle && <span>{subTitle}</span>}
          <p>{title}</p>
        </div>
      )}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TableHeaderButton {
          color: #525253;

          span {
            color: #131313;
          }

          &__withSort {
            &:hover {
              p {
                &:after {
                  border-top-color: ${currentTheme.textDarkBlue.hex};
                }
              }
            }

            p {
              &:after {
                border-top-color: ${currentTheme.lightBlue.hex};
              }
            }
          }

          &__sort {
            p {
              &:after {
                border-top-color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }

          &__desk {
            p {
              &:after {
                border-bottom-color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }
        }
      `}</style>
    </>
  );
}
