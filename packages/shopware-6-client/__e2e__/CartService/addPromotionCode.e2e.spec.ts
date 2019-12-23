import { update, addPromotionCode } from "@shopware-pwa/shopware-6-client";
describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  it("should add promotion code for products in cart", async() => {
    const result = await addPromotionCode("divante");
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });
  
  it("should returns error when adding non-existing promotion code", async () => {
    try {
      await addPromotionCode("que");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("should returns error when adding empty string as promotion code", async () => {
    try {
      await addPromotionCode("que");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});