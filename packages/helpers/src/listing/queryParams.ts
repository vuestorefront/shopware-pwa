import queryString from "query-string";
import {
  ListingQueryParams,
  SearchCriteria,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @beta
 */
export function appendQueryParamsToSearchCriteria(
  params: ListingQueryParams,
  searchCriteria: SearchCriteria
): void {
  if (!params || !searchCriteria) {
    return;
  }

  if (params.sort && params.sort !== "") {
    const [field, order] = params.sort.split("-");
    searchCriteria.sort = {
      name: params.sort,
      field: field,
      order: order,
    };
  }
  if (!searchCriteria.pagination) {
    searchCriteria.pagination = {};
  }
  searchCriteria.pagination.page = params.page;
  searchCriteria.pagination.limit = params.limit;
  searchCriteria.properties =
    (typeof params.properties === "string" && params.properties.split("|")) ||
    [];
  searchCriteria.manufacturer =
    (typeof params.manufacturer === "string" &&
      params.manufacturer.split("|")) ||
    [];
}

/**
 * @beta
 */
export function appendSearchCriteriaToUrl(
  searchCriteria: SearchCriteria,
  searchTerm: string
): void {
  if (!searchCriteria) {
    return;
  }

  const { pagination, sort, manufacturer, properties } = searchCriteria;
  const query: ListingQueryParams = {
    query: searchTerm,
    page: pagination?.page,
    limit: pagination?.limit,
    sort: sort?.name,
    manufacturer: manufacturer,
    properties: properties,
  };
  const combinedURL = queryString.stringify(query, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|",
    skipNull: true,
  });

  if (typeof history !== "undefined" && combinedURL) {
    history.replaceState(
      {},
      null as any,
      `${location.pathname}?${combinedURL}`
    );
  }
}
