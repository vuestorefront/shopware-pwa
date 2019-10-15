export interface Params {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: any;
}

export interface ParamsConverter {
  getParams: (pagination?: any, sort?: any, filter?: any) => Params | null;
}
/**
 * @description Combines parameters into one object
 */
const getParams = (
  pagination?: any,
  sort?: any,
  filter?: any
): Params | null => {
  let params = {};

  if (pagination) {
    params = Object.assign(params, pagination);
  }

  if (sort) {
    params = Object.assign(params, sort);
  }

  if (filter) {
    params = Object.assign(params, filter);
  }

  return pagination || sort || filter ? params : null;
};

export const ParamsConverter: ParamsConverter = {
  getParams
};
