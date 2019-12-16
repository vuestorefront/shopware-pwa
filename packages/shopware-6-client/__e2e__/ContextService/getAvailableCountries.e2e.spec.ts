import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - getAvailableCountries", () => {
  it("should test countries response", async () => {
    const result = await getAvailableCountries();
    expect(result).toMatchSnapshot();
  });
});
