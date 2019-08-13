import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'styled-components/macro';

import {
  Wrapper,
  NewContact,
  Grid,
  ContactCard,
  Avatar,
  NameIcon,
  PhoneIcon,
  EmailIcon,
  SkypeIcon,
  Text,
  Row,
  EditButton,
  RemoveButton,
  Title
} from './ContactsList.components';
import contactsService from 'api/contacts';
import { useAuthContext } from 'components/Auth';
import Loader from 'components/Loader';

function ContactsList(props) {
  const user = useAuthContext();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contactsService.getContacts(user.uid).then(contacts => {
      setContacts(
        contacts.map(({ id, firstName, lastName, phone, email, skype }) => ({
          id,
          name: `${firstName} ${lastName}`,
          phone,
          email,
          skype
        }))
      );
      setLoading(false);
    });
  }, [user.uid]);

  function handleRemoveContact(docId) {
    try {
      contactsService.removeContact(docId);
      setContacts(contacts => contacts.filter(contact => contact.id !== docId));
    } catch (error) {}
  }

  return loading ? (
    <Loader />
  ) : (
    <Wrapper>
      <Title>Contacts List</Title>
      <NewContact>
        <Link to='/contacts/new'>Add Contact +</Link>
      </NewContact>
      <Grid>
        {contacts.map(({ id, ...rest }) => (
          <ContactCard key={id}>
            <Row css='display: flex; justify-content: flex-end'>
              <EditButton
                imgUrl={`${process.env.PUBLIC_URL}/assets/edit_icon.png`}
                onClick={() => props.history.push(`/contacts/${id}/edit`)}
              />
              <RemoveButton
                imgUrl={`${process.env.PUBLIC_URL}/assets/remove_icon.png`}
                onClick={() => handleRemoveContact(id)}
              />
            </Row>
            <Avatar />
            {Object.keys(rest).map(key => (
              <Row key={key}>
                {key === 'name' ? (
                  <NameIcon />
                ) : key === 'phone' ? (
                  <PhoneIcon />
                ) : key === 'email' ? (
                  <EmailIcon />
                ) : key === 'skype' ? (
                  <SkypeIcon />
                ) : null}
                <Text>{rest[key]}</Text>
              </Row>
            ))}
          </ContactCard>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default ContactsList;