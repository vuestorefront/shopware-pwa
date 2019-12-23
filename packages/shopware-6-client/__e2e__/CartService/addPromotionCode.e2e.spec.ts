import { update, addPromotionCode } from "@shopware-pwa/shopware-6-client";
describe("shopware-6-client - E2E - CartService - addPromotionCode", () => {
  beforeEach(() => {
    update({ contextToken: "" })
  });

  it("should add promotion code for products in cart", async() => {
    const result = await addPromotionCode("divante");
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  // Backend returns the same result as for the existing promotion
  it("should returns error when adding non-existing promotion code", async () => {
    const result = await addPromotionCode("notExistingCode");
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should returns error when adding empty string as promotion code", async () => {
    try {
      await addPromotionCode("");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});