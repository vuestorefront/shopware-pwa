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
  loadingSearch: Readonly<Ref<boolean>>;
  loadingSuggestions: Readonly<Ref<boolean>>;
  currentSearchTerm: Readonly<Ref<string>>;
  searchResult: Readonly<Ref<ProductListingResult | null>>;
  suggestionsResult: Readonly<Ref<ProductListingResult | null>>;
  suggestSearch: (term: string) => Promise<void>;
  search: (term: string, searchCriteria?: SearchCriteria) => Promise<void>;
}

/**
 * @alpha
 */
export const useProductSearch = (): UseProductSearch => {
  const loadingSearch: Ref<boolean> = ref(false);
  const loadingSuggestions: Ref<boolean> = ref(false);
  const currentSearchTerm: Ref<string> = ref("");
  const searchResult: Ref<ProductListingResult | null> = ref(null);
  const suggestionsResult: Ref<ProductListingResult | null> = ref(null);

  const suggestSearch = async (
    term: string,
    searchCriteria?: SearchCriteria
  ): Promise<void> => {
    try {
      loadingSuggestions.value = true;
      const suggestedProductListing = await getSuggestedResults(
        term,
        searchCriteria
      );
      suggestionsResult.value = suggestedProductListing;
    } catch (e) {
      console.error("useProductSearch:suggestSearch", e);
    } finally {
      loadingSuggestions.value = false;
    }
  };

  const search = async (
    term: string,
    searchCriteria?: SearchCriteria
  ): Promise<void> => {
    try {
      loadingSearch.value = true;
      currentSearchTerm.value = term;
      searchResult.value = null;
      const result = await getResults(term, searchCriteria);
      searchResult.value = result;
    } catch (e) {
      throw e;
    } finally {
      loadingSearch.value = false;
    }
  };

  return {
    suggestSearch,
    search,
    currentSearchTerm: computed(() => currentSearchTerm.value),
    loadingSearch,
    loadingSuggestions,
    searchResult: computed(() => searchResult.value),
    suggestionsResult: computed(() => suggestionsResult.value),
  };
};
