import { getProductOptionsUrl } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductOptionsUrl", () => {
  it("should return an empty string when no product", () => {
    const result = getProductOptionsUrl();
    expect(result).toEqual("");
  });

  it("should return undefined url when no options", () => {
    const result = getProductOptionsUrl({
      product: {
        id: "123321",
      },
    } as any);
    expect(result).toBeUndefined();
  });

  it("should return product url when has no children", () => {
    const result = getProductOptionsUrl({
      product: {
        id: "123321",
      },
      options: ["qwe", "ewq"],
    } as any);
    expect(result).toBeUndefined();
  });

  it("should return product url when options don`t match", () => {
    const result = getProductOptionsUrl({
      product: {
        id: "123321",
        children: [
          {
            id: "qqq",
            optionIds: ["foo", "bar"],
          },
          {
            id: "eee",
            optionIds: ["qwe", "ewq"],
          },
        ],
      },
      options: ["some", "other"],
    } as any);
    expect(result).toBeUndefined();
  });

  it("should return variant url when options match", () => {
    const result = getProductOptionsUrl({
      product: {
        id: "123321",
        children: [
          {
            id: "qqq",
            optionIds: ["foo", "bar"],
          },
          {
            id: "eee",
            optionIds: ["qwe", "ewq"],
          },
        ],
      },
      options: ["qwe", "ewq"],
    } as any);
    expect(result).toEqual("/detail/eee");
  });
});
