import {
  setCurrentShippingMethod,
  update
} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - setCurrentShippingMethod", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should set 'Express' shipping method", async () => {
    const result = await setCurrentShippingMethod(
      "abcb43aa3d8a48ba90c70f631ac442c1"
    );
    result.contextToken = "mockedContextToken";
    expect(result).toMatchSnapshot();
  });

  it("should get error response when not existing shipping method", async () => {
    try {
      await setCurrentShippingMethod("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
