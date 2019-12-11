import { getCmsSections } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsSections", () => {
  it("should return an empty array for no content", () => {
    const result = getCmsSections(undefined as any);
    expect(result).toEqual([]);
  });

  it("should return an aptry array when no content sections", () => {
    const result = getCmsSections({} as any);
    expect(result).toEqual([]);
  });

  it("should return content sections", () => {
    const result = getCmsSections({ sections: [1, 2, 3] } as any);
    expect(result).toEqual([1, 2, 3]);
  });
});
