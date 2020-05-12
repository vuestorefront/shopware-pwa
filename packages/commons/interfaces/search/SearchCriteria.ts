import { Pagination } from "./Pagination";
import {
  EqualsFilter,
  RangeFilter,
  MultiFilter,
  EqualsAnyFilter,
} from "./SearchFilter";
import { Association } from "./Association";
import { Aggregation } from "./Aggregation";
import { TotalCountMode } from "./TotalCountMode";

/**
 * @alpha
 */
export interface Sort {
  field: string;
  desc?: boolean;
}
/**
 * @alpha
 */
export interface Grouping {
  field: string;
}

export enum ApiType {
  store = "store-api",
  salesChannel = "sales-channel-api",
}

/**
 * configutarion.displayParents: true - if you want to show all the products
 *
 * @alpha
 */
export interface SearchCriteria {
  apiType?: ApiType;
  filters?: Array<EqualsFilter | EqualsAnyFilter | RangeFilter | MultiFilter>;
  pagination?: Pagination;
  sort?: Sort;
  term?: string;
  configuration?: {
    displayParents?: boolean;
    grouping?: Grouping;
    associations?: Association[];
    aggregations?: Aggregation[];
    totalCountMode?: TotalCountMode;
  };
}
