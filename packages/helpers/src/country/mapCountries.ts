import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";

/**
 * @alpha
 */
export interface MappedCountry {
  name: string | null;
  id: string;
}

/**
 * Map available countries to (`name`: string | null, id: `string`) format
 *
 * @returns MappedCountries
 * @alpha
 **/
export function mapCountries(countries: Country[]): MappedCountry[] {
  if (!countries?.length) return [];
  const mappedCountries = countries.map((country: Country) => ({
    name: country.name,
    id: country.id,
  }));
  return mappedCountries.filter((country: Country) => country.name !== null);
}
