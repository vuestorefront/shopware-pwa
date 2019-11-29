import { getProductOptions } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductOptions", () => {
  it("should return current options for given attribute code", () => {
    const productWithChildren: any = {
      children: [
        {
          id: "04095b39ef07472ebd7547800c40bfd4",
          options: [
            {
              id: "3858d1baf2544a379c92535ea3d2fe53",
              name: "blue",
              group: {
                name: "color"
              }
            },
            {
              id: "3858d1baf2544a379c92535ea3d2fe53",
              name: "blue",
              group: {
                name: "color"
              }
            },
            {
              id: "3858d1baf2544a379c92535ea3d2fe52",
              name: "white"
            }
          ]
        },
        {
          id: "06a7ed91305d47e1b7f3d6f7660c8316",
          options: []
        }
      ]
    };

    const productOptions = getProductOptions({
      product: productWithChildren,
      attribute: "color"
    });
    expect(productOptions).toHaveLength(1);
    expect(productOptions[0]).toHaveProperty("color");
    expect(productOptions[0]).toHaveProperty("label");
    expect(productOptions[0]).toHaveProperty("value");
  });

  it("should returns return an empty array if no children", () => {
    const productWithoutChildren: any = {};

    const productOptions = getProductOptions({
      product: productWithoutChildren,
      attribute: "test"
    });
    expect(productOptions).toHaveLength(0);
  });
  it("should returns return an empty array if no child options", () => {
    const productWithoutChildren: any = {
      children: [
        {
          id: "06a7ed91305d47e1b7f3d6f7660c8316",
          options: []
        }
      ]
    };

    const productOptions = getProductOptions({
      product: productWithoutChildren,
      attribute: "test"
    });
    expect(productOptions).toHaveLength(0);
  });

  it("should return default empty array if argument wasn't provided", () => {
    const productOptions = getProductOptions();
    expect(productOptions).toHaveLength(0);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const productOptions = getProductOptions(argument);
    expect(productOptions).toHaveLength(0);
  });
});
