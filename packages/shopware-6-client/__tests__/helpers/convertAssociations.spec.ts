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

  it("should return undefined when the array is provided", () => {
    const result = convertAssociations([]);
    expect(result).toBeUndefined();
  });

  it("should convert association", () => {
    const result = convertAssociations([
      {
        name: "MyAssociation",
      },
    ]);
    expect(result).toEqual({ MyAssociation: {} });
  });

  it("should convert nested associations", () => {
    const result = convertAssociations([
      {
        name: "myAssociation",
        associations: [{ name: "myNestedAssociation" }],
      },
    ]);
    expect(result).toEqual({
      myAssociation: { associations: { myNestedAssociation: {} } },
    });
  });
});
