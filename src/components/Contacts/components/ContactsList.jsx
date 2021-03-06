import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "styled-components/macro";

import contactsService from "api/contacts";
import ROUTES from "constants/routes";
import Loader from "components/Loader";
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
  Title,
  NotFound,
} from "./ContactsList.components";
import SearchContacts from "./SearchContacts";
import mapContacts from "../utils/mapContacts";
import { useAuthContext } from "components/Auth";
import { routerPropTypes } from "utils/routerPropTypes";

const ASSETS_PATH = `${process.env.PUBLIC_URL}/assets`;

function ContactsList(props) {
  const user = useAuthContext();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      contactsService.getContacts(user.uid).then((contacts) => {
        setContacts(mapContacts(contacts));
        setLoading(false);
      });
    } catch (error) {
      // TODO: Catch firebase errors
      setLoading(false);
    }
  }, [user.uid]);

  async function handleRemoveContact(docId) {
    try {
      await contactsService.removeContact(docId);
      setContacts((contacts) =>
        contacts.filter((contact) => contact.id !== docId)
      );
    } catch (error) {
      // TODO: Catch firebase errors
    }
  }

  const handleSearchContacts = useCallback(
    async (contact) => {
      try {
        setLoading(true);
        const contacts = await contactsService.searchContacts(
          user.uid,
          contact
        );
        setContacts(mapContacts(contacts));
      } catch (error) {
        // TODO: Catch firebase error
      } finally {
        setLoading(false);
      }
    },
    [user.uid]
  );

  return (
    <Wrapper>
      <Title>Contacts List</Title>
      <NewContact>
        <Link to={ROUTES.NewContact}>Add Contact +</Link>
      </NewContact>
      <SearchContacts onSearch={handleSearchContacts} />
      {loading ? (
        <Loader />
      ) : (
        <Grid data-testid="contacts">
          {!loading && contacts.length > 0 ? (
            contacts.map(({ id, clientId, ...rest }) => (
              <ContactCard key={id} data-testid={clientId}>
                <Row css="display: flex; justify-content: flex-end">
                  <EditButton
                    aria-label="edit"
                    imgUrl={`${ASSETS_PATH}/edit_icon.png`}
                    onClick={() => props.history.push(`/contacts/${id}/edit`)}
                  />
                  <RemoveButton
                    aria-label="remove"
                    imgUrl={`${ASSETS_PATH}/remove_icon.png`}
                    onClick={() => handleRemoveContact(id)}
                  />
                </Row>
                <Avatar />
                {Object.keys(rest).map((key) => (
                  <Row key={key}>
                    {key === "name" ? (
                      <NameIcon />
                    ) : key === "phone" ? (
                      <PhoneIcon />
                    ) : key === "email" ? (
                      <EmailIcon />
                    ) : key === "skype" ? (
                      <SkypeIcon />
                    ) : null}
                    <Text>{rest[key]}</Text>
                  </Row>
                ))}
              </ContactCard>
            ))
          ) : (
            <NotFound data-testid="not-found">Contacts not found</NotFound>
          )}
        </Grid>
      )}
    </Wrapper>
  );
}

ContactsList.propTypes = routerPropTypes;

export default ContactsList;
