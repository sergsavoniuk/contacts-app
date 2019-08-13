import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from 'components/Auth';

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        user.isAuthorized ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

export default ProtectedRoute;
