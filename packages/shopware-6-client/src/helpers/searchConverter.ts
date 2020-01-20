import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
import {
  MultiFilter,
  RangeFilter,
  EqualsFilter,
  EqualsAnyFilter
} from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchFilter";
import { PaginationLimit } from "@shopware-pwa/shopware-6-client/src/interfaces/search/Pagination";
import { config } from "@shopware-pwa/shopware-6-client";
import { Association } from "@shopware-pwa/shopware-6-client/src/interfaces/search/Association";

interface ShopwareAssociation {
  [name: string]: {
    associations?: ShopwareAssociation;
  };
}

/**
 * @alpha
 */
export interface ShopwareParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: (MultiFilter | EqualsFilter | EqualsAnyFilter | RangeFilter)[];
  associations?: ShopwareAssociation;
}

// simple
// const equals = {
//   type: "equals",
//   field: string,
//   value: string | number
// }

// const contains = {
//   type: "contains",
//   field: string,
//   value: string | number
// }

// const equalsAny = {
//   type: "equalsAny",
//   field: string,
//   value: string // "wartosc|wartosc2|wartosc3"
// }

// interface range {
//   type: string // "range",
//   field: string,
//   parameters: {
//     lt?: string|number
//     gt?: string|number
//     lte?:  string|number
//     gte?: string|number
//   }
// }

// advanced
// const not = {
//   type: "not",
//   operator: "AND" | "OR" | "XOR"
//   queries: Array[ShopwareFilter]
// }

// const multi = {
//   type: "multi",
//   operator: "AND" | "OR" | "XOR"
//   queries: Array[ShopwareFilter]
// }

// interface ShopwareSort { //?sort=-field

// }

function convertAssociations(
  associations: Association[] = []
): ShopwareAssociation | undefined {
  if (!associations || !associations.length) return;
  let shopwareAssociations: ShopwareAssociation = {};
  associations.forEach(association => {
    shopwareAssociations[association.name] = {
      associations: convertAssociations(association.associations)
    };
  });
  return shopwareAssociations;
}

export const convertSearchCriteria = (
  searchCriteria?: SearchCriteria
): ShopwareParams => {
  let params: ShopwareParams = {};

  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration } = searchCriteria;

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

  if (configuration) {
    params.associations = convertAssociations(configuration.associations);
  }

  return params;
};
