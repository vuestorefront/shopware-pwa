import { update, addPromotionCode } from "@shopware-pwa/shopware-6-client";
describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  // TODO: Find existing promotion code
  it("should test add promotion code response", async() => {
    const result = await addPromotionCode("divante");
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });
  
  it("should test add promotion code error response", async () => {
    try {
      await addPromotionCode("");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  })
});