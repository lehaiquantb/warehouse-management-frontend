import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import routes from './pages/routes';
import Login from './pages/Login/index';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageRouteContainer from './containers/PageRouteContainer';
import { auth } from './redux/actions/user';
//import PrivateRoute from './containers/PrivateRoute';
import { Spin } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/index';
import './App.css';
console.log('routes', routes);
const PrivateRoute = lazy(() => import('./containers/PrivateRoute'));

function App() {
  const dispatch = useDispatch();
  const { isAuthRequesting } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(auth());
    console.log('hhh');
    //history.push('/login');
  }, []);

  return (
    <div style={{ height: '100%' }}>
      {isAuthRequesting ? (
        <div className="_center" style={{ height: '100%' }}>
          <Spin size="large" spinning={isAuthRequesting}></Spin>
        </div>
      ) : (
        <ConnectedRouter history={history}>
          <React.Suspense fallback={<Spin></Spin>}>
            <Switch>
              {routes.map(
                ({ component: Component, path, isPrivate, ...rest }) => {
                  if (!isPrivate)
                    return (
                      <Route
                        component={Component}
                        path={path}
                        key={path}
                        {...rest}
                      />
                    );
                },
              )}
              <Route component={PageRouteContainer} path="*" exact />
            </Switch>
          </React.Suspense>
        </ConnectedRouter>
      )}
    </div>
  );
}

export default App;
