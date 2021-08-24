import { searchSuggestedProducts } from "@shopware-pwa/shopware-6-client";

import {
  ApplicationVueContext,
  getApplicationContext,
  useDefaults,
  createListingComposable,
} from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ComputedRef, Ref, ref } from "vue-demi";

/**
 * @beta
 */
export interface IUseProductQuickSearch {
  searchTerm: Ref<string>;
  loading: ComputedRef<boolean>;
  search: (additionalCriteria?: Partial<ShopwareSearchParams>) => Promise<void>;
  loadMore: () => Promise<void>;
  getProducts: ComputedRef<Product[]>;
  getTotal: ComputedRef<number>;
}

/**
 * @beta
 */
export function useProductQuickSearch(
  rootContext: ApplicationVueContext
): IUseProductQuickSearch {
  const { getDefaults } = useDefaults(rootContext, "useProductQuickSearch");
  const { apiInstance } = getApplicationContext(rootContext, "useListing");

  const searchTerm = ref("");

  const listingKey = "productQuickSearch";
  const searchMethod = async (
    searchCriteria: Partial<ShopwareSearchParams>
  ) => {
    return searchSuggestedProducts(searchCriteria, apiInstance);
  };

  const listingComposable = createListingComposable<Product>({
    rootContext,
    listingKey,
    searchMethod,
    searchDefaults: getDefaults(),
  });

  const search = async (
    additionalCriteria: Partial<ShopwareSearchParams> = {}
  ) => {
    const searchCriteria = {
      query: searchTerm.value,
      ...additionalCriteria,
    };
    return listingComposable.search(searchCriteria, {
      preventRouteChange: true,
    });
  };

  return {
    searchTerm,
    loading: listingComposable.loading,
    search,
    loadMore: listingComposable.loadMore,
    getProducts: listingComposable.getElements,
    getTotal: listingComposable.getTotal,
  };
}
