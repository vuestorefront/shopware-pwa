import { getProductFromPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductFromPrice", () => {
  it("should return undefined if there is no product", () => {
    const price = getProductFromPrice(undefined as any);
    expect(price).toBeUndefined();
  });
  it("should return right from price extracted from a product", () => {
    const price = getProductFromPrice({
      calculatedPrice: {
        unitPrice: 100,
      },
      calculatedPrices: [{}],
    } as any);
    expect(price).toBe(100);
  });
  it("should return undefined if there are no calculated prices", () => {
    const price = getProductFromPrice({
      calculatedPrices: undefined,
    } as any);
    expect(price).toBe(undefined);
  });
  it("should return undefined if there are calculated prices but no real price itself", () => {
    const price = getProductFromPrice({
      calculatedPrice: undefined,
      calculatedPrices: [{}],
    } as any);
    expect(price).toBe(undefined);
  });
});
