import { validateEmail } from "components/Auth";

export function validatePhone(phone) {
  let error = null;

  // TODO: add phone validation

  return error;
}

export function isRequired({ label, value }) {
  return !value ? `${label} is required` : null;
}

export function validateFirstName(firstName) {
  return isRequired({ label: "First name", value: firstName });
}

export function validateLastName(lastName) {
  return isRequired({ label: "Last name", value: lastName });
}

export default function validateContact({ firstName, lastName, phone, email }) {
  const errors = {};

  const firstNameError = validateFirstName(firstName);
  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  const lastNameError = validateLastName(lastName);
  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  const phoneError = validatePhone(phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}
