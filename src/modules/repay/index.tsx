import { Route, Switch } from 'react-router-dom';

import { CURRENCY_ROUTE_PARAMS } from 'helpers/router-types';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import RepayScreenWrapper from './components/RepayScreenWrapper';
import RepayMain from './screens/RepayMain';
import RepayAmount from './screens/RepayAmount';
import RepayConfirmation from './screens/RepayConfirmation';

function Repay({
  user,
  walletBalance,
  walletBalanceUSD,
  currencySymbol,
  userReserve,
}: ValidationWrapperComponentProps) {
  return (
    <RepayScreenWrapper
      currentBorrows={userReserve?.totalBorrows || '0'}
      currentBorrowsInUSD={userReserve?.totalBorrowsUSD || '0'}
      walletBalance={walletBalance.toString()}
      walletBalanceInUSD={walletBalanceUSD.toString()}
      totalCollateralUSD={user?.totalCollateralUSD || '0'}
      totalCollateralMarketReferenceCurrency={user?.totalCollateralMarketReferenceCurrency || '0'}
      currencySymbol={currencySymbol}
      healthFactor={user?.healthFactor || '0'}
      loanToValue={user?.currentLoanToValue || '0'}
    >
      <Switch>
        <Route exact={true} path={`/repay/${CURRENCY_ROUTE_PARAMS}/`} component={RepayMain} />

        <Route
          exact={true}
          path={`/repay/${CURRENCY_ROUTE_PARAMS}/balance`}
          component={RepayAmount}
        />
        <Route
          path={`/repay/${CURRENCY_ROUTE_PARAMS}/balance/confirmation`}
          component={RepayConfirmation}
        />
      </Switch>
    </RepayScreenWrapper>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
  withUserReserve: true,
})(Repay);
