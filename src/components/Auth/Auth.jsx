import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import {
  Wrapper,
  Input,
  SubmitButton,
  StyledLink as Link,
  Title
} from "./Auth.components";
import useFormValidation from "./useFormValidation";

import Loader from "../Loader/Loader";
import authService from "../../api/auth";
import { useAuthContext } from "./AuthContext";

function Auth(props) {
  const user = useAuthContext();
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    setHasAccount(props.location.pathname === "/login");
  }, [props.location.pathname]);

  async function authenticate() {
    const { name, email, password } = values;
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
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useFormValidation({
    initialState: {
      name: "",
      email: "",
      password: ""
    },
    validate: () => {},
    authenticate
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
            disabled={isSubmitting}
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        )}

        <Input
          disabled={isSubmitting}
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Input
          disabled={isSubmitting}
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter password"
        />
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
