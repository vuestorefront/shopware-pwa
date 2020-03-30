export enum PaginationLimit {
  ONE = 1,
  FIVE = 5,
  TEN = 10,
  TWENTY_FIVE = 25,
  FIFTY = 50,
  SEVENTY_FIVE = 75,
  HUNDRED = 100,
  FIVE_HUNDRED = 500,
}

/**
 * @alpha
 */
export interface Pagination {
  limit?: PaginationLimit;
  page?: number;
}
