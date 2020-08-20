import { convertIncludesToGetParams } from "../../src/internalHelpers/includesConverter";

describe("composables includesConverter", () => {
  describe("convertIncludesToGetParams", () => {
    it("should set the empty object if no argument is passed", () => {
      const result = convertIncludesToGetParams(undefined as any);
      expect(result).toStrictEqual({});
    });
    it("should return an empty object if includes argument is not iterable", () => {
      const result = convertIncludesToGetParams({} as any);
      expect(result).toStrictEqual({});
    });

    it("should convert an includes parameter", () => {
      const result = convertIncludesToGetParams({
        product: ["manufacturer"],
      });
      expect(result).toStrictEqual({
        "includes[product][manufacturer]": "manufacturer",
      });
    });
  });
});
