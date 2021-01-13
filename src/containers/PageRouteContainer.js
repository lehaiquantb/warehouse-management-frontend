import React, { Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// import ErrorNotFound from '../components/common/ErrorNotFound';

import LayoutMenu from './LayoutMenu';
import { Spin } from 'antd';
import PrivateRoute from './PrivateRoute';
import routes from '../pages/routes';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/index';

// const Rooms = lazy( () => import("routers/RoomsRoute"));
// const Deveices = lazy( () => import("routers/DeveicesRoute"));
// const Profile = lazy( () => import("routers/ProfileRoute"));
// const Test = lazy( () => import("components/Test"));

function PageRouteContainer(props) {
  return (
    <LayoutMenu>
      <ConnectedRouter history={history}>
        <Suspense fallback={<Spin />}>
          <Switch>
            {routes.map(
              ({ component: Component, path, isPrivate, ...rest }) => {
                if (isPrivate)
                  return (
                    <PrivateRoute
                      key={path}
                      component={Component}
                      exact
                      path={path}
                    />
                  );
              },
            )}
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </LayoutMenu>
  );
}

export default PageRouteContainer;
