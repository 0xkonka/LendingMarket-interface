import { Switch, Route, Redirect } from 'react-router-dom';

import FaucetMain from './screens/FaucetMain';
import FaucetConfirmation from './screens/FaucetConfirmation';
import LpFaucetConfirmation from './screens/LpFaucetConfirmation';
import RdntV1FaucetConfirmation from './screens/RdntV1FaucetConfirmation';
import { CURRENCY_ROUTE_PARAMS } from 'helpers/router-types';

export default function Faucet() {
  return (
    <Switch>
      <Route exact={true} path="/faucet" component={FaucetMain} key="FaucetMain" />

      <Route
        exact={true}
        path={`/faucet/lp`}
        component={LpFaucetConfirmation}
        key="LpFaucetConfirmation"
      />

      <Route
        exact={true}
        path={`/faucet/rdnt-v1`}
        component={RdntV1FaucetConfirmation}
        key="RdntV1FaucetConfirmation"
      />

      <Route
        exact={true}
        path={`/faucet/${CURRENCY_ROUTE_PARAMS}`}
        component={FaucetConfirmation}
        key="FaucetConfirmation"
      />

      <Redirect to="/faucet" />
    </Switch>
  );
}
