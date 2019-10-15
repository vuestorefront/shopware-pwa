import { CategoryService } from "../../src/index";

describe("CategoryService", () => {
  describe("getCategories", () => {
    it("should return array of categories", async () => {
      try {
        const result = await CategoryService.getCategories();
        expect(result.total).toEqual(72);
        expect(result.data).toHaveLength(10);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });

    it("should return array of categories limited to 5", async () => {
      try {
        const searchCriteria = {
          page: 1,
          limit: 5
        };

        const result = await CategoryService.getCategories(searchCriteria);
        expect(result.total).toEqual(72);
        expect(result.data).toHaveLength(5);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });

    it("should return different categories for page 1 and page 2", async () => {
      try {
        const searchCriteriaForFirstPage = {
          page: 1,
          limit: 5
        };

        const searchCriteriaForSecondPage = {
          page: 2,
          limit: 5
        };

        const resultFirstPage = await CategoryService.getCategories(
          searchCriteriaForFirstPage
        );
        const resultSecondPage = await CategoryService.getCategories(
          searchCriteriaForSecondPage
        );
        expect(resultFirstPage).not.toBe(resultSecondPage);
        expect(resultFirstPage).not.toBeNull;
        expect(resultSecondPage).not.toBeNull;
      } catch (e) {
        console.error("Connection problem", e);
      }
    });

    it("should return a different array of first category sorted by category.name", async () => {
      try {
        const pagination = {
          page: 1,
          limit: 1
        };

        /** get the categories with descending order to compare */
        const sortDesc = {
          sort: `-name`
        };
        const result = await CategoryService.getCategories(
          pagination,
          sortDesc
        );
        expect(result.data).toHaveLength(1);
        const nameDesc = result.data[0].name;

        /** get the categories with ascending order to compare */
        const sortAsc = {
          sort: `name`
        };
        const resultAsc = await CategoryService.getCategories(
          pagination,
          sortAsc
        );
        expect(resultAsc.data).toHaveLength(1);
        const nameAsc = resultAsc.data[0].name;

        /** compare first results's name from different sorting order */
        expect(nameAsc).not.toBe(nameDesc);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getCategory", () => {
    it("should return chosen category", async () => {
      try {
        const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
        const result = await CategoryService.getCategory(categoryId);
        expect(result).toHaveProperty("id");
        expect(result.id).toEqual(categoryId);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });

    it("should return category without products", async () => {
      try {
        const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
        const result = await CategoryService.getCategory(categoryId);
        expect(result).toHaveProperty("products");
        expect(result.products).toBeNull();
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getCategoryWithAssociation", () => {
    it("should return chosen category with products inside", async () => {
      try {
        const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
        const result = await CategoryService.getCategoryWithAssociation(
          categoryId,
          "products"
        );
        expect(result).toHaveProperty("products");
        expect(result.products).toHaveLength(1);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
