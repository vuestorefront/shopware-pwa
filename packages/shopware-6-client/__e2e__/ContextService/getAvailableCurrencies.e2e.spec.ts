import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - getAvailableCurrencies", () => {
  it("should test currencies response", async () => {
    const result = await getAvailableCurrencies();
    expect(result).toMatchSnapshot();
  });
});