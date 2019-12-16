import { getAvailableLanguages } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ContextService - getAvailableLanguages", () => {
  it("should test languages response", async () => {
    const result = await getAvailableLanguages();
    expect(result).toMatchSnapshot();
  });
});
