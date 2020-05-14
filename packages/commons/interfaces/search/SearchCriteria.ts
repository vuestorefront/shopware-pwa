import { Pagination } from "@shopware-pwa/commons/interfaces/search/Pagination";
import {
  EqualsFilter,
  RangeFilter,
  MultiFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Association } from "@shopware-pwa/commons/interfaces/search/Association";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";
import { TotalCountMode } from "@shopware-pwa/commons/interfaces/search/TotalCountMode";

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

/**
 * configutarion.displayParents: true - if you want to show all the products
 *
 * @alpha
 */
export interface SearchCriteria {
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
