import { getProductOption } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductOption", () => {

  it("should return current option for given attribute code", () => {
    const productWithOptions: any = {
      "options": [
        {
          "name": "greencopper",
          "group": {
            "name": "color",
          },
          "id": "04095b39ef07472ebd7547800c40bfd4"
        },
        {
          "name": "31",
          "group": {
            "name": "size"
          },
          "id": "06a7ed91305d47e1b7f3d6f7660c8316"
        }
      ],
    }

    const productOption = getProductOption({product: productWithOptions, attribute: "color"})
    expect(productOption).toBeTruthy()
    expect(productOption).toHaveProperty("id")
    if (productOption && productOption.id) {
      expect(productOption.id).toEqual("04095b39ef07472ebd7547800c40bfd4")
    }
  });

  it("should returns null on no options available", () => {
    const productWithoutOptions: any = {
      "options": null
    }

    const productOption = getProductOption({product: productWithoutOptions, attribute:"color"})
    expect(productOption).toBeFalsy()
  });
});