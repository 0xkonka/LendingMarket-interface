import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './Layout';

export default function ArbAirdrop() {
  return (
    <Switch>
      <Route exact={true} path="/arb-airdrop" component={Layout} />

      <Redirect to="/dashboard" />
    </Switch>
  );
}
