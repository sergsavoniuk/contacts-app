import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'components/Loader';
import Auth, { useAuthContext } from 'components/Auth';
import ProtectedRoute from './ProtectedRoute';

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
          path='/'
          render={() => {
            const redirectTo = user.isAuthorized ? '/contacts' : '/login';
            return <Redirect to={redirectTo} />;
          }}
        />
        <Route path='/login' component={Auth} />
        <Route path='/register' component={Auth} />
        <ProtectedRoute exact path='/contacts' component={ContactsList} />
        <ProtectedRoute path='/contacts/new' component={NewContact} />
        <ProtectedRoute path='/contacts/:id/edit' component={NewContact} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
