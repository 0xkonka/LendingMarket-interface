import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import goToTop from 'helpers/goToTop';
import Link from 'components/basic/Link';
import staticStyles from './style';
import { useCallback } from 'react';

interface MenuLinkProps {
  to: string;
  title: string;
  isActive: boolean;
  hidden?: boolean;
  absolute?: boolean;
  onClick?: () => void;
}

export default function MenuLink({
  to,
  title,
  isActive,
  hidden,
  absolute,
  onClick = () => {},
}: MenuLinkProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const linkButtonHandler = useCallback(() => {
    onClick();
    goToTop();
  }, [onClick]);

  return (
    <>
      {to ? (
        <Link
          to={to}
          className={classNames('MenuLink ButtonLink', {
            MenuLink__active: isActive,
            MenuLink__hidden: hidden,
          })}
          inNewWindow={absolute}
          absolute={absolute}
          onClick={() => goToTop()}
        >
          <div className="MenuLink__title">
            <i />
            <p>
              <b>{title}</b> <strong>{title}</strong>
            </p>
          </div>
        </Link>
      ) : (
        <div
          className={classNames('MenuLink ButtonLink', {
            MenuLink__active: isActive,
            MenuLink__hidden: hidden,
          })}
          onClick={linkButtonHandler}
        >
          <div className="MenuLink__title">
            <i />
            <p>
              <b>{title}</b> <strong>{title}</strong>
            </p>
          </div>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MenuLink {
          color: ${isCurrentThemeDark
            ? currentTheme.text.offset3
            : currentTheme.text.offset2} !important;

          strong {
            color: ${currentTheme.text.main} !important;
          }

          &__active {
            opacity: 1;
            .MenuLink__isThemeDark {
              strong {
                color: ${currentTheme.text.main} !important;
              }
            }
          }

          .MenuLink__title {
            i {
              background: ${currentTheme.brand.main} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
