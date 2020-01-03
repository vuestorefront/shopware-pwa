import { getProductUrl } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductUrl", () => {
  it("should return product url", () => {
    const result = getProductUrl({ id: "qwerty" } as any);
    expect(result).toEqual("/detail/qwerty");
  });

  it("should return default url for no product", () => {
    const result = getProductUrl(undefined as any);
    expect(result).toEqual("/");
  });
});
