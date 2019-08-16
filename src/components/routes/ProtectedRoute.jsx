import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { object, bool, string, shape } from 'prop-types';

import ROUTES from 'constants/routes';
import { useAuthContext } from 'components/Auth';

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        user.isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.Login} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  component: object.isRequired,
  rest: shape({
    computedMatch: object.isRequired,
    exact: bool.isRequired,
    location: object.isRequired,
    path: string.isRequired
  })
};

export default ProtectedRoute;
