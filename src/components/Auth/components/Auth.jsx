import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useFormValidation from 'utils/useFormValidation';
import validateAuth from '../utils/validateAuth';
import Loader from 'components/Loader';
import authService from 'api/auth';
import {
  FormWrapper,
  Input,
  SubmitButton,
  Title,
  Error,
  ErrorAlert
} from 'components/shared/formControls.components';
import { Link } from './Auth.components';
import { useAuthContext } from './AuthContext';

function Auth(props) {
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    setHasAccount(props.location.pathname === '/login');
  }, [props.location.pathname]);

  async function authenticate() {
    hasAccount
      ? await authService.login({ email, password })
      : await authService.register({ name, email, password });
  }

  const {
    values: { name, email, password },
    errors: { email: emailErr, password: passwordErr, serverError } = {},
    isSubmitting,
    handleChange,
    handleSubmit
  } = useFormValidation({
    initialState: {
      name: '',
      email: '',
      password: ''
    },
    validate: validateAuth,
    submit: authenticate,
    redirectAfterSuccess: () => props.history.push('/contacts')
  });

  const user = useAuthContext();

  if (user.isAuthorized) {
    return <Redirect to='/contacts' />;
  } else if (user.isAuthorized === null) {
    return <Loader />;
  }

  return (
    <FormWrapper>
      <Title>{hasAccount ? 'Login' : 'Register'}</Title>
      {serverError && <ErrorAlert>{serverError}</ErrorAlert>}
      <form onSubmit={handleSubmit}>
        {!hasAccount && (
          <Input
            name='name'
            value={name}
            onChange={handleChange}
            placeholder='Enter name'
            disabled={isSubmitting}
          />
        )}
        <>
          <Input
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='Enter email'
            disabled={isSubmitting}
            error={emailErr}
          />
          {emailErr && <Error>{emailErr}</Error>}
        </>
        <>
          <Input
            name='password'
            value={password}
            onChange={handleChange}
            type='password'
            placeholder='Enter password'
            disabled={isSubmitting}
            error={passwordErr}
          />
          {passwordErr && <Error>{passwordErr}</Error>}
        </>
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader alignment='0 auto' size='30' /> : 'Submit'}
        </SubmitButton>
        {hasAccount
          ? !isSubmitting && (
              <Link to='/register'>need to create an account?</Link>
            )
          : !isSubmitting && <Link to='/login'>already have an account?</Link>}
      </form>
    </FormWrapper>
  );
}

export default Auth;
