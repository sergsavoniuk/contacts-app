export default function extractFromCmapContactsontact(contacts) {
  return contacts.map(({ id, firstName, lastName, phone, email, skype }) => ({
    id,
    name: `${firstName} ${lastName}`,
    phone,
    email,
    skype
  }));
}
