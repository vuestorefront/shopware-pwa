import { getProductRealPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductRealPrice", () => {
  it("should return undefined if there is no product", () => {
    const price = getProductRealPrice(undefined as any);
    expect(price).toBeUndefined();
  });
  it("should return right price extracted from a product", () => {
    const price = getProductRealPrice({
      calculatedPrice: {
        unitPrice: 100,
      },
      calculatedPrices: [{}],
    } as any);
    expect(price).toStrictEqual({
      unitPrice: 100,
    });
  });
  it("should return last price extracted from a product if there are more calculatedPrices in an array", () => {
    const price = getProductRealPrice({
      calculatedPrice: {
        unitPrice: 100,
      },
      calculatedPrices: [
        {
          unitPrice: 15,
        },
        {
          unitPrice: 20,
        },
      ],
    } as any);
    expect(price).toStrictEqual({
      unitPrice: 20,
    });
  });
});
