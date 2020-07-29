import { getIncludesForEntity } from "../../src/internalHelpers/includesParameter";
jest.mock(
  "@shopware-pwa/composables/src/api-params.json",
  () => ({
    useProduct: {
      includes: {
        product: ["media"],
      },
    },
  }),
  { virtual: true }
);

describe("composables includesParameter", () => {
  describe("getIncludesForEntity", () => {
    it("should throw the error if no entity type provided", () => {
      try {
        getIncludesForEntity(undefined as any);
      } catch (error) {
        expect(error.message).toStrictEqual(
          "getIncludesForEntity: there is no entityType provided."
        );
      }
    });
    it("should throw the error if no entity type is matched", () => {
      try {
        getIncludesForEntity("some_string" as any);
      } catch (error) {
        expect(error.message).toBe(
          "getIncludesForEntity: there are no includes for given entity type."
        );
      }
    });

    it("should return a proper includes object", () => {
      const result = getIncludesForEntity("useProduct");
      expect(result).toStrictEqual({ product: ["media"] });
    });
  });
});
