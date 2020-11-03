import { isOptionAvailableForSelectedOptions } from "@shopware-pwa/helpers";

describe("Shopware helpers - isOptionAvailableForSelectedOptions", () => {
  it("should return false if even one argument is missing", () => {
    const result = isOptionAvailableForSelectedOptions(
      undefined as any,
      undefined as any,
      undefined as any,
      undefined as any,
      undefined as any
    );
    expect(result).toBeFalsy();
  });
  it("should return true if current optionId is equal to selectedOptionId", () => {
    const result = isOptionAvailableForSelectedOptions(
      "color",
      "f969deb15cff4000a562c0d844374d42",
      { code: "f969deb15cff4000a562c0d844374d42" } as any,
      {},
      {}
    );
    expect(result).toBe(true);
  });
  it("should return true if current optionId is present in every matchingIds array of all other selected attributes", () => {
    const result = isOptionAvailableForSelectedOptions(
      "color",
      "blue",
      { code: "white" } as any,
      {
        color: [
          { code: "blue", matchingIds: ["xs"] } as any,
          { code: "white", matchingIds: ["xs"] } as any,
        ],
        size: [
          {
            code: "xs",
            matchingIds: ["white", "blue"],
          } as any,
        ],
      },
      {
        color: "blue",
        size: "xs",
      }
    );
    expect(result).toBe(true);
  });
  it("should return false if there is no selectedOption provided", () => {
    const result = isOptionAvailableForSelectedOptions(
      "color",
      "blue",
      { code: "white" } as any,
      {
        color: [
          { code: "blue", matchingIds: ["xs"] } as any,
          { code: "white", matchingIds: ["xs"] } as any,
        ],
        size: [
          {
            code: "xs",
            matchingIds: ["white", "blue"],
          } as any,
        ],
      },
      {}
    );
    expect(result).toBe(false);
  });
  it("should return false if there is no selectedOption provided", () => {
    const result = isOptionAvailableForSelectedOptions(
      "color",
      "blue",
      { code: "white" } as any,
      {
        color: [
          { code: "blue", matchingIds: ["xs"] } as any,
          { code: "white", matchingIds: ["xs"] } as any,
        ],
        size: [
          {
            code: "xl",
            matchingIds: ["white", "blue"],
          } as any,
        ],
      },
      {}
    );
    expect(result).toBe(false);
  });
});
