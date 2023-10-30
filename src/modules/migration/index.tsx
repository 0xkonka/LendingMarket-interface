import { Switch, Route, Redirect } from 'react-router-dom';

import MigrationDataHoc from 'libs/migration-provider/MigrationDataHoc';
import MigrationMain from './screens/MigrationMain';

export default function Migration() {
  return (
    <MigrationDataHoc>
      <Switch>
        <Route exact={true} path="/migration" component={MigrationMain} />

        <Redirect to="/dashboard" />
      </Switch>
    </MigrationDataHoc>
  );
}
