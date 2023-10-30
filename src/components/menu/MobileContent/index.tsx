import { useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { useThemeContext, DropdownWrapper } from 'aave-ui-kit';
// import { SocialIcons } from 'aave-ui-kit';
// import { socialIcons } from 'ui-config';
import { useMenuContext } from 'libs/menu';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import goToTop from 'helpers/goToTop';
import Logo from 'components/Logo';
import OutLinkIcon from 'icons/OutLink';
import Link from 'components/basic/Link';
import MobileMenuIcon from '../MobileMenuIcon';
import ThemeSwitch from '../ThemeSwitch';
import { mobileNavigation } from '../navigation';
import staticStyles from './style';
import MobileAddressInfo from '../MobileAddressInfo';

interface MobileContentProps {
  isActive: (url: string) => boolean;
  currentAccount: string;
  setOpenBuyModal: (openModal: boolean) => void;
}

export default function MobileContent({
  isActive,
  currentAccount,
  setOpenBuyModal,
}: MobileContentProps) {
  const intl = useIntl();
  const { currentTheme, md } = useThemeContext();
  const { openMobileMenu, closeMobileMenu, mobileMenuVisible, setMobileMenuVisible } =
    useMenuContext();
  const { currentMarketData } = useProtocolDataContext();

  useEffect(() => {
    if (mobileMenuVisible && !md) {
      closeMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const handleLinkClick = () => {
    goToTop();
    closeMobileMenu();
  };

  const handlers = useSwipeable({
    onSwipedRight: () => closeMobileMenu(),
  });

  const buyRDNTButtonHandler = useCallback(() => {
    setOpenBuyModal(true);
    closeMobileMenu();
  }, [setOpenBuyModal, closeMobileMenu]);

  return (
    <div {...handlers}>
      <div
        className={classNames('MobileContent__overlay', {
          MobileContent__overlayActive: mobileMenuVisible,
        })}
      />

      <DropdownWrapper
        visible={mobileMenuVisible}
        setVisible={setMobileMenuVisible}
        className="MobileContent"
        contentClassName="MobileContent__content-wrapper"
        contentId="MobileMenuContent"
        buttonComponent={
          <button
            className={classNames('MobileContent__button', {
              MobileContent__buttonActive: mobileMenuVisible,
            })}
            onClick={openMobileMenu}
            type="button"
          >
            <span className="MobileContent__button-box">
              <span className="MobileContent__button-inner" />
            </span>
          </button>
        }
      >
        <div className="MobileContent__content">
          <div className="MobileContent__top">
            <Logo className="MobileContent__logo" />
            <ThemeSwitch />
          </div>

          <div className="MobileContent__wallet">
            <MobileAddressInfo />
          </div>
          <div className="MobileContent__row__divider"></div>
          <div className="MobileContent__navigation">
            <ul>
              {mobileNavigation.map((link, index) => (
                <li
                  className={classNames('MobileContent__link-wrapper', {
                    MobileContent__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={index}
                >
                  {(intl.formatMessage(link.title) === 'Governance' ||
                    intl.formatMessage(link.title) === 'Buy') && (
                    <div className="MobileContent__row__divider"></div>
                  )}

                  {!link.isBuyRDNT ? (
                    <Link
                      className={classNames('MobileContent__link', {
                        MobileContent__linkActive: isActive(link.link),
                      })}
                      to={link.link}
                      absolute={link.external}
                      inNewWindow={link.external}
                      onClick={() => {
                        !link.external && handleLinkClick();
                        if (link.onClick) link.onClick(); // Handle the custom onClick from mobileNavigation
                      }}
                      color="white"
                    >
                      <div
                        className={classNames('MobileContent__row', {
                          MobileContent__row__border:
                            intl.formatMessage(link.title) === 'Governance',
                        })}
                      >
                        <div className="MobileContent__row__left">
                          <MobileMenuIcon iconName={intl.formatMessage(link.title)} />
                          <span>{intl.formatMessage(link.title)}</span>
                        </div>

                        {link.external && (
                          <OutLinkIcon width={15} height={15} color={currentTheme.text.offset1} />
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="MobileContent__link MobileContent__link-chat"
                      onClick={buyRDNTButtonHandler}
                    >
                      <div className="MobileContent__row">
                        <div className="MobileContent__row__left">
                          <MobileMenuIcon iconName={intl.formatMessage(link.title)} />
                          <span>{intl.formatMessage(link.title)}</span>
                        </div>
                        <OutLinkIcon width={15} height={15} color={currentTheme.text.offset1} />
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="MobileContent__bottom">
            <SocialIcons
              icons={socialIcons}
              className="MobileContent__social-icons"
              iconHeight={40}
              iconWidth={40}
              white={true}
            />
          </div> */}
        </div>
      </DropdownWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MobileContent {
          &__button-inner,
          &__button-inner:before,
          &__button-inner:after {
            background: ${currentTheme.text.main};
          }

          &__wallet {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 17px 17px 0 17px;

            .MobileAddressInfo {
              width: 100%;
              button {
                width: 100%;
                height: 42px;
              }
            }
          }

          &__row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 25px;

            &__divider {
              content: '';
              width: 100%;
              left: 0;
              border-bottom: 1px solid ${currentTheme.text.offset2};
              opacity: 0.2;
              margin-top: 10px;
              margin-bottom: 20px;
            }

            &__left {
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                padding-left: 25px;
              }
            }
          }

          .MobileContent__content-wrapper.DropdownWrapper__content {
            background: ${currentTheme.background.nav};
          }

          &__bottom,
          &__top {
            display: flex;
            justify-content: space-between;
            &:after {
              background: ${currentTheme.text.offset2};
            }
          }

          .MobileContent__link {
            padding-left: 30px;
            color: ${currentTheme.text.main};
            font-size: 13px;
            font-weight: 500;
          }
        }
      `}</style>
    </div>
  );
}
