import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useThemeContext } from 'aave-ui-kit';
import css from 'styled-jsx/css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LINKS from 'ui-config/links';
import { useMenuContext } from 'libs/menu';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { CURRENCY_ROUTE_PARAMS } from 'helpers/router-types';
import { isFeatureEnabled } from 'helpers/config/markets-and-network-config';
import {
  Markets,
  AssetDetail,
  ReserveOverview,
  Deposit,
  Withdraw,
  Borrow,
  ManageRadiant,
  Repay,
  Faucet,
  Dashboard,
  Loop,
  Bridge,
  Migration,
  ArbAirdrop,
} from 'modules';
import SwapBorrowRateModeConfirmation from 'modules/swap/SwapBorrowRateModeConfirmation';
import SwapUsageAsCollateralModeConfirmation from 'modules/swap/SwapUsageAsCollateralModeConfirmation';
import ScreensWrapper from 'components/wrappers/ScreensWrapper';
import WelcomeModal from 'components/WelcomeModal';
import goToTop from 'helpers/goToTop';

const staticStyles = css.global`
  .App {
    display: flex;
    flex-direction: column;
    flex: auto;
    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
    }
  }
`;

function ModulesWithMenu() {
  const location = useLocation();
  const { isUserHasDeposits } = useStaticPoolDataContext();
  const { currentMarketData } = useProtocolDataContext();

  useEffect(() => {
    goToTop();
  }, [location]);

  return (
    <ScreensWrapper>
      <Switch>
        <Route path={LINKS.MARKETS.link} component={Markets} />

        <Route path={LINKS.DASHBOARD.link} component={Dashboard} />

        <Route path={LINKS.DEPOSIT.link} component={Deposit} />

        <Route path={`/withdraw/${CURRENCY_ROUTE_PARAMS}`} component={Withdraw} />

        <Route path={LINKS.BORROW.link} component={Borrow} />

        <Route path={`/repay/${CURRENCY_ROUTE_PARAMS}`} component={Repay} />

        <Route path={LINKS.MANAGE_RADIANT.link} component={ManageRadiant} />

        <Route
          exact={true}
          path={`/interest-swap/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={SwapBorrowRateModeConfirmation}
        />

        <Route
          exact={true}
          path={`/usage-as-collateral/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={SwapUsageAsCollateralModeConfirmation}
        />

        <Route
          exact={true}
          path={`/asset-detail/${CURRENCY_ROUTE_PARAMS}`}
          component={AssetDetail}
        />

        <Route
          exact={true}
          path={`/reserve-overview/${CURRENCY_ROUTE_PARAMS}`}
          component={ReserveOverview}
        />

        <Route path={LINKS.LOOP.link} component={Loop} key="Loop" />

        <Route path={LINKS.BRIDGE.link} component={Bridge} key="Bridge" />

        <Route path={LINKS.ARB_AIRDROP.link} component={ArbAirdrop} key="ArbAirdrop" />

        {isFeatureEnabled.migration(currentMarketData) && [
          <Route path={LINKS.MIGRATION.link} component={Migration} key="Migration" />,
        ]}

        {isFeatureEnabled.faucet(currentMarketData) && [
          <Route path={LINKS.FAUCET.link} component={Faucet} key="Faucet" />,
        ]}

        <Redirect to={isUserHasDeposits ? LINKS.DASHBOARD.link : LINKS.MARKETS.link} />
      </Switch>
    </ScreensWrapper>
  );
}

const App: React.FC = () => {
  const { md, currentTheme } = useThemeContext();
  const { openMobileMenu } = useMenuContext();

  useEffect(() => {
    AOS.init();
  }, [currentTheme]);

  const handlers = useSwipeable({
    onSwipedLeft: () => (md ? openMobileMenu() : null),
  });

  return (
    <div className="App">
      <div {...handlers} className="App__content">
        <Switch>
          <Route component={ModulesWithMenu} />
        </Switch>
        <WelcomeModal />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
};

export default App;
