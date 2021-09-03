import { Pagination } from "@shopware-pwa/commons/interfaces/search/Pagination";
import {
  EqualsFilter,
  RangeFilter,
  MultiFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";
import { TotalCountMode } from "@shopware-pwa/commons/interfaces/search/TotalCountMode";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";

/**
 * @public
 */
export interface Sort {
  key: string;
  priority: number;
  label: string;
}
/**
 * @public
 */
export interface Grouping {
  field: string;
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
  //
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
  p?: number | undefined;
  limit?: number | undefined;
  /**
   *  @deprecated use order property instead
   */
  sort?: string | undefined;
  order?: string | undefined;
  term?: string | undefined;
  ids?: string[];
  associations?: ShopwareAssociation;
  grouping?: Grouping;
  properties?: string | undefined | never[];
  manufacturer?: string | undefined | never[];
  includes?: Includes;
  query?: string;
};
