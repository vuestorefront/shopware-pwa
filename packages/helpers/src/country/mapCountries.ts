import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";

/**
 * Map available countries to (`name`: string | null, id: `string`) format
 *
 * @returns MappedCountries
 * @public
 **/
export function mapCountries(countries: Country[]): Array<{
  name: string | null;
  id: string;
}> {
  if (!countries?.length) return [];
  const mappedCountries = countries.map((country: Country) => ({
    name: country.translated?.name || country.name,
    id: country.id,
  }));
  return mappedCountries.filter((country: Country) => country.name !== null);
}
