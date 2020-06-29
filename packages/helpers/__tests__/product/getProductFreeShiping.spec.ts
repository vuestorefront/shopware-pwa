import { getProductFreeShipping } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductFreeShipping", () => {
  it("should return false when no product object", () => {
    const shippingFree = getProductFreeShipping();
    expect(shippingFree).toBe(false);
  });

  it("should return false when no freeShipping property in product", () => {
    const args: any = {};

    const shippingFree = getProductFreeShipping(args);
    expect(shippingFree).toBe(false);
  });

  it("should return true when freeShipping property in product is true", () => {
    const args: any = {
      shippingFree: true,
    };

    const freeShipping = getProductFreeShipping(args);
    expect(freeShipping).toBe(true);
  });

  it("should return false when freeShipping property in product is false", () => {
    const args: any = {
      shippingFree: false,
    };

    const shippingFree = getProductFreeShipping(args);
    expect(shippingFree).toBe(false);
  });
});
