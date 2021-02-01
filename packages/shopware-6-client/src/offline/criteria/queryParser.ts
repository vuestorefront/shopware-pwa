import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import {
  SearchFilter,
  SearchFilterType,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

const parseCriteria = async function (
  allElements: Array<Product>,
  criteria?: ShopwareSearchParams
): Promise<ProductListingResult> {
  console.time("parseCriteria");

  let elements: Array<Product> = [];
  if (typeof criteria !== "undefined" && criteria.query) {
    elements = _parseSearchTerm(criteria?.query, allElements);
  }

  console.timeEnd("parseCriteria");

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

const _parseSearchTerm = function (
  term: string,
  elements: Array<Product>
): Array<Product> {
  let filteredElements = elements.filter((product: Product) => {
    return product.translated.name?.includes(term);
  });

  return filteredElements;
};

export { parseCriteria };
