import { convertAssociations } from "../../src/helpers/convertAssociations";

describe("SearchConverter - convertAssociations", () => {
  it("should returns empty object if no params provided", () => {
    const result = convertAssociations();
    expect(result).toBeUndefined();
  });
});
