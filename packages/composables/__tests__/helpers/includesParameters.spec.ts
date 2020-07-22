import { getIncludesForEntity } from "../../src/internalHelpers/includesParameter";

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
  });
});
