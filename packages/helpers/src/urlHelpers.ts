import { SearchCriteria } from "@shopware-pwa/shopware-6-client";
import queryString from "query-string";
import { isObject } from "util";

export function parseUrlQuery(query: any): SearchCriteria {
  const searchCriteria: any = {};
  if (!query || !isObject(query)) {
    return searchCriteria;
  }
  console.warn("TEST 123", query);
  Object.keys(query).forEach((key: string) => {
    searchCriteria[key] = JSON.parse(query[key]);
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
