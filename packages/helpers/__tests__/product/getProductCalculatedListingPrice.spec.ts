import { getProductCalculatedListingPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductCalculatedListingPrice", () => {
  it("should return listPrice from product", () => {
    const price = getProductCalculatedListingPrice({
      calculatedPrice: {
        listPrice: {
          price: 200,
        },
      },
    } as any);
    expect(price).toEqual(200);
  });
  it("should return unitPrice if there is no listPrice", () => {
    const price = getProductCalculatedListingPrice({
      calculatedPrice: {
        listPrice: {
          price: undefined,
        },
        unitPrice: 300,
      },
    } as any);
    expect(price).toEqual(300);
  });
  it("should return undefined if there is no product", () => {
    const price = getProductCalculatedListingPrice(undefined as any);
    expect(price).toBeUndefined();
  });

  it("should return undefined if there is no calculatedPrices", () => {
    const price = getProductCalculatedListingPrice({} as any);
    expect(price).toBeUndefined();
  });

  it("should return undefined if calculatedPrices is an empty array", () => {
    const price = getProductCalculatedListingPrice({
      calculatedPrices: [],
    } as any);
    expect(price).toBeUndefined();
  });
});
