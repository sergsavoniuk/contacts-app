/* eslint-disable no-undef */
import { Selector } from "testcafe";
import faker from "faker";

import pageModel, { generateFakeContact } from "./ContactsPageModel";
import authPageModel from "../Auth/AuthPageModel";

import {
  getPageURL,
  assertIfSpinnerIsVisible,
  assertIfWeAreOnThePage,
} from "../utils";

const baseURL = "http://localhost:3000/contacts";

fixture`Contacts List functionality`.page(baseURL);

test.before(async () => {
  if ((await getPageURL()).includes("/login")) {
    await authPageModel.login({
      email: "test@testcafe.com",
      password: "123456",
    });
  }
})("CRUD operations + searching", async (t) => {
  await pageModel.clickOnAddContactButton();
  await assertIfWeAreOnThePage("/contacts/new");
  await pageModel.assertIfFormInputsAreEmpty();
  await t.click(pageModel.buttons.submit);
  await pageModel.assertIfErrorsAreVisible();

  // Creating contacts

  let contact = generateFakeContact();

  const createContact = async (contact) => {
    await pageModel.createContact(contact);
    // await assertIfSpinnerIsVisible();
    // await pageModel.assertIfFormInputsAreDisabled();
    await assertIfWeAreOnThePage("/contacts");
    await pageModel.assertIfNewContactAppearedInTheList(contact);
  };

  await createContact(contact);

  await pageModel.clickOnAddContactButton();

  contact = generateFakeContact();
  await createContact(contact);

  // Updating contact

  await pageModel.clickOnEditContactButton(contact.clientId);
  await assertIfWeAreOnThePage("/edit");

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

  await assertIfSpinnerIsVisible();
  // await pageModel.assertIfFormInputsAreDisabled();

  await assertIfWeAreOnThePage("/contacts");

  await pageModel.assertIfContactUpdatedInTheList(updatedContact);

  // Searching for contact

  await t.typeText(pageModel.searchContactInput, "Unknown user");
  await assertIfSpinnerIsVisible();
  await t.expect(pageModel.notFoundContainer.exists).ok();
  await t.typeText(pageModel.searchContactInput, updatedContact.firstName, {
    replace: true,
  });
  await assertIfSpinnerIsVisible();
  await t.expect(pageModel.notFoundContainer.exists).notOk();
  await t.expect(Selector('[data-testid="contacts"]').childElementCount).eql(1);

  // Deleting contact

  const { clientId } = contact;

  await t.click(pageModel.searchContactInput).pressKey("ctrl+a delete");
  await pageModel.removeContact(clientId);
  await pageModel.assertIfContactRemovedFromTheList(clientId);
});
