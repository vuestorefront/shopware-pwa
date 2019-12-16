import { getAvailableShippingMethods } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - getAvailableShippingMethods", () => {
  it("should test shoppingMethods response", async () => {
    const result = await getAvailableShippingMethods();
    expect(result).toMatchSnapshot();
  });
});
