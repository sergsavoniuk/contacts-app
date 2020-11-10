/* eslint-disable no-undef */
import { ClientFunction } from "testcafe";

import pageModel, { generateFakeUser } from "./AuthPageModel";

const emails = require("./fixtures/emails.json");
const passwords = require("./fixtures/passwords.json");

const getPageURL = ClientFunction(() => window.location.href);

fixture`Registration Flow - using email and password`
  .page`http://localhost:3000/register`.before(async (ctx) => {
  ctx.user = {};
});

emails.forEach(({ email, resultText }) => {
  test(`should display the error if the email is invalid - ${email}`, async (t) => {
    await t
      .typeText(pageModel.inputs.email, email)
      .click(pageModel.submitButton);

    if (resultText.length > 0) {
      await t.expect(pageModel.errors.invalidEmail.exists).ok();
      await t.expect(pageModel.errors.invalidEmail.textContent).eql(resultText);
    } else {
      await t.expect(pageModel.errors.invalidEmail.exists).notOk();
    }
  });
});

passwords.forEach(({ password, resultText }) => {
  test(`should display the error if the password is invalid - ${password}`, async (t) => {
    await t
      .typeText(pageModel.inputs.password, password)
      .click(pageModel.submitButton);

    if (resultText.length > 0) {
      await t.expect(pageModel.errors.invalidPassword.exists).ok();
      await t
        .expect(pageModel.errors.invalidPassword.textContent)
        .eql(resultText);
    } else {
      await t.expect(pageModel.errors.invalidPassword.exists).notOk();
    }
  });
});

test('should navigate to Login page when a user clicks on "already have an account" link', async (t) => {
  await t
    .click(pageModel.links.hasAccount)
    .expect(getPageURL())
    .contains("login");
});

test("should display errors if email and/or password is empty", async (t) => {
  await t.expect(pageModel.inputs.email.value).eql("");
  await t.expect(pageModel.inputs.password.value).eql("");

  await t.click(pageModel.submitButton);

  await t.expect(pageModel.errors.requiredEmail.exists).ok();
  await t.expect(pageModel.errors.requiredPassword.exists).ok();
});

test("should successfully register a new user", async (t) => {
  t.fixtureCtx.user = generateFakeUser();
  await pageModel.register(t.fixtureCtx.user);
  await pageModel.assertIfSpinnerIsVisible();
  // await pageModel.assertIfFormInputsAreDisabled({ checkNameInput: true });
  // await t.expect(pageModel.inputs.name.hasAttribute("disabled")).ok();
  // await t.expect(pageModel.inputs.email.hasAttribute("disabled")).ok();
  // await t.expect(pageModel.inputs.password.hasAttribute("disabled")).ok();
  await t.expect(getPageURL()).contains("/contacts");
}).after(async (t) => {
  await pageModel.logout();
  await t.navigateTo(`http://localhost:3000/register`);
});

test("should display an error if a user with the entered email already exist", async (t) => {
  await pageModel.register(t.fixtureCtx.user);
  // await pageModel.assertIfSpinnerIsVisible();
  // await pageModel.assertIfFormInputsAreDisabled({ checkNameInput: true });
  // await t.expect(pageModel.inputs.name.hasAttribute("disabled")).ok();
  // await t.expect(pageModel.inputs.email.hasAttribute("disabled")).ok();
  // await t.expect(pageModel.inputs.password.hasAttribute("disabled")).ok();
  await t.expect(pageModel.errors.emailInUse.exists).ok();
});

fixture`Login Flow`.page`http://localhost:3000/login`.beforeEach(async () => {
  if ((await getPageURL()).includes("/contacts")) {
    await pageModel.logout();
  }
});

test('should navigate to Register page when a user clicks on "need to create an account?" link', async (t) => {
  await t
    .click(pageModel.links.createAccount)
    .expect(getPageURL())
    .contains("register");
});

test("should display errors if email and/or password is empty", async (t) => {
  await t.expect(pageModel.inputs.email.value).eql("");
  await t.expect(pageModel.inputs.password.value).eql("");

  await t.click(pageModel.submitButton);

  await t.expect(pageModel.errors.requiredEmail.exists).ok();
  await t.expect(pageModel.errors.requiredPassword.exists).ok();
});

test("should display an error if the credentials are invalid", async (t) => {
  await pageModel.login({ email: "unknownUser@test.com", password: "123456" });
  await t.expect(pageModel.errors.noUserFound.exists).ok();
});

test.page`http://localhost:3000/register`.before(async (t) => {
  // Register a user that we're going to use to log in

  t.ctx.user = generateFakeUser();
  await pageModel.register(t.ctx.user);
  await pageModel.logout();
})("should successfully log in", async (t) => {
  await pageModel.login({
    email: t.ctx.user.email,
    password: t.ctx.user.password,
  });
  await pageModel.assertIfSpinnerIsVisible();
  await t.expect(pageModel.inputs.email.hasAttribute("disabled")).ok();
  await t.expect(pageModel.inputs.password.hasAttribute("disabled")).ok();
  // await pageModel.assertIfFormInputsAreDisabled();
  await t.expect(getPageURL()).contains("/contacts");
});
