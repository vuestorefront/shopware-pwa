import { getProductProperties } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductProperties", () => {
  it("should return all properties", () => {
    const productWithProperties: any = {
      properties: [
        {
          name: "12 mm",
          group: {
            translated: {
              name: "length",
            },
          },
        },
        {
          name: "6 mm",
          translated: {
            name: "6 mm",
          },
        },
        {
          name: "5 mm",
          translated: {
            name: "5 mm",
          },
          group: {},
        },
        {
          name: "wool",
          group: {
            translated: {
              name: "fabric",
            },
          },
        },
      ],
    };

    const properties = getProductProperties({ product: productWithProperties });
    expect(properties).toHaveLength(4);
    expect(properties[0].name).toEqual("length");
    expect(properties[0].value).toEqual("12 mm");
    expect(properties[1].name).toEqual("");
  });

  it("should return no properties", () => {
    const productWithoutProperties: any = {
      properties: null,
    };

    const properties = getProductProperties({
      product: productWithoutProperties,
    });
    expect(properties).toHaveLength(0);
  });

  it("should return default empty array if argument wasn't provided", () => {
    const properties = getProductProperties();
    expect(properties).toHaveLength(0);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const properties = getProductProperties(argument);
    expect(properties).toHaveLength(0);
  });
});
