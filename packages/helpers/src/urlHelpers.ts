import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @internal
 */
export function _parseUrlQuery(query: any): SearchCriteria {
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
