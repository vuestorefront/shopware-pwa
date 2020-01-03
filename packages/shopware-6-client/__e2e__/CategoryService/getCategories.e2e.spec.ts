import { getCategories } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CategoryService - getCategories", () => {
  it("should fetch all categories that match search criteria", async () => {
    const result = await getCategories();
    expect(result).toMatchSnapshot();
  });

  it("should returns error when cannot find categories with given criteria", async () => {
    try {
      await getCategories({ sort: { field: "qwa" } });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
