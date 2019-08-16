import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'components/Loader';
import Auth, { useAuthContext } from 'components/Auth';
import ProtectedRoute from './ProtectedRoute';
import ROUTES from 'constants/routes';

const ContactsList = lazy(() =>
  import(/* webpackChunkName: "ContactsList" */ 'components/Contacts')
);

const NewContact = lazy(() =>
  import(
    /* webpackChunkName: "NewContact" */ 'components/Contacts/components/NewContact'
  )
);

function Routes() {
  const user = useAuthContext();

  if (user.isAuthorized === null) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          exact
          path={ROUTES.Root}
          render={() => {
            const redirectTo = user.isAuthorized
              ? ROUTES.ContactsList
              : ROUTES.Login;
            return <Redirect to={redirectTo} />;
          }}
        />
        <Route path={ROUTES.Login} component={Auth} />
        <Route path={ROUTES.Register} component={Auth} />
        <ProtectedRoute
          exact
          path={ROUTES.ContactsList}
          component={ContactsList}
        />
        <ProtectedRoute path={ROUTES.NewContact} component={NewContact} />
        <ProtectedRoute path={ROUTES.EditContact} component={NewContact} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
