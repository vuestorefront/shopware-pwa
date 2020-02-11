import { Country } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/country/Country";

export function mapCountries(countries: Country[] | null): {name: string | null, id: string}[] {
  const countryList = countries ?? [];
  return countryList.map((country: Country) => ({
    name: country.name,
    id: country.id
  }));
} 