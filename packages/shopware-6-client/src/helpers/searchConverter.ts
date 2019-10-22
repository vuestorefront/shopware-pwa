import { SearchCriteria } from "../interfaces/search/SearchCriteria";
import { SearchFilter } from "../interfaces/search/SearchFilter";
import { PaginationLimit } from "../interfaces/search/Pagination";

interface ShopwareAssociation {
  [name: string]: any;
}

export interface ShopwareParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: SearchFilter[];
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

export const convertSearchCriteria = (
  searchCriteria?: SearchCriteria
): ShopwareParams => {
  let params: ShopwareParams = {};

  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration } = searchCriteria;

  if (pagination) {
    const { limit, page } = pagination;
    if (page) params.page = page;
    if (limit && Object.values(PaginationLimit).includes(limit))
      params.limit = limit;
  }

  if (sort) {
    let prefix = sort.desc ? "-" : "";
    params.sort = `${prefix}${sort.field}`;
  }

  if (filters && filters.length) {
    params.filter = filters;
  }

  if (configuration) {
    const associations = configuration.associations;
    if (associations && associations.length) {
      let shopwareAssociations: ShopwareAssociation = {};
      associations.forEach(association => {
        shopwareAssociations[association.name] = {};
      });
      params.associations = shopwareAssociations;
    }
  }

  return params;
};
