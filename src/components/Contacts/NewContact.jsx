import React, { useEffect, useMemo } from "react";

import {
  FormWrapper,
  Input,
  Title,
  SubmitButton,
  Error
} from "../shared/formControls.components";
import useFormValidation from "../../utils/useFormValidation";
import validateContact from "./validateContact";
import { useAuthContext } from "../Auth/AuthContext";
import contactsService from "../../api/contacts";
import { NameIcon } from "./ContactsList.components";

function NewContact(props) {
  const user = useAuthContext();

  const isEditMode = useMemo(() => props.match.path === "/contacts/:id/edit", [
    props.match.path
  ]);

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
    setInitialValues,
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
    submit: isEditMode ? updateContact : createContact
  });

  useEffect(() => {
    if (isEditMode) {
      contactsService
        .getContact(props.match.params.id)
        .then(({ firstName, lastName, phone, email, skype }) => {
          setInitialValues({
            firstName,
            lastName,
            phone,
            email,
            skype
          });
        });
    }
  }, [isEditMode, props.match.params.id]);

  async function createContact() {
    try {
      contactsService.createContact({
        parentUID: user.uid,
        firstName,
        lastName,
        phone,
        email,
        skype
      });
      props.history.push("/contacts");
    } catch (error) {
      console.error(error);
    }
  }

  async function updateContact() {
    try {
      contactsService.updateContact({
        id: props.match.params.id,
        firstName,
        lastName,
        phone,
        email,
        skype
      });
      props.history.push("/contacts");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FormWrapper>
      <Title>{isEditMode ? "Edit Contact" : "Add Contact"}</Title>
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
