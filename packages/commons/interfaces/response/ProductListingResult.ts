import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";
import {
  EqualsFilter,
  RangeFilter,
  MultiFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
export interface ProductListingResult {
  /**
   * apiAlias - determines the entity name that can be used within "includes" functionality (added in store-api)
   */
  apiAlias: string;
  total: number;
  elements: Product[];
  sorting: string;
  page: number;
  limit: number;
  sortings: Sort[];
  aggregations: Aggregation[];
  currentFilters: Array<
    EqualsFilter | EqualsAnyFilter | RangeFilter | MultiFilter
  >;
}
