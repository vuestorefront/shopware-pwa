import { Category } from "@shopware-pwa/commons";
import { getCategoryUrl, isLinkCategory } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCategoryUrl", () => {
  it("should return root path if there is no category", () => {
    const result = getCategoryUrl(undefined as any);
    expect(result).toEqual("/");
  });

  it("should return root path category has no route", () => {
    const result = getCategoryUrl({});
    expect(result).toEqual("/");
  });

  it("should return root path category has no route path", () => {
    const result = getCategoryUrl({ route: {} });
    expect(result).toEqual("/");
  });

  it("should return technical URL if there is no pretty URL available", () => {
    const result = getCategoryUrl({ id: "123456" });
    expect(result).toEqual("/navigation/123456");
  });
  it("should return technical URL if there is no pretty seoUrls is undefined", () => {
    const result = getCategoryUrl({ id: "123456", seoUrls: undefined });
    expect(result).toEqual("/navigation/123456");
  });
  it("should return technical URL if seoPathInfo is undefined", () => {
    const result = getCategoryUrl({
      id: "123456",
      seoUrls: [{ seoPathInfo: undefined }],
    } as any);
    expect(result).toEqual("/navigation/123456");
  });
  it("should return seo URL prefixed with slash if path is without it", () => {
    const result = getCategoryUrl({
      id: "123456",
      seoUrls: [{ seoPathInfo: "test-page" }],
    } as any);
    expect(result).toEqual("/test-page");
  });
  it("should return technical URL if category is nullish", () => {
    const result = getCategoryUrl(null as any);
    expect(result).toEqual("/");
  });

  it("should return external link if any exists", () => {
    const result = getCategoryUrl({
      externalLink: "https://shopware.com",
      type: "link",
    } as Category);
    expect(result).toEqual("https://shopware.com");
  });

  it("should return external link from translated object first", () => {
    const result = getCategoryUrl({
      externalLink: "https://shopware.com",
      type: "link",
      translated: { externalLink: "https://translated.shopware.com" },
    } as Category);
    expect(result).toEqual("https://translated.shopware.com");
  });

  it("should return default url when there is no external link", () => {
    const result = getCategoryUrl({
      type: "link",
    } as Category);
    expect(result).toEqual("/");
  });

  it("should return seo URL when there is no external link but a seo URL", () => {
    const result = getCategoryUrl({
      seoUrls: [{ seoPathInfo: "test-page" }],
      type: "link",
    } as Category);
    expect(result).toEqual("/test-page");
  });

  it("should return default url when category type is folder", () => {
    const result = getCategoryUrl({
      id: "123",
      type: "folder",
    } as Category);
    expect(result).toEqual("/");
  });
});

describe("isLinkCategory", () => {
  it("should return false when no category provided", () => {
    const result = isLinkCategory(null as any);
    expect(result).toBe(false);
  });

  it("should return false when no category provided", () => {
    const result = isLinkCategory({
      id: "123",
      type: "link",
    } as Category);
    expect(result).toBe(true);
  });
});
