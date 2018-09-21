import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Transitions from './services/transitions';
import { AuthenticatedRoute } from './services/utils';
import Page1View from './views/Page1View';
import Page2View from './views/Page2View';
import LoginView from './views/LoginView';

const Routes = props => (
  <Transitions
    pageKey={props.location.pathname}
    transition="pageSliderRight"
    duration={{ enter: 600, exit: 600 }}
    {...props.location.state}
  >
    <Switch location={props.location}>
      <AuthenticatedRoute exact path="/" component={Page1View} {...props} />
      <AuthenticatedRoute exact path="/page2" component={Page2View} {...props} />
      <Route exact path="/login" render={() => <LoginView {...props} />} />
    </Switch>
  </Transitions>
);

export default withRouter(Routes);
