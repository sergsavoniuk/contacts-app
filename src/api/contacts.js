import firebase from "../firebase/firebase";

const CONTACTS_COLLECTION = "contacts";

class ContactsService {
  async createContact(contact) {
    return firebase.db
      .collection(CONTACTS_COLLECTION)
      .add({ ...contact, createAt: Date.now() });
  }

  async getContacts(userId) {
    const querySnapshot = await firebase.db
      .collection(CONTACTS_COLLECTION)
      .where("parentUID", "==", userId)
      .orderBy("createAt", "asc")
      .get();

    const contacts = [];
    querySnapshot.forEach((doc) =>
      contacts.push({ id: doc.id, ...doc.data() })
    );

    return contacts;
  }

  async searchContacts(userId, contact) {
    if (contact.length > 0) {
      const contacts = [];

      const querySnapshotByFirstName = await firebase.db
        .collection(CONTACTS_COLLECTION)
        .where("parentUID", "==", userId)
        .orderBy("firstName")
        .startAt(contact)
        .endAt(contact + "\uf8ff")
        .get();

      querySnapshotByFirstName.forEach((doc) =>
        contacts.push({ id: doc.id, ...doc.data() })
      );

      const querySnapshotByLastName = await firebase.db
        .collection(CONTACTS_COLLECTION)
        .where("parentUID", "==", userId)
        .orderBy("lastName")
        .startAt(contact)
        .endAt(contact + "\uf8ff")
        .get();

      querySnapshotByLastName.forEach((doc) => {
        if (!contacts.find((contact) => contact.id === doc.id)) {
          contacts.push({ id: doc.id, ...doc.data() });
        }
      });

      return contacts;
    }
    return this.getContacts(userId);
  }

  async getContact(docId) {
    const contact = await firebase.db
      .collection(CONTACTS_COLLECTION)
      .doc(docId)
      .get();
    return { id: contact.id, ...contact.data() };
  }

  async removeContact(docId) {
    return await firebase.db
      .collection(CONTACTS_COLLECTION)
      .doc(docId)
      .delete();
  }

  async updateContact({ id: docId, ...rest }) {
    return firebase.db
      .collection(CONTACTS_COLLECTION)
      .doc(docId)
      .set(rest, { merge: true });
  }
}

const contactsService = new ContactsService();
export default contactsService;
