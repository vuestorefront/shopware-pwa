import { getProductNumber } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductNumber", () => {
  it("should return null when no product object", () => {
    const productNumber = getProductNumber(undefined as any);
    expect(productNumber).toBeNull();
  });

  it("should return null when no productNumber property in product", () => {
    const args: any = {};

    const productNumber = getProductNumber(args);
    expect(productNumber).toBeNull();
  });

  it("should return String when productNumber property is in product", () => {
    const args: any = {
      productNumber: "test1234test",
    };

    const freeShipping = getProductNumber(args);
    expect(freeShipping).toBe("test1234test");
  });
});
