/* eslint-disable no-undef */
import { Selector, t } from "testcafe";
import faker from "faker";

class AuthPageModel {
  constructor() {
    this.inputs = {
      name: Selector('input[name="name"]'),
      email: Selector('input[name="email"]'),
      password: Selector('input[name="password"]'),
    };

    this.errors = {
      requiredEmail: Selector("span").withText(/email is required/i),
      requiredPassword: Selector("span").withText(/password is required/i),
      invalidEmail: Selector("span").withText(/invalid email address/i),
      invalidPassword: Selector("span").withText(
        /password must be at least 6 characters/i
      ),
      emailInUse: Selector("div").withText(
        /the email address is already in use by another account./i
      ),
      noUserFound: Selector("div").withText(
        /there is no user record corresponding to this identifier./i
      ),
    };

    this.links = {
      hasAccount: Selector("a").withText(/have an account/i),
      createAccount: Selector("a").withText(/create an account/i),
    };

    this.submitButton = Selector("button").withText(/submit/i);

    this.spinner = Selector('[data-testid="spinner"]');
  }

  async login({ email, password }) {
    await t
      .typeText(this.inputs.email, email)
      .typeText(this.inputs.password, password)
      .click(this.submitButton);
  }

  async register({ name, email, password }) {
    await t
      .typeText(this.inputs.name, name)
      .typeText(this.inputs.email, email)
      .typeText(this.inputs.password, password)
      .click(this.submitButton);
  }

  async logout() {
    await t.click(Selector('button[data-testid="logout"]'));
  }

  async assertIfFormInputsAreDisabled({ checkNameInput = false } = {}) {
    const inputsKeys = Object.keys(this.inputs);

    for (const key of inputsKeys) {
      if (key !== "name") {
        await t.expect(this.inputs[key].hasAttribute("disabled")).ok();
      } else if (checkNameInput) {
        await t.expect(this.inputs[key].hasAttribute("disabled")).ok();
      }
    }
  }
}

const authPageModel = new AuthPageModel();

export function generateFakeUser() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export default authPageModel;
