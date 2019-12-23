import { addProductToCart, changeCartItemQuantity, update } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CartService - changeCartItemQuantity", () => {
  beforeEach(() => {
      update( {contextToken: "" });
  });

  it("should test change item cart quantity response", async () => {
    await addProductToCart("9cce06f9dc424844989a06cfe3dc98da", 2);
    const result = await changeCartItemQuantity("9cce06f9dc424844989a06cfe3dc98da", 1);
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

 it("should test change item cart quantity response error", async () => {
    try {
      await changeCartItemQuantity("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});
