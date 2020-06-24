import { getProductRegularPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductRegularPrice", () => {
  it("should return first gross price from nested price object", () => {
    const productWithPrice: any = {
      calculatedPrice: {
        unitPrice: 125.95,
      },
    };

    const price = getProductRegularPrice(productWithPrice);
    expect(price).toEqual(125.95);
  });
  it("should return 0 if there is no price nested", () => {
    const productWithoutPrice: any = {};

    const price = getProductRegularPrice(productWithoutPrice);
    expect(price).toBeUndefined();
  });

  it("should return default negative value if argument wasn't provided", () => {
    const price = getProductRegularPrice(undefined as any);
    expect(price).toBeUndefined();
  });

  it("should return default value if product was null", () => {
    const price = getProductRegularPrice(null as any);
    expect(price).toBeUndefined();
  });
});
