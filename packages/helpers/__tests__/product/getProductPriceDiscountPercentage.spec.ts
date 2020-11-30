import { getProductPriceDiscountPercentage } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductPriceDiscountPercentage", () => {
  it("should return percentage amount of discount from listPrice nested object", () => {
    const productWithPrice: any = {
      calculatedPrice: {
        listPrice: {
          percentage: 33,
        },
      },
    };

    const price = getProductPriceDiscountPercentage(productWithPrice);
    expect(price).toEqual(33);
  });
  it("should return default value if product was null", () => {
    const price = getProductPriceDiscountPercentage(null as any);
    expect(price).toBeUndefined();
  });
});
