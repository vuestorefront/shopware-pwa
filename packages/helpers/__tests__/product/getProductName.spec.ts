import { getProductName } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductName", () => {
  it("should return empty string if argument wasn't provided", () => {
    const label = getProductName();
    expect(label).toBeNull();
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const label = getProductName(argument);
    expect(label).toBeNull();
  });

  it("should return translated name if the base one does not exist", () => {
    const argument: any = {
      product: {
        name: null,
        translated: {
          name: "Existing"
        }
      }
    };
    const productName = getProductName(argument);
    expect(productName).toBe("Existing");
  });
  it("should return name enriched with variant label if options are included", () => {
    const argument: any = {
      product: {
        name: "T-Shirt",
        translated: {
          name: "Pullover"
        },
        options: [
          {
            name: "XL"
          },
          {
            name: "yellow"
          }
        ]
      }
    };
    const productName = getProductName(argument);
    expect(productName).toBe("Pullover - XL yellow");
  });
});
