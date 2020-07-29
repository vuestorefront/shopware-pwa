import { getAssociationsForEntity } from "../../src/internalHelpers/associationsParameter";
jest.mock(
  "@shopware-pwa/composables/src/api-params.json",
  () => ({
    useProduct: {
      associations: [
        {
          name: "media",
        },
      ],
    },
  }),
  { virtual: true }
);
describe("composables includesParameter", () => {
  describe("getAssociationsForEntity", () => {
    it("should throw the error if no entity type provided", () => {
      try {
        getAssociationsForEntity(undefined as any);
      } catch (error) {
        expect(error.message).toBe(
          "getAssociationsForEntity: there is no entityType provided."
        );
      }
    });
    it("should throw the error if no entity type is matched", () => {
      try {
        getAssociationsForEntity("some_string" as any);
      } catch (error) {
        expect(error.message).toBe(
          "getAssociationsForEntity: there are no associations for given entity type."
        );
      }
    });
    it("should return a proper associations object", () => {
      const result = getAssociationsForEntity("useProduct");
      expect(result).toStrictEqual([
        {
          name: "media",
        },
      ]);
    });
  });
});
