import { Redirect, Switch, Route } from 'react-router-dom';
import { PERMISSION } from '@radiantcapital/contract-helpers';

import { CURRENCY_ROUTE_PARAMS } from 'helpers/router-types';
import PermissionWarning from 'ui-config/branding/PermissionWarning';
import BorrowAmount from '../BorrowAmount';
import BorrowConfirmation from '../BorrowConfirmation';

export default function BorrowCurrency() {
  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <Switch>
        <Route exact={true} component={BorrowAmount} path={`/borrow/${CURRENCY_ROUTE_PARAMS}`} />

        <Route
          exact={true}
          path={`/borrow/${CURRENCY_ROUTE_PARAMS}/confirmation`}
          component={BorrowConfirmation}
        />

        <Redirect to="/borrow" />
      </Switch>
    </PermissionWarning>
  );
}
