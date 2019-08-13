import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import {
  Wrapper,
  Input,
  SubmitButton,
  StyledLink as Link,
  Title,
  Error
} from "./Auth.components";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "./validateAuth";

import Loader from "../Loader";
import authService from "../../api/auth";
import { useAuthContext } from "./AuthContext";

function Auth(props) {
  const user = useAuthContext();
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    setHasAccount(props.location.pathname === "/login");
  }, [props.location.pathname]);

  async function authenticate() {
    try {
      hasAccount
        ? await authService.login({ email, password })
        : await authService.register({ name, email, password });
      props.history.push("/contacts");
    } catch (err) {
      console.error("Authentication Error", err);
      // setFirebaseError(err.message);
    }
  }

  const {
    values: { name, email, password },
    errors: { email: emailErr, password: passwordErr } = {},
    isSubmitting,
    handleChange,
    handleSubmit
  } = useFormValidation({
    initialState: {
      name: "",
      email: "",
      password: ""
    },
    validate: validateAuth,
    submit: authenticate
  });

  if (user.isAuthorized) {
    return <Redirect to="/contacts" />;
  } else if (user.isAuthorized === null) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Title>{hasAccount ? "Login" : "Register"}</Title>
      <form onSubmit={handleSubmit}>
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
          {isSubmitting ? <Loader alignment="0 auto" size="30" /> : "Submit"}
        </SubmitButton>
        {hasAccount
          ? !isSubmitting && (
              <Link to="/register">need to create an account?</Link>
            )
          : !isSubmitting && <Link to="/login">already have an account?</Link>}
      </form>
    </Wrapper>
  );
}

export default Auth;
