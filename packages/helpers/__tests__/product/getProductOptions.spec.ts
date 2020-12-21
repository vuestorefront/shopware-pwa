import { getProductOptions } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductOptions", () => {
  it("should return current options for given attribute code", () => {
    const productWithOptions: any = {
      id: "04095b39ef07472ebd7547800c40bfd4",
      options: [
        {
          id: "3858d1baf2544a379c92535ea3d2fe53",
          name: "blue",
          translated: {
            name: "blue",
          },
          group: {
            name: "color",
            translated: {
              name: "colour",
            },
          },
          productOptions: [
            {
              optionIds: ["12345"],
            },
          ],
        },
        {
          id: "3858d1baf2544a379c92535ea3d2fe54",
          name: "blue",
          group: {
            name: "color",
            translated: {
              name: "color",
            },
          },
        },
        {
          id: "3858d1baf2544a379c92535ea3d2fe54",
          name: "blue",
          group: {
            name: "color",
            translated: {
              name: "color",
            },
          },
          productOptions: undefined,
        },
        {
          id: "3858d1baf2544a379c92535ea3d2fe52",
          name: "white",
        },
      ],
    };

    const productOptions = getProductOptions({
      product: productWithOptions,
    });
    expect(productOptions[0]).toStrictEqual({
      code: "3858d1baf2544a379c92535ea3d2fe53",
      color: undefined,
      label: "blue",
      value: "blue",
    });
    expect(productOptions).toStrictEqual([
      {
        code: "3858d1baf2544a379c92535ea3d2fe53",
        color: undefined,
        label: "blue",
        value: "blue",
      },
      {
        code: "3858d1baf2544a379c92535ea3d2fe54",
        color: undefined,
        label: "blue",
        value: "blue",
      },
      {
        code: "3858d1baf2544a379c92535ea3d2fe54",
        color: undefined,
        label: "blue",
        value: "blue",
      },
      {
        code: "3858d1baf2544a379c92535ea3d2fe52",
        color: undefined,
        label: "white",
        value: "white",
      },
    ]);
  });

  it("should returns return an empty object if no children", () => {
    const productWithoutOptions: any = {};

    const productOptions = getProductOptions({
      product: productWithoutOptions,
    });
    expect(productOptions).toEqual([]);
  });
  it("should returns return an empty object if no child options", () => {
    const productWithoutOptions: any = {
      id: "06a7ed91305d47e1b7f3d6f7660c8316",
      options: [],
    };

    const productOptions = getProductOptions({
      product: productWithoutOptions,
    });
    expect(productOptions).toStrictEqual([]);
  });

  it("should return default empty object if argument wasn't provided", () => {
    const productOptions = getProductOptions();
    expect(productOptions).toEqual([]);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const productOptions = getProductOptions(argument);
    expect(productOptions).toEqual([]);
  });
});
