/* eslint-disable no-undef */
import { Selector, ClientFunction } from "testcafe";
import faker from "faker";

import pageModel, { generateFakeContact } from "./ContactsListPageModel";
import authPageModel from "../../Auth/__test__/AuthPageModel";

const getPageURL = ClientFunction(() => window.location.href);

fixture`Contacts List functionality`.page("http://localhost:3000/contacts");

test.before(async () => {
  if ((await getPageURL()).includes("/login")) {
    await authPageModel.login({
      email: "test@testcafe.com",
      password: "123456",
    });
  }
})("CRUD operations + searching", async (t) => {
  await pageModel.clickOnAddContactButton();
  await pageModel.assertIfFormInputsAreEmpty();
  await t.click(pageModel.buttons.submit);
  await pageModel.assertIfErrorsAreVisible();

  // Creating contacts

  let contact = generateFakeContact();

  const createContact = async (contact) => {
    await pageModel.createContact(contact);
    // await pageModel.assertIfSpinnerIsVisible();
    // await pageModel.assertIfFormInputsAreDisabled();
    await t.expect(getPageURL()).contains("/contacts");
    await pageModel.assertIfNewContactAppearedInTheList(contact);
  };

  await createContact(contact);

  await pageModel.clickOnAddContactButton();

  contact = generateFakeContact();
  await createContact(contact);

  // Updating contact

  await pageModel.clickOnEditContactButton(contact.clientId);

  await t
    .click(pageModel.inputs.firstName)
    .pressKey("ctrl+a delete")
    .click(pageModel.buttons.submit)
    .expect(pageModel.errors.requiredFirstName.exists)
    .ok();

  const updatedContact = {
    ...contact,
    firstName: faker.name.firstName(),
  };

  await pageModel.updateContact(updatedContact);

  await pageModel.assertIfSpinnerIsVisible();
  // await pageModel.assertIfFormInputsAreDisabled();

  await t.expect(getPageURL()).contains("/contacts");

  await pageModel.assertIfContactUpdatedInTheList(updatedContact);

  // Searching for contact

  await t.typeText(pageModel.searchContactInput, "Unknown user");
  await pageModel.assertIfSpinnerIsVisible();
  await t.expect(Selector('[data-testid="not-found"]').exists).ok();
  await t.typeText(pageModel.searchContactInput, updatedContact.firstName, {
    replace: true,
  });
  await pageModel.assertIfSpinnerIsVisible();
  await t.expect(Selector('[data-testid="not-found"]').exists).notOk();
  await t.expect(Selector('[data-testid="contacts"]').childElementCount).eql(1);

  // Deleting contact

  const { clientId } = contact;

  await t.click(pageModel.searchContactInput).pressKey("ctrl+a delete");
  await pageModel.removeContact(clientId);
  await pageModel.assertIfContactRemovedFromTheList(clientId);
});
