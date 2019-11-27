import { getProductRegularPrice } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductRegularPrice", () => {

  it("should return first gross price from nested price object", () => {
    const productWithPrice: any = {
      price: [
        {
          gross: 125.95
        }
      ]
    }

    const price = getProductRegularPrice({product: productWithPrice})
    expect(price).toEqual(125.95);
  });
  it("should return 0 if there is no price nested", () => {
    const productWithoutPrice: any = {
    }

    const price = getProductRegularPrice({product: productWithoutPrice})
    expect(price).toEqual(0);
  });

});