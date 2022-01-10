import { test } from "@playwright/test";
import { fillRegistrationForm } from "../helpers/testHelpers";

test.use({
  viewport: {
    width: 320,
    height: 480,
  },
});

test("[MOBILE] Happy path guest user", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  // Click [data-testid="search-bar"]
  await page.click('[data-testid="search-bar"]');

  // Fill [data-testid="search-bar"]
  await page.fill('[data-testid="search-bar"]', "aaa");

  // Press Enter
  await Promise.all([
    page.waitForNavigation(),
    page.press('[data-testid="search-bar"]', "Enter"),
  ]);

  // Click img[alt="Levis X-star Wars Galaxy Far Away Pullover Hoodie Junior"]
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="product-card"] img'),
  ]);

  // Click [data-testid="button-addToCart"]
  await page.click('[data-testid="button-addToCart"]');

  // Click [aria-label="Go to Cart"]
  await page.click('[aria-label="Go to Cart"]');

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
