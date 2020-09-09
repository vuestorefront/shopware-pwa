import {
  SearchFilterType,
  MaxFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

const concatIds = (ids: string[]) => ids.join("|");
const isFilterForProperty = (property: string, filter: any) =>
  filter.hasOwnProperty("field") && filter.field === property;

const isFilterType = (type: string, filter: any): boolean =>
  filter.hasOwnProperty("type") && filter.type === type;
interface StoreApiListingFilters {
  manufacturer?: string;
  properties?: string;
  rating?: number;
  "shipping-free"?: number;
  "min-price"?: number;
  "max-price"?: number;
  "no-aggregations"?: number; // 0 if false, 1 otherwise
  [key: string]: any;
}

export function convertToStoreApiFilters(
  filters: Array<any>
): StoreApiListingFilters {
  let params: StoreApiListingFilters = {};

  if (!filters || !filters.length) {
    return {};
  }

  for (const filter of filters) {
    if (isFilterType("max", filter)) {
      const maxFilter: MaxFilter = filter;
      params[maxFilter.field] = maxFilter.max;
    }

    if (isFilterForProperty("price", filter) && filter.parameters) {
      const { lt, gt, lte, gte } = filter.parameters;
      if (lt || lte) {
        params["max-price"] = lt || lte;
      }

      if (gt || gte) {
        params["min-price"] = gt || gte;
      }
    }

    if (isFilterForProperty("manufacturerId", filter) && filter.value) {
      params.manufacturer = concatIds(filter.value);
    }
    if (filter.type === SearchFilterType.MULTI && filter.queries) {
      for (const subFilter of filter.queries) {
        /* istanbul ignore else */
        if (isFilterForProperty("propertyIds", subFilter)) {
          params.properties = concatIds(subFilter.value as any);
        }
      }
    }
  }

  return params;
}
