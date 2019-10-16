import { SearchCriteria } from "../interfaces/search/SearchCriteria";

export interface Params {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: any;
}

/**
 * @description Combines parameters into one object
 */
export const getParams = (searchCriteria?: SearchCriteria): Params | null => {
  let params = {};

  if (!searchCriteria) return params;

  if (searchCriteria.pagination) {
    params = Object.assign(params, searchCriteria.pagination);
  }

  // if (sort) {
  //   params = Object.assign(params, sort);
  // }

  if (searchCriteria.filters) {
    params = Object.assign(params, searchCriteria.filters);
  }

  return params;
};
