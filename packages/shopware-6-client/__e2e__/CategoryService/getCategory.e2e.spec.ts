import { getCategory } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CategoryService - getCategories", () => {
    it("should fetch category with given category id", async() => {
        const result = await getCategory("3a64e872ca404522a2c5d43ebc751e6b");
        expect(result).toMatchSnapshot();
    });

    it("should returns error when cannot find category with given category id", async() => {
      try {
        await getCategory('qwa');
        expect("didn't throw an error").toEqual("should throw an error");
      } catch(e) {
        expect(e).toMatchSnapshot();
      }
    });
});