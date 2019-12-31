import { getAvailablePaymentMethods } from "@shopware-pwa/shopware-6-client/src";

describe("shopware-6-client - E2E - ContextService - getAvailablePaymentMethods", () => {
  it("should test paymentMethods response", async () => {
    const result = await getAvailablePaymentMethods();
    expect(result).toMatchSnapshot();
  });
});
