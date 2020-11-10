export function validateEmail(email) {
  let error = null;

  if (!email) {
    error = "Email is required";
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    error = "Invalid email address";
  }

  return error;
}

export function validatePassword(password) {
  let error = null;

  if (!password) {
    error = "Password is required";
  } else if (password.length < 6) {
    error = "Password must be at least 6 characters";
  }

  return error;
}

export default function validateUser({ email, password }) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}
