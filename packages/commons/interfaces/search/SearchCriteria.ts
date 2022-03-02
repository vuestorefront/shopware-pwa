import { Pagination } from "./Pagination";
import {
  EqualsFilter,
  RangeFilter,
  MultiFilter,
  EqualsAnyFilter,
} from "./SearchFilter";
import { Aggregation } from "./Aggregation";
import { TotalCountMode } from "./TotalCountMode";
import { ShopwareAssociation } from "./Association";
import { Grouping } from "./Grouping";
import { StoreSort } from "./StoreSort";

/**
 * @public
 */
export interface Sort {
  key: string;
  priority: number;
  label: string;
}

/**
 * @beta
 */
export interface Includes {
  [key: string]: string[];
}

/**
 * configutarion.displayParents: true - if you want to show all the products
 * @beta
 */
export interface SearchCriteria {
  filters?: Array<EqualsFilter | EqualsAnyFilter | RangeFilter | MultiFilter>;
  pagination?: Pagination;
  sort?: Sort | Sort[];
  term?: string;
  manufacturer?: string[];
  properties?: string[];
  configuration?: {
    displayParents?: boolean;
    grouping?: Grouping;
    associations?: ShopwareAssociation;
    aggregations?: Aggregation[];
    totalCountMode?: TotalCountMode;
    includes?: Includes;
    ids?: string[];
  };
}

/**
 * @beta
 */
export type ShopwareSearchParams = {
  page?: number | undefined;
  limit?: number | undefined;
  filter?:
    | Array<EqualsFilter | EqualsAnyFilter | RangeFilter | MultiFilter>
    | undefined;
  sort?: Array<StoreSort> | undefined;
  postFilter?:
    | Array<EqualsFilter | EqualsAnyFilter | RangeFilter | MultiFilter>
    | undefined;
  associations?: ShopwareAssociation;
  aggregations?: Array<Aggregation> | undefined;
  grouping?: Array<Grouping>;

  /**
   *  Not mentioned in the store-api docs
   */
  order?: string | undefined;
  term?: string | undefined;
  ids?: string[];
  properties?: string | undefined | never[];
  manufacturer?: string | undefined | never[];
  includes?: Includes;
  query?: string;
};
