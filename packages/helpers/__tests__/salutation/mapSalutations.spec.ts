import { mapSalutations } from "@shopware-pwa/helpers";

describe("Shopware helpers - mapSalutations", () => {
  it("should return empty array when salutations are null", () => {
    const salutaions: any = null;
    expect(mapSalutations(salutaions)).toStrictEqual([]);
  });

  it("should return MappedSalutations with displayName mapped to name", () => {
    const salutations: any = [
      {
        displayName: "Mr.",
        id: "id",
        letterName: "Dear Mr.",
        salutationKey: "salutation key"
      },
      {
        displayName: "Mrs.",
        id: "id",
        letterName: "Dear Mrs.",
        salutationKey: "salutation key"
      }
    ];
    expect(mapSalutations(salutations)).toEqual([
      {
        name: "Mr.",
        id: "id"
      },
      {
        name: "Mrs.",
        id: "id"
      }
    ]);
  });

  it("should return mapped salutations with salutationKey mapped to name", () => {
    const salutations: any = [
      {
        id: "id",
        letterName: "Dear Mr.",
        salutationKey: "salutation key"
      },
      {
        id: "id",
        letterName: "Dear Mrs.",
        salutationKey: "salutation key"
      }
    ];
    expect(mapSalutations(salutations)).toEqual([
      {
        name: "salutation key",
        id: "id"
      },
      {
        name: "salutation key",
        id: "id"
      }
    ]);
  });
  it("should mapped salutations contain objects without null name", () => {
    const salutations: any = [
      {
        id: "id",
        letterName: "Dear Mr.",
        salutationKey: "salutation key"
      },
      {
        id: "id",
        letterName: "Dear Mrs.",
        salutationKey: null
      }
    ];
    expect(mapSalutations(salutations)).toEqual([
      {
        name: "salutation key",
        id: "id"
      }
    ]);
  });
});
