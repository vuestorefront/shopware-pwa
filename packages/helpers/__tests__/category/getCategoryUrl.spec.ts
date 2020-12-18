import { getCategoryUrl } from "@shopware-pwa/helpers";

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

  it("should return category route path", () => {
    const result = getCategoryUrl({ route: { path: "some/path" } });
    expect(result).toEqual("/some/path");
  });
  it("should return category path with one slash before, even if it's set already", () => {
    const result = getCategoryUrl({ route: { path: "/some/path" } });
    expect(result).toEqual("/some/path");
  });
});
