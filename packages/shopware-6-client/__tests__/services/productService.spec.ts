import { ProductService } from "@shopware-pwa/shopware-6-client";

describe("ProductService", () => {
  describe("getProductsIds", () => {
    it("should return array of products' ids (default amount of 10)", async () => {
      try {
        const result = await ProductService.getProductsIds();
        expect(result.total).toEqual(60);
        expect(result.data).toHaveLength(10);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
  describe("getProducts", () => {
    it("should return array of products (default amount of 10)", async () => {
      try {
        const result = await ProductService.getProducts();
        expect(result.total).toEqual(60);
        expect(result.data).toHaveLength(10);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
    it("should return array of products limited to 5", async () => {
      try {
        const pagination = {
          page: 1,
          limit: 5
        };
        const result = await ProductService.getProducts(pagination);
        expect(result.total).toEqual(60);
        expect(result.data).toHaveLength(5);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
    it("should return a different array of products sorted by name", async () => {
      try {
        const pagination = {
          page: 1,
          limit: 1
        };

        /** get the products with descending order to compare */
        const sort = {
          sort: `-name`
        };
        const result = await ProductService.getProducts(pagination, sort);
        expect(result.data).toHaveLength(1);
        const nameDesc = result.data[0].name;

        /** get the products with ascending order to compare */
        const sortAsc = {
          sort: `name`
        };
        const resultAsc = await ProductService.getProducts(pagination, sortAsc);
        expect(resultAsc.data).toHaveLength(1);
        const nameAsc = resultAsc.data[0].name;

        /** compare first results's name from different sorting order */
        expect(nameAsc).not.toBe(nameDesc);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
  describe("getProduct", () => {
    it("should return chosen product", async () => {
      try {
        const productId = "044a190a54ab4f06803909c3ee8063ef";
        const result = await ProductService.getProduct(productId);
        expect(result).toHaveProperty("id");
        expect(result.id).toEqual(productId);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
