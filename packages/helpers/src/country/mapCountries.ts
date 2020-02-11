import { Country } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/country/Country";

interface MappedCountry {
  name: string | null;
  id: string;
}

/**
 * Map available countries to (`name`: string | null, id: `string`) format
 *
 * @returns MappedCountries
 * @alpha
 **/
export function mapCountries(countries: Country[] | null): MappedCountry[] {
  const countryList = countries ?? [];
  const mappedCountries = countryList.map((country: Country) => ({
    name: country.name,
    id: country.id
  }));
  return mappedCountries.filter((country: Country) => country.name !== null);
}
