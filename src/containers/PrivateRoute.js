import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getCookie } from 'utils/cookie';

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  //   const token = getCookie('token');
  //const authen = checkToken(token);
  //   console.log('authen: ' + authen);
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        return isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: history.location },
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
