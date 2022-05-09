import { getProductVariantsFromPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductVariantsFromPrice", () => {
  it("should return undefined if there is no product", () => {
    const price = getProductVariantsFromPrice(undefined as any);
    expect(price).toBeUndefined();
  });
  it("should return right price extracted from a product", () => {
    const price = getProductVariantsFromPrice({
      calculatedPrice: {
        unitPrice: 100,
      },
      calculatedPrices: [{}],
      calculatedCheapestPrice: {
        unitPrice: 90,
      },
    } as any);
    expect(price).toStrictEqual(90);
  });
  it("should return undefined if there is no cheapest price and real one available", () => {
    const price = getProductVariantsFromPrice({
      calculatedPrice: undefined,
      calculatedPrices: undefined,
      calculatedCheapestPrice: undefined,
    } as any);
    expect(price).toBeUndefined();
  });
});
