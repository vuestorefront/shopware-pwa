import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import queryString from "query-string";

/**
 * @alpha
 */
export function parseUrlQuery(query: any): SearchCriteria {
  const searchCriteria: any = {};
  if (!query || typeof query !== "object") {
    return searchCriteria;
  }

  Object.keys(query).forEach((key: string) => {
    try {
      searchCriteria[key] =
        typeof query[key] === "string" &&
        ["{", "["].includes(query[key].charAt(0)) // it's a JSON
          ? JSON.parse(query[key])
          : query[key];
    } catch (e) {
      console.error(
        "[helpers][parseUrlQuery] Problem with resolving url param: " + key
      );
    }
  });

  return searchCriteria;
}

/**
 * @alpha
 */
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
