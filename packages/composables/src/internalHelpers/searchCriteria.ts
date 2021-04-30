/* istanbul ignore file */

import { stringify } from "query-string";
import {
  ListingQueryParams,
  SearchCriteria,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  EqualsFilter,
  RangeFilter,
  MaxFilter,
  SearchFilterType,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

/**
 * @deprecated this method is no longer supported
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
    sort: !Array.isArray(sort) ? sort?.name : undefined,
    manufacturer: manufacturer,
    properties: properties,
  };
  const combinedURL = stringify(query as any, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|",
    skipNull: true,
    sort: false,
  });

  if (typeof history !== "undefined" && combinedURL) {
    history.replaceState(
      {},
      null as any,
      `${location.pathname}?${combinedURL}`
    );
  }
}

/**
 * @deprecated this method is no longer supported
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
 * @deprecated this method is no longer supported
 */
export const resetSearchCriteria = (
  searchCriteria: Partial<SearchCriteria>
) => {
  searchCriteria.manufacturer = [];
  searchCriteria.properties = [];
  if (!searchCriteria.pagination) {
    searchCriteria.pagination = {};
  }
  if (!searchCriteria.sort) {
    searchCriteria.sort = {} as any;
  }
  searchCriteria.pagination.page = undefined;
  searchCriteria.pagination.limit = undefined;
  searchCriteria.sort = {} as any;
};

interface ShopwareParamsInternal {
  p?: number; // p for page in store-api
  page?: number;
  limit?: number;
  sort?: string;
  //associations?: ShopwareAssociation;
  //grouping?: Grouping;
  properties?: string[]; // store-api filters
  manufacturer?: string[]; // store-api filters
}

/**
 * @deprecated this method is no longer supported
 */
export const toggleEntityFilter = (
  filter: EqualsFilter, // TODO: handle range filter case as well
  selectedCriteria: ShopwareParamsInternal,
  forceSave: boolean = false
): void => {
  if (!filter) {
    return;
  }

  if (!selectedCriteria.properties) {
    selectedCriteria.properties = [];
  }
  if (!selectedCriteria.manufacturer) {
    selectedCriteria.manufacturer = [];
  }

  if (filter.field === "manufacturer" && filter.value) {
    if (selectedCriteria.manufacturer.includes(filter.value)) {
      selectedCriteria.manufacturer = selectedCriteria.manufacturer.filter(
        (manufacturerId) => filter.value !== manufacturerId
      );
    } else {
      selectedCriteria.manufacturer.push(filter.value);
    }
  }

  if (
    !["price", "shipping-free", "rating", "manufacturer"].includes(
      filter.field
    ) &&
    filter.value
  ) {
    if (selectedCriteria.properties.includes(filter.value)) {
      selectedCriteria.properties = selectedCriteria.properties.filter(
        (propertyId) => filter.value !== propertyId
      );
    } else {
      selectedCriteria.properties.push(filter.value);
    }
  }
};

/**
 * @deprecated this method is no longer supported
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/841
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/840
 * @beta
 */
export const toggleFilter = (
  filter: EqualsFilter | RangeFilter | MaxFilter,
  selectedCriteria: any,
  forceSave: boolean = false
): void => {
  if (!filter) {
    return;
  }
  if (filter.type === SearchFilterType.RANGE) {
    const rangeFilter = filter as RangeFilter;
    const selectedRange = selectedCriteria.filters[filter.field];
    selectedCriteria.filters[rangeFilter.field] = Object.assign(
      {},
      selectedRange,
      rangeFilter.parameters
    );
  }

  if (filter.type === SearchFilterType.MAX) {
    const maxFilter = filter as MaxFilter;
    // if (!selectedCriteria.filters[filter.field]) {
    //   selectedCriteria.filters[filter.field] = {};
    // }
    selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
      [filter.field]: maxFilter,
    });
  }

  if (![SearchFilterType.RANGE, SearchFilterType.MAX].includes(filter.type)) {
    const equalsFilter = filter as EqualsFilter;
    if (!!selectedCriteria.filters[equalsFilter.field]) {
      let selected = selectedCriteria.filters[equalsFilter.field];
      if (
        !selected.find((optionId: string) => optionId === equalsFilter.value) ||
        forceSave
      ) {
        selected.push(equalsFilter.value);
      } else {
        selected = selected.filter(
          (optionId: string) => optionId !== equalsFilter.value
        );
      }

      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [equalsFilter.field]: [...new Set(selected)],
      });
    } else {
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [equalsFilter.field]: [equalsFilter.value],
      });
    }
  }
};
