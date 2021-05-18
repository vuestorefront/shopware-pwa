import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Aggregations } from "@shopware-pwa/commons/interfaces/search/Aggregations";

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
  availableSortings: Sort[];
  aggregations: Aggregations;
  entity: string;
  currentFilters: {
    manufacturer: string[];
    properties: string[];
    price: { min: null | number; max: null | number };
    rating: number;
    search: string | null;
    "shipping-free": boolean | null;
  };
}
