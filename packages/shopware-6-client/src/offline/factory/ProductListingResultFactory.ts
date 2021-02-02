import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

const createProductListingResult = function (
  elements: Array<Product>,
  criteria
): ProductListingResult {
  return {
    apiAlias: "product_listing",
    total: elements.length,
    elements,
    sorting: "score",
    sortings: [],
    limit: 10,
    page: 1,
    currentFilters: {
      search: criteria?.query || "",
    },
    aggregations: {},
  };
};

export { createProductListingResult };
