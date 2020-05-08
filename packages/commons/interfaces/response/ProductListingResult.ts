import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

export interface ProductListingResult<> {
  apiAlias: string;
  total: number;
  elements: Product[];
  sorting: string;
  page: number;
  limit: number;
  sortings: any[];
  aggregations: any[];
  currentFilters: any[];
}


