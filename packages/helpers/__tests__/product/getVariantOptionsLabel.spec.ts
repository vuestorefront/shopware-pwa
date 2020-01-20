import { getVariantOptionsLabel } from "@shopware-pwa/helpers";

describe("Shopware helpers - getVariantOptionsLabel", () => {
  it("should return empty string if argument wasn't provided", () => {
    const label = getVariantOptionsLabel();
    expect(label).toBeNull();
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const label = getVariantOptionsLabel(argument);
    expect(label).toBeNull();
  });

  it("should return empty string if empty options array is provided", () => {
    const argument: any = {
      product: {
        options: []
      }
    };
    const label = getVariantOptionsLabel(argument);
    expect(label).toBeNull();
  });

  it("should return label made of one option name", () => {
    const argument: any = {
      product: {
        options: [
          {
            name: "XL"
          }
        ]
      }
    };
    const label = getVariantOptionsLabel(argument);
    expect(label).toBe("XL");
  });

  it("should return label made of two option names", () => {
    const argument: any = {
      product: {
        options: [
          {
            name: "L"
          },
          {
            name: "black"
          }
        ]
      }
    };
    const label = getVariantOptionsLabel(argument);
    expect(label).toBe("L black");
  });
});
