import { Switch, Route, Redirect } from 'react-router-dom';

import ManagerRadiantMain from './screens/ManageRadiantMain';

export default function ManageRadiant() {
  return (
    <Switch>
      <Route exact={true} path="/manage-radiant" component={ManagerRadiantMain} />

      <Redirect to="/borrow" />
    </Switch>
  );
}
