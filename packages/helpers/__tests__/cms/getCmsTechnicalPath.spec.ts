import { getCmsTechnicalPath } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsTechnicalPath", () => {
  it("should return undefined if there is no type provided", () => {
    const path = getCmsTechnicalPath(undefined as any);
    expect(path).toBeUndefined();
  });

  it("should throw exception if the resourceType is not handled", () => {
    expect(() =>
      getCmsTechnicalPath({
        resourceType: "unhandled",
      } as any)
    ).toThrow(
      "Cannot extract a technical URL for provided page type: unhandled"
    );
  });
  it("should get the right technical URL for navigation entity", () => {
    const path = getCmsTechnicalPath({
      resourceType: "frontend.navigation.page",
      resourceIdentifier: "some-category-id",
    } as any);
    expect(path).toStrictEqual("/navigation/some-category-id");
  });
  it("should get the right technical URL for product entity", () => {
    const path = getCmsTechnicalPath({
      resourceType: "frontend.detail.page",
      resourceIdentifier: "some-id",
      product: {
        id: "some-product-id",
      },
    } as any);
    expect(path).toStrictEqual("/detail/some-product-id");
  });
});
