import { getCmsEntityByType } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsEntityByType", () => {
  it("should return undefined if no argument was provided", () => {
    const result = getCmsEntityByType(undefined as any);
    expect(result).toBeUndefined();
  });

  it("should return product entity if resource type equals PDP", () => {
    const result = getCmsEntityByType({
      resourceType: "frontend.detail.page",
      product: {
        id: "product-id",
      },
    } as any);
    expect(result).toStrictEqual({ id: "product-id" });
  });

  it("should not return product entity if resource type equals product page but the product object is missing", () => {
    const result = getCmsEntityByType({
      resourceType: "frontend.detail.page",
    } as any);
    expect(result).toBeUndefined();
  });

  it("should return category entity if resource type equals category page", () => {
    const result = getCmsEntityByType({
      resourceType: "frontend.navigation.page",
      category: {
        id: "product-id",
      },
    } as any);
    expect(result).toStrictEqual({ id: "product-id" });
  });

  it("should not return category entity if resource type equals category page but the category object is missing", () => {
    const result = getCmsEntityByType({
      resourceType: "frontend.navigation.page",
    } as any);
    expect(result).toBeUndefined();
  });
});
