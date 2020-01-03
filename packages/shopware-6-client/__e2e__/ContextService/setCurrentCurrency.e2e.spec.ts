import { setCurrentCurrency, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - setCurrentCurrency", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should set GPB currency", async () => {
    const result = await setCurrentCurrency("76559e57121c4ffa884d865cb83ded1b");
    result.contextToken = "mockedContextToken";
    expect(result).toMatchSnapshot();
  });

  it("should get error response when not existing currency", async () => {
    try {
      await setCurrentCurrency("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
