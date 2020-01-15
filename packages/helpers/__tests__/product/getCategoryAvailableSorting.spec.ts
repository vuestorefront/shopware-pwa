import { getCategoryAvailableSorting } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCategoryAvailableSorting", () => {
  it("should return empty array when the argument is undefined", () => {
    const filters = getCategoryAvailableSorting();
    expect(filters).toStrictEqual([]);
  });
});
