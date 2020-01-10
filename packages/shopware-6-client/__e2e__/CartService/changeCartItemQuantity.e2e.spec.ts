import {
  addProductToCart,
  changeCartItemQuantity,
  update
} from "@shopware-pwa/shopware-6-client";
import { deepChangeProperty } from "../helpers";

describe("shopware-6-client - E2E - CartService - changeCartItemQuantity", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should change item cart quantity", async () => {
    await addProductToCart("9cce06f9dc424844989a06cfe3dc98da", 2);
    const result: any = await changeCartItemQuantity(
      "9cce06f9dc424844989a06cfe3dc98da",
      1
    );
    deepChangeProperty(result, "token");
    deepChangeProperty(result, "earliest");
    deepChangeProperty(result, "thumbnailsRo");
    deepChangeProperty(result, "latest");
    expect(result).toMatchSnapshot();
  });

  it("should returns error when changing quantity of item which is not in the cart", async () => {
    try {
      await changeCartItemQuantity("qwe");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
