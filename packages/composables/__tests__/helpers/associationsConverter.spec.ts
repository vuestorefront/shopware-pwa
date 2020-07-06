import { convertAssociationsToGetParams } from "../../src/internalHelpers/associationsConverter";

describe("composables associationsConverter", () => {
  describe("convertAssociationsToGetParams", () => {
    it("should set the default value if no argument is passed", () => {
      const result = convertAssociationsToGetParams(undefined as any);
      expect(result).toStrictEqual({});
    });
  });
});
