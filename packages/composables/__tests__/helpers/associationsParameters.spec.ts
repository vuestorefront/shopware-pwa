import { getAssociationsForEntity } from "../../src/internalHelpers/associationsParameter";

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
  });
});
