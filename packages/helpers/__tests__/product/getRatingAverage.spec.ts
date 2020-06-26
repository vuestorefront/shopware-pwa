import { getRatingAverage } from "@shopware-pwa/helpers";

describe("Shopware helpers - getRatingAverage", () => {
  it("should return null when no product object", () => {
    const productNumber = getRatingAverage(undefined as any);
    expect(productNumber).toBeNull();
  });

  it("should return null when no getRatingAverage property in product", () => {
    const args: any = {};

    const productNumber = getRatingAverage(args);
    expect(productNumber).toBeNull();
  });

  it("should return Number when getRatingAverage property is in product", () => {
    const args: any = {
      ratingAverage: 5,
    };

    const freeShipping = getRatingAverage(args);
    expect(freeShipping).toBe(5);
  });
});
