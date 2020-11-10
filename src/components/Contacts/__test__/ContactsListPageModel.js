import { Selector, t, ClientFunction } from "testcafe";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";

const getPageURL = ClientFunction(() => window.location.href);

class ContactsListPageModel {
  constructor() {
    this.inputs = {
      firstName: Selector('input[name="firstName"]'),
      lastName: Selector('input[name="lastName"]'),
      phone: Selector('input[name="phone"]'),
      email: Selector('input[name="email"]'),
      skype: Selector('input[name="skype"]'),
    };

    this.searchContactInput = Selector('input[name="search-contact"');

    this.buttons = {
      submit: Selector("button").withText(/submit/i),
      edit: 'button[aria-label="edit"]',
      remove: 'button[aria-label="remove"]',
      add: Selector("a").withText(/add contact/i),
    };

    this.errors = {
      requiredFirstName: Selector("span").withText(/first name is required/i),
      requiredLastName: Selector("span").withText(/last name is required/i),
      requiredEmail: Selector("span").withText(/email is required/i),
    };
  }

  async createContact({ firstName, lastName, phone, email, skype, clientId }) {
    await ClientFunction(
      () => {
        // eslint-disable-next-line no-undef
        document.querySelector('input[type="hidden"]').value = value;
      },
      { dependencies: { value: clientId } }
    )();

    await t
      .typeText(this.inputs.firstName, firstName)
      .typeText(this.inputs.lastName, lastName)
      .typeText(this.inputs.phone, phone)
      .typeText(this.inputs.email, email)
      .typeText(this.inputs.skype, skype)
      .click(this.buttons.submit);
  }

  async updateContact(contact) {
    await t
      .typeText(this.inputs.firstName, contact.firstName, { replace: true })
      .click(this.buttons.submit);
  }

  async removeContact(clientId) {
    return await t.click(
      Selector(`div[data-testid="${clientId}"]`).find(this.buttons.remove)
    );
  }

  async clickOnAddContactButton() {
    await t
      .click(this.buttons.add)
      .expect(getPageURL())
      .contains("/contacts/new");
  }

  async clickOnEditContactButton(clientId) {
    await t
      .click(Selector(`div[data-testid="${clientId}"]`).find(this.buttons.edit))
      .expect(getPageURL())
      .contains("edit");
  }

  async assertIfFormInputsAreDisabled() {
    const inputsKeys = Object.keys(this.inputs);

    for (const key of inputsKeys) {
      await t.expect(this.inputs[key].hasAttribute("disabled")).ok();
    }
  }

  async assertIfSpinnerIsVisible() {
    await t
      .expect(Selector('[data-testid="spinner"]').exists)
      .ok({ timeout: 3000 });
  }

  async assertIfNewContactAppearedInTheList({
    firstName,
    lastName,
    phone,
    email,
    skype,
    clientId,
  }) {
    const contactCard = await Selector(`div[data-testid="${clientId}"]`);

    await t
      .expect(contactCard.find("span").withText(firstName).exists)
      .ok()
      .expect(contactCard.find("span").withText(lastName).exists)
      .ok()
      .expect(contactCard.find("span").withText(phone).exists)
      .ok()
      .expect(contactCard.find("span").withText(email).exists)
      .ok()
      .expect(contactCard.find("span").withText(skype).exists)
      .ok();
  }

  async assertIfContactUpdatedInTheList(contact) {
    this.assertIfNewContactAppearedInTheList(contact);
  }

  async assertIfContactRemovedFromTheList(clientId) {
    await t.expect(Selector(`div[data-testid="${clientId}"`).exists).notOk();
  }

  async assertIfFormInputsAreEmpty() {
    const inputsKeys = Object.keys(this.inputs);

    for (const key of inputsKeys) {
      await t.expect(this.inputs[key].value).eql("");
    }
  }

  async assertIfErrorsAreVisible() {
    const errorsKeys = Object.keys(this.errors);

    for (const key of errorsKeys) {
      await t.expect(this.errors[key].exists).ok();
    }
  }
}

export function generateFakeContact() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(),
    skype: faker.internet.email(),
    clientId: uuidv4(),
  };
}

export default new ContactsListPageModel();
