import { getProductSpecialPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductSpecialPrice", () => {
  it("should return special price from product", () => {
    const specialPrice = getProductSpecialPrice({
      calculatedPrices: [
        {
          unitPrice: 125.95,
        },
      ],
    } as any);
    expect(specialPrice).toEqual(125.95);
  });
  it("should return 0 if there is no product", () => {
    const specialPrice = getProductSpecialPrice(undefined as any);
    expect(specialPrice).toBeUndefined();
  });

  it("should return 0 if there is no calculatedPrices", () => {
    const specialPrice = getProductSpecialPrice({} as any);
    expect(specialPrice).toBeUndefined();
  });

  it("should return 0 if calculatedPrices is an empty array", () => {
    const specialPrice = getProductSpecialPrice({
      calculatedPrices: [],
    } as any);
    expect(specialPrice).toBeUndefined();
  });

  it("should return 0 if there is no unitPrice", () => {
    const specialPrice = getProductSpecialPrice({
      calculatedPrices: [{}],
    } as any);
    expect(specialPrice).toBeUndefined();
  });
});
