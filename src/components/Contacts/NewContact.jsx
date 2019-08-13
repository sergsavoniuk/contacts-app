import React from "react";

import {
  FormWrapper,
  Input,
  Title,
  SubmitButton
} from "./ContactsList.components";
import useFormValidation from "../../utils/useFormValidation";

function NewContact() {
  const {
    values: { firstName, lastName, phone, email, skype },
    errors: {
      firstName: firstNameErr,
      lastName: lastNameErr,
      phone: phoneErr,
      email: emailErr,
      skype: skypeErr
    } = {},
    isSubmitting,
    handleChange,
    handleSubmit
  } = useFormValidation({
    initialState: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      skype: ""
    },
    validate: () => {},
    authenticate: () => {}
  });

  return (
    <FormWrapper>
      <Title>Add Contact</Title>
      <form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="First name"
          disabled={isSubmitting}
          error={firstNameErr}
        />
        <Input
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Last name"
          disabled={isSubmitting}
          error={lastNameErr}
        />
        <Input
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Phone number"
          disabled={isSubmitting}
          error={phoneErr}
        />
        <Input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          disabled={isSubmitting}
          error={emailErr}
        />
        <Input
          name="skype"
          value={skype}
          onChange={handleChange}
          placeholder="Skype"
          disabled={isSubmitting}
          error={skypeErr}
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
}

export default NewContact;
