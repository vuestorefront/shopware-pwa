import { convertAssociations } from "../../src/helpers/convertAssociations";

describe("SearchConverter - convertAssociations", () => {
  it("should return undefined if no params provided", () => {
    const result = convertAssociations();
    expect(result).toBeUndefined();
  });
  it("should return exact same object if any provided", () => {
    const result = convertAssociations({
      some: {},
    });
    expect(result).toStrictEqual({
      some: {},
    });
  });
});
