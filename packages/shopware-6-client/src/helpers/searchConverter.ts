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
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";
import { Grouping } from "@shopware-pwa/commons/interfaces/search/Grouping";
import { convertToStoreApiFilters } from "../helpers/convertToStoreApiFilters";
import { ClientSettings } from "../settings";
import { warning } from "@shopware-pwa/commons";

/**
 * @beta
 */
export enum ApiType {
  store = "store-api",
  salesChannel = "sales-channel-api",
}

/**
 * @deprecated - that interface will be replaced with the new one from ShopwareSearchParams to follow the product-listing filters interface.
 */
export interface ShopwareParams {
  p?: number; // p for page in store-api
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  term?: string;
  ids?: string;
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

export const convertShopwareSearchCriteria = (
  searchCriteria?: SearchCriteria
): ShopwareSearchParams => {
  const params = {
    limit: searchCriteria?.pagination?.limit || 10,
    p: searchCriteria?.pagination?.page || 1,
    manufacturer: searchCriteria?.manufacturer?.join("|") || undefined,
    properties: searchCriteria?.properties?.join("|") || undefined,
    sort: !Array.isArray(searchCriteria?.sort)
      ? searchCriteria?.sort?.name
      : undefined,
  };

  return params;
};

/**
 * @deprecated - since SW 6.2 the listing filters will be formatted as convertShopwareSearchCriteria method does
 * @param apiType - depending on api type, the output should be different (especially sorting and filters part)
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
  // deprecationWarning({
  //   methodName: "convertSearchCriteria",
  //   newMethodName: "convertShopwareSearchCriteria",
  //   packageName: "helpers",
  // });
  let params: ShopwareParams = {
    limit: config.defaultPaginationLimit,
  };

  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration, term } = searchCriteria;

  if (pagination) {
    const { limit, page } = pagination;
    if (limit) {
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
    if (!apiType || apiType === ApiType.salesChannel) {
      if (Array.isArray(sort)) {
        const sorting = sort.map(
          ({ desc, field }) => `${desc ? "-" : ""}${field}`
        );
        // join fields into format: (-)first_field,(-)second_field,...
        params.sort = sorting.join(",");
      } else {
        let prefix = sort.desc ? "-" : "";
        params.sort = `${prefix}${sort.field}`;
      }
    }

    if (apiType && apiType === ApiType.store) {
      if (Array.isArray(sort)) {
        // sorting by multiple fields is not available for store-api
        warning({
          packageName: "shopware-6-client",
          methodName: "convertSearchCriteria",
          notes: "store-api does not accept sorting on multiple fields",
        });
      } else {
        let order = sort.desc ? "desc" : "asc";
        // TODO: https://github.com/DivanteLtd/shopware-pwa/issues/834
        params.order = sort.name || `${sort.field}-${order}`;
      }
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
    params.associations =
      (Array.isArray(configuration.associations) &&
        convertAssociations(configuration.associations)) ||
      (configuration.associations as any);
  }

  if (configuration?.grouping) {
    params.grouping = configuration.grouping;
  }

  if (configuration?.includes) {
    params.includes = configuration.includes;
  }

  if (configuration?.ids) {
    params.ids = configuration.ids.join("|");
  }

  // fulltext query (works for every entity so can be global)
  if (term) {
    params.term = term;
  }

  return params;
};
