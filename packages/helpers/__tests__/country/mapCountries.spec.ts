import { mapCountries } from "@shopware-pwa/helpers";

describe("Shopware helpers - mapCountries", () => {
  it("should return empty array when countries are null", () => {
    const salutaions: any = null;
    expect(mapCountries(salutaions)).toStrictEqual([]);
  });

  it("should return mapped countries", () => {
    const countries: any = [
      {
        name: "Norway",
        active: true,
        id: "id",
        iso: "iso",
        createdAt: "date"
      },
      {
        name: "Romania",
        active: true,
        id: "id",
        iso: "iso",
        createdAt: "date"
      }
    ];
    expect(mapCountries(countries)).toEqual([
      {
        name: "Norway",
        id: "id"
      },
      {
        name: "Romania",
        id: "id"
      }
    ]);
  });
  it("should return mapped countries only with defined name", () => {
    const countries: any = [
      {
        name: null,
        active: true,
        id: "id",
        iso: "iso",
        createdAt: "date"
      },
      {
        name: "Romania",
        active: true,
        id: "id",
        iso: "iso",
        createdAt: "date"
      }
    ];
    expect(mapCountries(countries)).toEqual([
      {
        name: "Romania",
        id: "id"
      }
    ]);
  });
});
