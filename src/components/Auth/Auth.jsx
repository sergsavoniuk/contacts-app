import React, { useState, useEffect } from "react";

import {
  Wrapper,
  Input,
  SubmitButton,
  StyledLink as Link,
  Title
} from "./Auth.components";
import useFormValidation from "./useFormValidation";

import authService from "../../api/auth";

function Auth(props) {
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
      console.log("Successfully registered");
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

  return (
    <Wrapper>
      <Title>{hasAccount ? "Login" : "Register"}</Title>
      <form onSubmit={handleSubmit}>
        {!hasAccount && (
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        )}

        <Input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Input
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter password"
        />
        <SubmitButton>Submit</SubmitButton>
        {hasAccount ? (
          <Link to="/register">need to create an account?</Link>
        ) : (
          <Link to="/login">already have an account?</Link>
        )}
      </form>
    </Wrapper>
  );
}

export default Auth;
