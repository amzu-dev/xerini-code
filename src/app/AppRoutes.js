import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import Profile from './profile/Profile';
import PrivateRouter from './shared/PrivateRouter';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Login = lazy(() => import('./user-pages/Login'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <PrivateRouter exact path="/dashboard" component={ Dashboard } />
          <PrivateRouter path="/profile" component={ Profile } />
          <Route path="/" component={ Login } />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;