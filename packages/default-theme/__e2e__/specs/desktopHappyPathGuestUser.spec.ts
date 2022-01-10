import { test } from "@playwright/test";
import { fillRegistrationForm } from "../helpers/testHelpers";

test.use({
  viewport: {
    width: 1920,
    height: 1080,
  },
});

test("[DESKTOP] Happy path guest user", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  // Click [data-testid="search-bar"]
  await page.click('[data-testid="search-bar"]');

  // Fill [data-testid="search-bar"]
  await page.fill('[data-testid="search-bar"]', "aaa");

  // Click [data-testid="quicksearch-result"]
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="quicksearch-result"]'),
  ]);

  // Click [data-testid="button-addToCart"]
  await page.click('[data-testid="button-addToCart"]');

  // Click [data-testid="cart-icon"]
  await page.click('[data-testid="cart-icon"]');

  // Click text=Total items 1
  await page.click("text=Total items 1");

  // Click [data-testid="goToCheckout-button"]
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="goToCheckout-button"]'),
  ]);

  await fillRegistrationForm({ page });

  // Click text=Shipping methods
  await page.click("text=Shipping methods");

  await page.click(
    '[data-testid="checkout-payment-method-Cash-on-delivery"] div'
  );
  await page.click(
    '[data-testid="checkout-payment-method-Cash-on-delivery"] .is-active'
  );

  // Check if we can submit order without agreeing to Terms
  // Click [data-testid="place-my-order"]
  await page.click('[data-testid="place-my-order"]');
  // Click text=This field is required
  await page.click("text=This field is required");
  // Click [data-testid="termsAgreementCheckbox"] div
  await page.click('[data-testid="termsAgreementCheckbox"] div');

  // Click [data-testid="place-my-order"]
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="place-my-order"]'),
  ]);

  // Click h2:has-text("Thank you")
  await page.click('h2:has-text("Thank you")');

  // Click text=Payment method Cash on delivery
  await page.click("text=Payment method Cash on delivery");

  // Close page
  await page.close();
});
