import { Redirect, Switch, Route } from 'react-router-dom';
import { PERMISSION } from '@radiantcapital/contract-helpers';

import { CURRENCY_ROUTE_PARAMS } from 'helpers/router-types';
import PermissionWarning from 'ui-config/branding/PermissionWarning';
import DepositAmount from '../DepositAmount';
import DepositConfirmation from '../DepositConfirmation';

export default function DepositCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.DEPOSITOR}>
      <Switch>
        <Route exact={true} component={DepositAmount} path={`/deposit/${CURRENCY_ROUTE_PARAMS}`} />

        <Route
          exact={true}
          path={`/deposit/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={DepositConfirmation}
        />

        <Redirect to="/deposit" />
      </Switch>
    </PermissionWarning>
  );
}
