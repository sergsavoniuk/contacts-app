import React from "react";
import { Link } from "react-router-dom";
import "styled-components/macro";

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
  RemoveButton
} from "./ContactsList.components";

const contacts = [
  {
    id: 1,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  },
  {
    id: 2,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  },
  {
    id: 3,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  },
  {
    id: 4,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  },
  {
    id: 5,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  },
  {
    id: 6,
    name: "Siarhei Savaniuk",
    phone: "+375292245162",
    email: "sergsavoniuk@gmail.com",
    skype: "sergeisavonuik"
  }
];

function ContactsList() {
  return (
    <Wrapper>
      <NewContact>
        <Link to="/contacts/new">Add Contact</Link>
      </NewContact>
      <h1>Contacts List</h1>
      <Grid>
        {contacts.map(({ id, ...rest }) => (
          <ContactCard key={id}>
            <Row css="display: flex; justify-content: flex-end">
              <EditButton
                imgUrl={`${process.env.PUBLIC_URL}/assets/edit_icon.png`}
              />
              <RemoveButton
                imgUrl={`${process.env.PUBLIC_URL}/assets/remove_icon.png`}
              />
            </Row>
            <Avatar />
            {Object.keys(rest).map(key => (
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
        ))}
      </Grid>
    </Wrapper>
  );
}

export default ContactsList;
