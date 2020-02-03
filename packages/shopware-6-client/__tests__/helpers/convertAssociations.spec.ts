import { convertAssociations } from "../../src/helpers/convertAssociations";

describe("SearchConverter - convertAssociations", () => {
  it("should return undefined if no params provided", () => {
    const result = convertAssociations();
    expect(result).toBeUndefined();
  });
});
