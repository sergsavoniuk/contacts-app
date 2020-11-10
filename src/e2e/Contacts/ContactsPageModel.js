import { Selector, t, ClientFunction } from "testcafe";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";

class ContactsPageModel {
  constructor() {
    this.inputs = {
      firstName: Selector('input[name="firstName"]'),
      lastName: Selector('input[name="lastName"]'),
      phone: Selector('input[name="phone"]'),
      email: Selector('input[name="email"]'),
      skype: Selector('input[name="skype"]'),
    };

    this.searchContactInput = Selector('input[name="search-contact"');

    this.notFoundContainer = Selector('[data-testid="not-found"]');

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
    // set the value in the hidden input
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
    await t.click(
      Selector(`div[data-testid="${clientId}"]`).find(this.buttons.remove)
    );
  }

  async clickOnAddContactButton() {
    await t.click(this.buttons.add);
  }

  async clickOnEditContactButton(clientId) {
    await t.click(
      Selector(`div[data-testid="${clientId}"]`).find(this.buttons.edit)
    );
  }

  async assertIfNewContactAppearedInTheList({ clientId, ...contact }) {
    const contactCard = await Selector(`div[data-testid="${clientId}"]`);

    for (const key of Object.keys(contact)) {
      await t
        .expect(contactCard.find("span").withText(contact[key]).exists)
        .ok();
    }
  }

  async assertIfContactUpdatedInTheList(contact) {
    await this.assertIfNewContactAppearedInTheList(contact);
  }

  async assertIfContactRemovedFromTheList(clientId) {
    await t.expect(Selector(`div[data-testid="${clientId}"]`).exists).notOk();
  }

  async assertIfSpinnerIsVisible() {
    await t
      .expect(Selector('[data-testid="spinner"]').exists)
      .ok({ timeout: 3000 });
  }

  async assertIfFormInputsAreDisabled() {
    for (const key of Object.keys(this.inputs)) {
      await t.expect(this.inputs[key].hasAttribute("disabled")).ok();
    }
  }

  async assertIfFormInputsAreEmpty() {
    for (const key of Object.keys(this.inputs)) {
      await t.expect(this.inputs[key].value).eql("");
    }
  }

  async assertIfErrorsAreVisible() {
    for (const key of Object.keys(this.errors)) {
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

export default new ContactsPageModel();
