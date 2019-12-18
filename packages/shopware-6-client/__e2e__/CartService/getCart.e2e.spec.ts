import {
  getCart,
  addProductToCart,
  update
} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CartService - getCart", () => {
  describe("empty token - empty cart", () => {
    beforeEach(() => {
      update({ contextToken: "" });
    });

    it("should fetch cart for empty one", async () => {
      const result = await getCart();
      result.token = "mockedToken";
      expect(result).toMatchSnapshot();
    });
  });

  describe("custom token - added product to cart", () => {
    it("should fetch cart with added products", async () => {
      await addProductToCart("044a190a54ab4f06803909c3ee8063ef", 2);
      const result = await getCart();
      result.token = "mockedToken";
      expect(result).toMatchSnapshot();
    });
  });
});
