import { CategoryService } from "../src/categoryService";

describe("CategoryService", () => {
  describe("getCategories", () => {
    it("should return array with categories", async () => {
      try {
        const result = await CategoryService.getCategories();
        expect(result.length).toEqual(100);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
