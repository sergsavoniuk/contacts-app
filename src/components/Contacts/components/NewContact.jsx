import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import contactsService from "api/contacts";
import Loader from "components/Loader";
import useFormValidation from "utils/useFormValidation";
import validateContact from "../utils/validateContact";
import ROUTES from "constants/routes";
import {
  FormWrapper,
  Input,
  Title,
  SubmitButton,
  Error,
} from "components/shared/formControls.components";
import { useAuthContext } from "components/Auth";
import { routerPropTypes } from "utils/routerPropTypes";

function NewContact(props) {
  const clientId = useRef();
  const user = useAuthContext();

  const isEditMode = useMemo(() => props.match.path === ROUTES.EditContact, [
    props.match.path,
  ]);

  const createContact = useCallback(
    async (values) => {
      const { firstName, lastName, phone, email, skype } = values;
      return await contactsService.createContact({
        parentUID: user.uid,
        firstName,
        lastName,
        phone,
        email,
        skype,
        clientId: clientId.current.value || uuidv4(),
      });
    },
    [user.uid]
  );

  const updateContact = useCallback(
    async (values) => {
      const { firstName, lastName, phone, email, skype, clientId } = values;
      const contactId = props.match.params.id;
      return await contactsService.updateContact({
        id: contactId,
        firstName,
        lastName,
        phone,
        email,
        skype,
        clientId,
      });
    },
    [props.match.params.id]
  );

  const {
    values: { firstName, lastName, phone, email, skype },
    errors: {
      firstName: firstNameErr,
      lastName: lastNameErr,
      phone: phoneErr,
      email: emailErr,
      skype: skypeErr,
    } = {},
    isSubmitting,
    setInitialValues,
    handleChange,
    handleSubmit,
  } = useFormValidation({
    initialState: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      skype: "",
    },
    validate: validateContact,
    submit: isEditMode ? updateContact : createContact,
    redirectAfterSuccess: () => props.history.push(ROUTES.ContactsList),
  });

  useEffect(() => {
    if (isEditMode) {
      contactsService
        .getContact(props.match.params.id)
        .then(({ firstName, lastName, phone, email, skype, clientId }) => {
          setInitialValues({
            firstName,
            lastName,
            phone,
            email,
            skype,
            clientId,
          });
        });
    }
  }, [isEditMode, props.match.params.id, setInitialValues]);

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
        <>
          <Input type="hidden" name="clientId" ref={clientId} />
        </>
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader alignment="0 auto" size={30} /> : "Submit"}
        </SubmitButton>
      </form>
    </FormWrapper>
  );
}

NewContact.propTypes = routerPropTypes;

export default NewContact;
