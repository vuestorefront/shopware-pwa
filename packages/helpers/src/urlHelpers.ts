import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
import queryString from "query-string";

export function parseUrlQuery(query: any): SearchCriteria {
  const searchCriteria: any = {};
  if (!query || typeof query !== "object") {
    return searchCriteria;
  }
  Object.keys(query).forEach((key: string) => {
    searchCriteria[key] =
      typeof query[key] === "string" ? JSON.parse(query[key]) : query[key];
  });

  return searchCriteria;
}

export function exportUrlQuery(
  searchCriteria: SearchCriteria
): string | undefined {
  if (!searchCriteria) {
    return;
  }
  const sC: any = searchCriteria;
  const query: any = {};
  Object.keys(searchCriteria).forEach((key: string) => {
    query[key] = JSON.stringify(sC[key]);
  });
  return queryString.stringify(query);
}
