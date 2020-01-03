import { setCurrentLanguage, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - setCurrentLanguage", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should set English language", async () => {
    const result = await setCurrentLanguage("2fbb5fe2e29a4d70aa5854ce7ce3e20b");
    result.contextToken = "mockedContextToken";
    expect(result).toMatchSnapshot();
  });

  it("should get error response when not existing language", async () => {
    try {
      await setCurrentLanguage("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
