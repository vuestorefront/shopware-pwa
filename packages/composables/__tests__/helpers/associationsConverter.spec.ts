import { convertAssociationsToGetParams } from "../../src/internalHelpers/associationsConverter";

describe("composables associationsConverter", () => {
  describe("convertAssociationsToGetParams", () => {
    it("should set the default value if no argument is passed", () => {
      const result = convertAssociationsToGetParams(undefined as any);
      expect(result).toBeUndefined();
    });
    it("should return undefined if associations argument is not iterable", () => {
      const result = convertAssociationsToGetParams({} as any);
      expect(result).toBeUndefined();
    });

    it("should not perform an extraction if there is no associations attached", () => {
      const result = convertAssociationsToGetParams([
        {
          name: "manufacturer",
          associations: undefined,
        },
      ]);
      expect(result).toStrictEqual({
        "associations[manufacturer][]": true,
      });
    });
    it("should not perform an extraction if there is no associations attached", () => {
      const result = convertAssociationsToGetParams([
        {
          name: "manufacturer",
          associations: null as any,
        },
      ]);
      expect(result).toStrictEqual({
        "associations[manufacturer][]": true,
      });
    });
    it("should not perform an extraction if associations is not an array type", () => {
      const result = convertAssociationsToGetParams([
        {
          name: "manufacturer",
          associations: {} as any,
        },
      ]);
      expect(result).toStrictEqual({
        "associations[manufacturer][]": true,
      });
    });
  });
});
