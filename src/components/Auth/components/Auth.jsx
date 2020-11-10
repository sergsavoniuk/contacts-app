import React, { useState, useEffect, useRef, useCallback } from "react";
import { Redirect } from "react-router-dom";

import SocialLinks from "./SocialLinks";
import useFormValidation from "utils/useFormValidation";
import validateAuth from "../utils/validateAuth";
import Loader from "components/Loader";
import authService from "api/auth";
import ROUTES from "constants/routes";
import {
  FormWrapper,
  Input,
  SubmitButton,
  Title,
  Error,
  ErrorAlert,
} from "components/shared/formControls.components";
import { Label, Link } from "./Auth.components";
import { useAuthContext } from "./AuthContext";
import { routerPropTypes } from "utils/routerPropTypes";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Auth(props) {
  const [hasAccount, setHasAccount] = useState(
    props.location.pathname === ROUTES.Login
  );

  const {
    values: { name, email, password },
    errors: { email: emailErr, password: passwordErr, serverError } = {},
    isSubmitting,
    setInitialValues,
    handleChange,
    handleSubmit,
  } = useFormValidation({
    initialState: INITIAL_STATE,
    validate: validateAuth,
    submit: useCallback(
      async (values) => {
        const { name, email, password } = values;
        hasAccount
          ? await authService.login({ email, password })
          : await authService.register({ name, email, password });
      },
      [hasAccount]
    ),
    redirectAfterSuccess: useCallback(
      () => props.history.push(ROUTES.ContactsList),
      [props.history]
    ),
  });

  const prevPathname = useRef(null);
  useEffect(() => {
    const currentPathname = props.location.pathname;
    setHasAccount(currentPathname === ROUTES.Login);
    if (
      prevPathname.current !== null &&
      prevPathname.current !== currentPathname
    ) {
      setInitialValues(INITIAL_STATE);
    }

    prevPathname.current = currentPathname;
  }, [props.location.pathname, setInitialValues]);

  const handleSignInThroughSocials = useCallback(async (providerName) => {
    await authService.authenticateThroughSocials(providerName);
  }, []);

  const user = useAuthContext();

  if (user.isAuthorized) {
    return <Redirect to={ROUTES.ContactsList} />;
  } else if (user.isAuthorized === null) {
    return <Loader />;
  }

  return (
    <FormWrapper>
      <Title>{hasAccount ? "Login" : "Register"}</Title>
      {serverError && <ErrorAlert role="alert">{serverError}</ErrorAlert>}
      <SocialLinks onSignIn={handleSignInThroughSocials} />
      <form onSubmit={handleSubmit}>
        <Label>or through email</Label>
        {!hasAccount && (
          <Input
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
            disabled={isSubmitting}
          />
        )}
        <>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email"
            disabled={isSubmitting}
            error={emailErr}
          />
          {emailErr && <Error>{emailErr}</Error>}
        </>
        <>
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            disabled={isSubmitting}
            error={passwordErr}
          />
          {passwordErr && <Error>{passwordErr}</Error>}
        </>
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader alignment="0 auto" size={30} /> : "Submit"}
        </SubmitButton>
        {hasAccount
          ? !isSubmitting && (
              <Link to={ROUTES.Register}>need to create an account?</Link>
            )
          : !isSubmitting && (
              <Link to={ROUTES.Login}>already have an account?</Link>
            )}
      </form>
    </FormWrapper>
  );
}

Auth.propTypes = routerPropTypes;

export default Auth;
