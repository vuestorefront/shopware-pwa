import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  NotFilter,
  MultiFilter,
  RangeFilter,
  EqualsFilter,
  EqualsAnyFilter,
  SearchFilterType,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { convertAssociations } from "./convertAssociations";
import { PaginationLimit } from "@shopware-pwa/commons/interfaces/search/Pagination";
import { config } from "@shopware-pwa/shopware-6-client";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";
import { Grouping } from "@shopware-pwa/commons/interfaces/search/Grouping";

/**
 * @alpha
 */
export interface ShopwareParams {
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
}

export const convertSearchCriteria = (
  searchCriteria?: SearchCriteria
): ShopwareParams => {
  let params: ShopwareParams = {};

  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration, term } = searchCriteria;

  if (pagination) {
    const { limit, page } = pagination;
    if (limit && Object.values(PaginationLimit).includes(limit))
      params.limit = limit;
    if (page) {
      params.page = page;
      if (!params.limit) params.limit = config.defaultPaginationLimit;
    }
  }

  if (sort) {
    let prefix = sort.desc ? "-" : "";
    params.sort = `${prefix}${sort.field}`;
  }

  if (filters && filters.length) {
    params.filter = filters;
  }

  if (configuration && configuration.associations) {
    params.associations = convertAssociations(configuration.associations);
  }

  if (configuration?.grouping) {
    params.grouping = configuration.grouping;
  }

  // fulltext query (works for every entity so can be global)
  if (term) {
    params.term = term;
  }

  // add extra grouping option and additional filter to prevent displaying redundand products.
  if (!configuration || (configuration && !configuration.displayParents)) {
    if (!Array.isArray(params.filter)) {
      params.filter = [];
    }
    params.grouping = {
      // prevent displaying parent instances of the product
      field: "displayGroup",
    };
    params.filter.push({
      type: SearchFilterType.NOT,
      queries: [
        {
          type: SearchFilterType.EQUALS,
          field: "displayGroup",
          value: null,
        },
      ],
    });
  }

  return params;
};
