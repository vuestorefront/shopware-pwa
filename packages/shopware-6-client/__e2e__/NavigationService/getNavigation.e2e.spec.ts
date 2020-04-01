import { getNavigation, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - NavigationService - getNavigationService", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should get navigation schema for given root node", async () => {
    const result = await getNavigation({
      depth: 1,
      rootNode: "9429db6b2da348ea8308f1dbe6eee9f0",
    });
    expect(result).toMatchSnapshot();
  });

  it("should get error response when navigation root node doesn't exist", async () => {
    try {
      await getNavigation({ depth: 22, rootNode: "qwe" });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
