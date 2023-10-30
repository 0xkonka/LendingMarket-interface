import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import goToTop from 'helpers/goToTop';

interface MenuContextProps {
  mobileMenuVisible: boolean;
  setMobileMenuVisible: (value: boolean) => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const MenuContext = React.createContext({} as MenuContextProps);

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const openMobileMenu = useCallback(() => {
    setMobileMenuVisible(true);
    goToTop('MobileMenuContent');
  }, [setMobileMenuVisible]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuVisible(false);
    goToTop('MobileMenuContent');
  }, [setMobileMenuVisible]);

  useEffect(() => {
    if (mobileMenuVisible) {
      document.body.classList.add('Body__mobileMenu-open');
    } else {
      document.body.classList.remove('Body__mobileMenu-open');
    }
  }, [mobileMenuVisible]);

  return (
    <MenuContext.Provider
      value={{
        mobileMenuVisible,
        setMobileMenuVisible,
        openMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const useMenuContext = () => useContext(MenuContext);
