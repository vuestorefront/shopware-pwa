import { searchSuggestedProducts } from "@shopware-pwa/shopware-6-client";

import {
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
export function useProductQuickSearch(): IUseProductQuickSearch {
  const COMPOSABLE_NAME = "useProductQuickSearch";
  const contextName = COMPOSABLE_NAME;

  const { getDefaults } = useDefaults({ defaultsKey: contextName });
  const { apiInstance } = getApplicationContext({ contextName });

  const searchTerm = ref("");

  const listingKey = "productQuickSearch";
  const searchMethod = async (
    searchCriteria: Partial<ShopwareSearchParams>
  ) => {
    return searchSuggestedProducts(searchCriteria, apiInstance);
  };

  const listingComposable = createListingComposable<Product>({
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
