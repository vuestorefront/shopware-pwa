import { getProductTierPrices } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductTierPrices", () => {
  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const price = getProductTierPrices(argument);
    expect(price).toStrictEqual([]);
  });
  it("should return default value if no argument was provided", () => {
    const price = getProductTierPrices(undefined as any);
    expect(price).toStrictEqual([]);
  });
  it("should return parsed array of TierPrice interface instance", () => {
    const product = {
      calculatedPrices: [
        {
          unitPrice: 50,
          quantity: 5,
        },
        {
          unitPrice: 19.95,
          quantity: 10,
        },
      ],
    };
    const price = getProductTierPrices(product as any);
    expect(price).toStrictEqual([
      {
        label: "to 5",
        quantity: 5,
        unitPrice: 50,
      },
      {
        label: "from 10",
        quantity: 10,
        unitPrice: 19.95,
      },
    ]);
  });
});
