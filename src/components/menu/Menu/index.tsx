import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import Logo from 'components/Logo';
import BuyRDNTModal from 'components/BuyRDNTModal';
import MarketSwitcher from '../MarketSwitcher';
import MenuLink from '../MenuLink';
import DaoButton from '../DaoButton';
import MoreButton from '../MoreButton';
import AddressInfo from '../AddressInfo';
import MobileContent from '../MobileContent';
import ThemeSwitch from '../ThemeSwitch';
import staticStyles from './style';
import navigation from '../navigation';

interface MenuProps {
  title: string;
}

export default function Menu({ title }: MenuProps) {
  const location = useLocation();
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const [openBuyModal, setOpenBuyModal] = useState(false);

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  return (
    <header className="Menu">
      <div className="Menu__container">
        <div className="Menu__logo-inner">
          <Logo className="Menu__header" />

          <nav className="Menu__navigation-inner">
            <ul>
              {navigation.map((link, index) => (
                <li
                  className={classNames('Menu__link-inner', {
                    Menu__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={index}
                >
                  <MenuLink
                    to={link.isBuyRDNT ? '' : link.link}
                    title={intl.formatMessage(link.title)}
                    isActive={isActive(link.link)}
                    absolute={link.external}
                    onClick={() => link.isBuyRDNT && setOpenBuyModal(true)}
                  />
                </li>
              ))}

              <li key="dao" className="Menu__link-inner">
                <DaoButton />
              </li>
              <li key="more" className="Menu__link-inner">
                <MoreButton />
              </li>
            </ul>
          </nav>
        </div>

        <div className="Menu__title-inner">
          <Logo className="Menu__header__mobile" hasText={false} />
          <MarketSwitcher />
        </div>

        <div className="Menu__right-inner">
          <div className="Menu__buttons-inner">
            <ThemeSwitch />
            <MarketSwitcher />
            <AddressInfo />
          </div>
          <div className="Menu__burger-inner">
            <MobileContent
              isActive={isActive}
              currentAccount={currentAccount}
              setOpenBuyModal={setOpenBuyModal}
            />
          </div>
        </div>
      </div>

      {openBuyModal && <BuyRDNTModal setOpenModal={setOpenBuyModal} />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>

      <style jsx={true} global={true}>{`
        .Menu {
          background: ${currentTheme.background.nav};
          border-bottom: 1px solid ${currentTheme.interface.tableBorder};

          &__title-inner {
            p {
              color: ${currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </header>
  );
}
