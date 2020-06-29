import { getProductRatingAverage } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductRatingAverage", () => {
  it("should return undefined when no product object", () => {
    const productNumber = getProductRatingAverage(undefined as any);
    expect(productNumber).toBe(undefined);
  });

  it("should return undfined when no getProductRatingAverage property in product", () => {
    const args: any = {};

    const productNumber = getProductRatingAverage(args);
    expect(productNumber).toBe(undefined);
  });

  it("should return Number when getProductRatingAverage property is in product", () => {
    const args: any = {
      ratingAverage: 5,
    };

    const freeShipping = getProductRatingAverage(args);
    expect(freeShipping).toBe(5);
  });
});
