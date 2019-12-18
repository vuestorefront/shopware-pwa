import { addProductToCart, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CartService - addProductToCart", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should test add product to cart response", async () => {
    const result = await addProductToCart(
      "044a190a54ab4f06803909c3ee8063ef",
      2
    );
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should test add product with 0 quantity to cart response", async () => {
    const result = await addProductToCart(
      "044a190a54ab4f06803909c3ee8063ef",
      0
    );
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should add product to cart response error", async () => {
    try {
      addProductToCart("", 2);
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});
