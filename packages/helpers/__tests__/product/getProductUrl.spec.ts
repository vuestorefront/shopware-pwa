import { getProductUrl } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductUrl", () => {
  it("should return product technical URL", () => {
    const result = getProductUrl({ id: "qwerty" } as any);
    expect(result).toEqual("/detail/qwerty");
  });

  it("should return default URL if seoUrls is undefined", () => {
    const result = getProductUrl({ id: "qwerty", seoUrls: undefined } as any);
    expect(result).toEqual("/detail/qwerty");
  });

  it("should return default url for no product", () => {
    const result = getProductUrl(undefined as any);
    expect(result).toEqual("/");
  });
  it("should return seo URL if available", () => {
    const result = getProductUrl({
      seoUrls: [
        {
          seoPathInfo: "pretty-url/012345",
        },
      ],
    } as any);
    expect(result).toEqual("/pretty-url/012345");
  });
});
