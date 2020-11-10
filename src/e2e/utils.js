import { ClientFunction, Selector, t } from "testcafe";

export const getPageURL = ClientFunction(() => window.location.href);

export const assertIfSpinnerIsVisible = async () => {
  await t
    .expect(Selector('[data-testid="spinner"]').exists)
    .ok({ timeout: 3000 });
};

export const assertIfWeAreOnThePage = async (page) => {
  await t.expect(getPageURL()).contains(page);
};
