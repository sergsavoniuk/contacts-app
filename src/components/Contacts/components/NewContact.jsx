import React, { useEffect, useMemo } from 'react';

import contactsService from 'api/contacts';
import Loader from 'components/Loader';
import useFormValidation from 'utils/useFormValidation';
import validateContact from '../utils/validateContact';
import {
  FormWrapper,
  Input,
  Title,
  SubmitButton,
  Error
} from 'components/shared/formControls.components';
import { useAuthContext } from 'components/Auth';

function NewContact(props) {
  const user = useAuthContext();

  const isEditMode = useMemo(() => props.match.path === '/contacts/:id/edit', [
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
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      skype: ''
    },
    validate: validateContact,
    submit: isEditMode ? updateContact : createContact,
    redirectAfterSuccess: () => props.history.push('/contacts')
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
    return await contactsService.createContact({
      parentUID: user.uid,
      firstName,
      lastName,
      phone,
      email,
      skype
    });
  }

  async function updateContact() {
    return await contactsService.updateContact({
      id: props.match.params.id,
      firstName,
      lastName,
      phone,
      email,
      skype
    });
  }

  return (
    <FormWrapper>
      <Title>{isEditMode ? 'Edit Contact' : 'Add Contact'}</Title>
      <form onSubmit={handleSubmit}>
        <>
          <Input
            name='firstName'
            value={firstName}
            onChange={handleChange}
            placeholder='First name'
            disabled={isSubmitting}
            error={firstNameErr}
          />
          {firstNameErr && <Error>{firstNameErr}</Error>}
        </>
        <>
          <Input
            name='lastName'
            value={lastName}
            onChange={handleChange}
            placeholder='Last name'
            disabled={isSubmitting}
            error={lastNameErr}
          />
          {lastNameErr && <Error>{lastNameErr}</Error>}
        </>
        <>
          <Input
            name='phone'
            value={phone}
            onChange={handleChange}
            placeholder='Phone number'
            disabled={isSubmitting}
            error={phoneErr}
          />
          {phoneErr && <Error>{phoneErr}</Error>}
        </>
        <>
          <Input
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='Email'
            disabled={isSubmitting}
            error={emailErr}
          />
          {emailErr && <Error>{emailErr}</Error>}
        </>
        <>
          <Input
            name='skype'
            value={skype}
            onChange={handleChange}
            placeholder='Skype'
            disabled={isSubmitting}
            error={skypeErr}
          />
          {skypeErr && <Error>{skypeErr}</Error>}
        </>
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader alignment='0 auto' size='30' /> : 'Submit'}
        </SubmitButton>
      </form>
    </FormWrapper>
  );
}

export default NewContact;
