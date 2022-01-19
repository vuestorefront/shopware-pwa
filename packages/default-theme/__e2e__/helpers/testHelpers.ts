import faker from "faker";
import { Page, expect } from "@playwright/test";

export async function fillRegistrationForm({ page }: { page: Page }) {
  await expect(page.locator("#Salutation")).toContainText("Not specified");

  // Fill [data-testid="registration-first-name-input"] [data-testid="registration-first-name-input"]
  await page.fill(
    '[data-testid="registration-first-name-input"] [data-testid="registration-first-name-input"]',
    faker.name.firstName()
  );

  // Fill [data-testid="registration-last-name-input"] [data-testid="registration-last-name-input"]
  await page.fill(
    '[data-testid="registration-last-name-input"] [data-testid="registration-last-name-input"]',
    faker.name.lastName()
  );

  // Click [data-testid="guest-registration-checkbox"] div
  await page.click('[data-testid="guest-registration-checkbox"] div');

  // Fill [data-testid="registration-email-input"] [data-testid="registration-email-input"]
  await page.fill(
    '[data-testid="registration-email-input"] [data-testid="registration-email-input"]',
    faker.internet.email()
  );

  // Fill [data-testid="registration-street-input"] [data-testid="registration-street-input"]
  await page.fill(
    '[data-testid="registration-street-input"] [data-testid="registration-street-input"]',
    faker.address.streetName()
  );

  // Fill [data-testid="registration-zipcode-input"] [data-testid="registration-zipcode-input"]
  await page.fill(
    '[data-testid="registration-zipcode-input"] [data-testid="registration-zipcode-input"]',
    faker.address.zipCode()
  );

  // Fill [data-testid="registration-city-input"] [data-testid="registration-city-input"]
  await page.fill(
    '[data-testid="registration-city-input"] [data-testid="registration-city-input"]',
    faker.address.cityName()
  );

  // Click [data-testid="register-button"]
  await page.click('[data-testid="register-button"]');
}
