import {
  setCurrentPaymentMethod,
  update,
} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - setCurrentPaymentMethod", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should set 'Cash on Delivery' payment method", async () => {
    const result = await setCurrentPaymentMethod(
      "cad2356ee68c473ca7da517d0ad32de1"
    );
    result.contextToken = "mockedContextToken";
    expect(result).toMatchSnapshot();
  });

  it("should get error response when not existing payment method", async () => {
    try {
      await setCurrentPaymentMethod("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
