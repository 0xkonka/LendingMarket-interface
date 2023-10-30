import { Switch, Route, Redirect } from 'react-router-dom';

import LoopMain from './screens/LoopMain';

export default function Borrow() {
  return (
    <Switch>
      <Route exact={true} path="/loop" component={LoopMain} />

      <Redirect to="/borrow" />
    </Switch>
  );
}
