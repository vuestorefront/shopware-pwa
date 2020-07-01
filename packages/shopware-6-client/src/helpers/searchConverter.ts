import {
  SearchCriteria,
  ShopwareSearchParams,
  Includes,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  NotFilter,
  MultiFilter,
  RangeFilter,
  EqualsFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { convertAssociations } from "./convertAssociations";
import { PaginationLimit } from "@shopware-pwa/commons/interfaces/search/Pagination";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";
import { Grouping } from "@shopware-pwa/commons/interfaces/search/Grouping";
import { convertToStoreApiFilters } from "../helpers/convertToStoreApiFilters";
import { ClientSettings } from "../settings";
import { deprecationWarning } from "@shopware-pwa/commons";

export enum ApiType {
  store = "store-api",
  salesChannel = "sales-channel-api",
}

/**
 * @deprecated - that interface will be replaced with the new one from ShopwareSearchParams to follow the product-listing filters interface.
 * @alpha
 */
export interface ShopwareParams {
  p?: number; // p for page in store-api
  page?: number;
  limit?: number;
  sort?: string;
  term?: string;
  filter?: (
    | NotFilter
    | MultiFilter
    | EqualsFilter
    | EqualsAnyFilter
    | RangeFilter
  )[];
  associations?: ShopwareAssociation;
  grouping?: Grouping;
  properties?: string; // store-api filters
  manufacturer?: string; // store-api filters
  includes?: Includes;
}

/**
 * @param apiType - depending on api type, the output should be different (especially sorting and filters part)
 * @alpha
 **/
export const convertShopwareSearchCriteria = (
  searchCriteria?: SearchCriteria
): ShopwareSearchParams => {
  const params = {
    limit: searchCriteria?.pagination?.limit || 10,
    p: searchCriteria?.pagination?.page || 1,
    manufacturer: searchCriteria?.manufacturer?.join("|") || undefined,
    properties: searchCriteria?.properties?.join("|") || undefined,
    sort: searchCriteria?.sort?.name,
  };

  return params;
};

/**
 * @deprecated - since SW 6.2 the listing filters will be formatted as convertShopwareSearchCriteria method does
 * @param apiType - depending on api type, the output should be different (especially sorting and filters part)
 * @alpha
 **/
export const convertSearchCriteria = ({
  searchCriteria,
  apiType,
  config,
}: {
  searchCriteria?: SearchCriteria;
  apiType?: ApiType;
  config: ClientSettings;
}): ShopwareParams => {
  deprecationWarning({
    methodName: "convertSearchCriteria",
    newMethodName: "convertShopwareSearchCriteria",
    packageName: "helpers",
  });
  let params: ShopwareParams = {
    limit: config.defaultPaginationLimit,
  };

  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration, term } = searchCriteria;

  if (pagination) {
    const { limit, page } = pagination;
    if (limit && Object.values(PaginationLimit).includes(limit)) {
      params.limit = limit;
    }
    if (page) {
      // exception for store-api
      if (apiType && apiType === ApiType.store) {
        // store-api accepts p as page query param (not page for some reason)
        params.p = page;
      } else {
        params.page = page;
      }
    }
  }

  if (sort) {
    // exception for store-api
    if (apiType && apiType === ApiType.store) {
      let order = sort.desc ? "desc" : "asc";
      // TODO: https://github.com/DivanteLtd/shopware-pwa/issues/834
      params.sort = sort.name || `${sort.field}-${order}`;
    } else {
      let prefix = sort.desc ? "-" : "";
      params.sort = `${prefix}${sort.field}`;
    }
  }

  if (filters && filters.length) {
    // append filters in store-api style using convertToStoreApiFilters
    if (apiType && apiType === ApiType.store) {
      params = Object.assign(
        {},
        params,
        convertToStoreApiFilters(filters as any)
      );
    } else {
      params.filter = filters;
    }
  }

  if (configuration && configuration.associations) {
    params.associations = convertAssociations(configuration.associations);
  }

  if (configuration?.grouping) {
    params.grouping = configuration.grouping;
  }

  if (configuration?.includes) {
    params.includes = configuration.includes;
  }

  // fulltext query (works for every entity so can be global)
  if (term) {
    params.term = term;
  }

  return params;
};
