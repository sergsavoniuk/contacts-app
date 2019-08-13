import React from "react";

import {
  FormWrapper,
  Input,
  Title,
  SubmitButton,
  Error
} from "../shared/formControls.components";
import useFormValidation from "../../utils/useFormValidation";
import validateContact from "./validateContact";

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
    validate: validateContact,
    authenticate: () => {}
  });

  return (
    <FormWrapper>
      <Title>Add Contact</Title>
      <form onSubmit={handleSubmit}>
        <>
          <Input
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First name"
            disabled={isSubmitting}
            error={firstNameErr}
          />
          {firstNameErr && <Error>{firstNameErr}</Error>}
        </>
        <>
          <Input
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last name"
            disabled={isSubmitting}
            error={lastNameErr}
          />
          {lastNameErr && <Error>{lastNameErr}</Error>}
        </>
        <>
          <Input
            name="phone"
            value={phone}
            onChange={handleChange}
            placeholder="Phone number"
            disabled={isSubmitting}
            error={phoneErr}
          />
          {phoneErr && <Error>{phoneErr}</Error>}
        </>
        <>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isSubmitting}
            error={emailErr}
          />
          {emailErr && <Error>{emailErr}</Error>}
        </>
        <>
          <Input
            name="skype"
            value={skype}
            onChange={handleChange}
            placeholder="Skype"
            disabled={isSubmitting}
            error={skypeErr}
          />
          {skypeErr && <Error>{skypeErr}</Error>}
        </>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
}

export default NewContact;
