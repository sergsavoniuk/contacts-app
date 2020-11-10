export default function extractFromCmapContactsontact(contacts) {
  return contacts.map(
    ({ id, firstName, lastName, phone, email, skype, clientId }) => ({
      id,
      name: `${firstName} ${lastName}`,
      phone,
      email,
      skype,
      clientId,
    })
  );
}
