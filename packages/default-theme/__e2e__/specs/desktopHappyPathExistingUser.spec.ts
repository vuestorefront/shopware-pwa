import { test } from "@playwright/test";

test.use({
  viewport: {
    width: 1920,
    height: 1080,
  },
});

test("[DESKTOP] Happy path logged in user", async ({ page, baseURL }) => {
  await page.goto("/");

  await page.click('[data-testid="login-icon"]');
  // Fill [data-testid="email-input"] [data-testid="email-input"]
  await page.fill(
    '[data-testid="email-input"] [data-testid="email-input"]',
    "1d7b9fef36a34367ad02993594db3fc9rlegros@example.com"
  );
  // Fill [data-testid="password-input"] [data-testid="password-input"]
  await page.fill(
    '[data-testid="password-input"] [data-testid="password-input"]',
    "shopware"
  );
  // Click [data-testid="submit-login-button"]
  await page.click('[data-testid="submit-login-button"]');

  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="top-navigation"] a'),
  ]);

  await Promise.all([
    page.hover('[data-testid="product-card"]'),
    page.click('[data-testid="product-card"] .sf-product-card__add-button'),
  ]);

  await page.click('[data-testid="cart-icon"]');
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="goToCheckout-button"]'),
  ]);

  await page.click(
    '[data-testid="checkout-payment-method-Cash-on-delivery"] div'
  );
  await page.click(
    '[data-testid="checkout-payment-method-Cash-on-delivery"] .is-active'
  );

  // Click [data-testid="termsAgreementCheckbox"] div
  await page.click('[data-testid="termsAgreementCheckbox"] div');

  // Click [data-testid="place-my-order"]
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="place-my-order"]'),
  ]);

  await page.click('h2:has-text("Thank you")');
});
