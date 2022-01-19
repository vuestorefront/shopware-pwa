import { Country } from "@shopware-pwa/commons";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

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
    name: getTranslatedProperty(country, "name"),
    id: country.id,
  }));
  return mappedCountries.filter((country) => !!country.name);
}
