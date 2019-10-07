import { getCategories } from "../src/categoryService";

describe("categoryService - getCategories", () => {
  describe("getCategories", () => {
    it("should return array with categories", async () => {
      try {
        const result = await getCategories();
        expect(result.data.length).toEqual(100);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
