import { ref, Ref, computed } from "@vue/composition-api";
import {
  getSuggestedResults,
  getSearchResults,
} from "@shopware-pwa/shopware-6-client";
import {
  getListingAvailableFilters,
  UiCategoryFilter,
  toggleFilter as toggleSelectedFilter,
  getFilterSearchCriteria,
} from "@shopware-pwa/helpers";

import {
  SearchCriteria,
  Sort,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  EqualsFilter,
  EqualsAnyFilter,
  ContainsFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Aggregations } from "@shopware-pwa/commons/interfaces/search/Aggregations";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";

/**
 * @beta
 */
export interface CurrentPagination {
  currentPage: number | undefined;
  perPage: number | undefined;
  total: number | undefined;
}

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
  currentPagination: Ref<CurrentPagination | undefined>;
  changePage: (page: number) => Promise<void>;
  changeSorting: (sorting: Sort) => void;
  toggleFilter: (
    filter: EqualsFilter | EqualsAnyFilter | ContainsFilter,
    forceSave: boolean
  ) => void;
  availableFilters: Readonly<Ref<any>>;
  selectedFilters: Readonly<Ref<any>>;
  resetFilters: () => void;
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
  const availableFilters: Ref<UiCategoryFilter[]> = ref([]);
  const selectedFiltersBucket = ref({
    filters: {} as any,
  });
  const currentPagination = computed(() => ({
    currentPage: searchResult.value?.page,
    perPage: searchResult.value?.limit,
    total: searchResult.value?.total,
  }));
  const searchCriteria: Ref<SearchCriteria> = ref({});
  const isBaseSearch = () => !searchCriteria.value.filters?.length;
  const aggregations: Readonly<Ref<Aggregations | null>> = computed(
    () => searchResult.value && searchResult.value.aggregations
  );

  const changePage = (page: number): Promise<void> => {
    /* istanbul ignore else */
    if (!searchCriteria.value.pagination) {
      searchCriteria.value.pagination = {
        limit: currentPagination.value.perPage,
      };
    }

    searchCriteria.value.pagination.page = page;
    return search(currentSearchTerm.value);
  };

  const suggestSearch = async (term: string): Promise<void> => {
    try {
      loadingSuggestions.value = true;
      const suggestedProductListing = await getSuggestedResults(term);
      suggestionsResult.value = suggestedProductListing;
    } catch (e) {
      console.error("useProductSearch:suggestSearch", e);
    } finally {
      loadingSuggestions.value = false;
    }
  };

  const changeSorting = async (sorting: Sort) => {
    if (!sorting) {
      return;
    }
    searchCriteria.value.sort = sorting;
    await search(currentSearchTerm.value);
  };

  const toggleFilter = (
    filter: EqualsFilter | EqualsAnyFilter | ContainsFilter,
    forceSave?: boolean
  ): void => {
    if (!filter || !Object.keys(filter).length) {
      return;
    }

    toggleSelectedFilter(filter, selectedFiltersBucket.value, forceSave);
    const filters = getFilterSearchCriteria(
      selectedFiltersBucket.value.filters
    );
    if (filters.length) {
      searchCriteria.value.filters = filters;
    }
  };

  const search = async (term: string): Promise<void> => {
    if (!term) {
      return;
    }

    try {
      loadingSearch.value = true;
      currentSearchTerm.value = term;
      searchResult.value = null;
      const result = await getSearchResults(term, searchCriteria.value);
      searchResult.value = result;

      // set the base aggregations as default for the listing on first call
      if (isBaseSearch()) {
        availableFilters.value = getListingAvailableFilters(aggregations.value);
      }
    } catch (e) {
      throw e;
    } finally {
      loadingSearch.value = false;
    }
  };

  const resetFilters = () => {
    selectedFiltersBucket.value.filters = {};
    search(currentSearchTerm.value);
  };

  return {
    suggestSearch,
    search,
    currentSearchTerm: computed(() => currentSearchTerm.value),
    loadingSearch,
    loadingSuggestions,
    searchResult: computed(() => searchResult.value),
    suggestionsResult,
    currentPagination,
    changePage,
    changeSorting,
    toggleFilter,
    selectedFilters: computed(() => selectedFiltersBucket.value.filters),
    availableFilters,
    resetFilters,
  };
};
