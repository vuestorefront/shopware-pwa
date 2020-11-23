import { getProductCalculatedPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductCalculatedPrice", () => {
  it("should return listPrice from product", () => {
    const price = getProductCalculatedPrice({
      calculatedPrice: {
        unitPrice: 200,
      },
    } as any);
    expect(price).toEqual(200);
  });
  it("should return undefined if there is no product", () => {
    const price = getProductCalculatedPrice(undefined as any);
    expect(price).toBeUndefined();
  });

  it("should return undefined if there is no calculatedPrices", () => {
    const price = getProductCalculatedPrice({} as any);
    expect(price).toBeUndefined();
  });

  it("should return undefined if calculatedPrices is an empty array", () => {
    const price = getProductCalculatedPrice({
      calculatedPrices: [],
    } as any);
    expect(price).toBeUndefined();
  });
});
