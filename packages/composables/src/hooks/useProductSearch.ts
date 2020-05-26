import Vue from "vue";
import { ref, Ref, computed, reactive } from "@vue/composition-api";
import {
  getSuggestedResults,
  getResults,
} from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";


/**
 * @alpha
 */
export interface UseProductSearch {
  loading: Ref<boolean>;
  suggestSearch: (term: string) => Promise<any>;
  error: Ref<any>;
  [x: string]: any;
}

const sharedSearch = Vue.observable({
  query: null,
} as any);

/**
 * @alpha
 */
export const useProductSearch = (): UseProductSearch => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const localSharedSearch = reactive(sharedSearch);
  const suggestedProductListingResult: Ref<ProductListingResult | null> = ref(null);

  const suggestSearch = async (
    term: string,
    searchCriteria?: SearchCriteria
  ): Promise<any> => {
    console.warn('suggestSearch', term);
    const suggestedProductListing = await getSuggestedResults(
      term,
      searchCriteria
    );
    suggestedProductListingResult.value = suggestedProductListing || []
    return suggestedProductListing;
  };

  const search = async (
    term: string,
    searchCriteria?: SearchCriteria
  ): Promise<any> => {
    const result = await getResults(term, searchCriteria);
    sharedSearch.query = term;

    return result;
  };

  const currentQuery = computed({
    get: () => localSharedSearch.query,
    set: (query) => {}
  });

  return {
    suggestSearch,
    search,
    currentQuery,
    suggestedProductListingResult,
    loading,
    error,
  };
};
