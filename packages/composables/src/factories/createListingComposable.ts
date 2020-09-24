import { getListingFilters } from "@shopware-pwa/helpers";

import {
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { computed, ref } from "@vue/composition-api";
import merge from "lodash/merge";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";

/**
 * @beta
 */
export interface IUseListing {
  [x: string]: any;
}

/**
 * Factory to create your own listing. By default you can use useListing composable, which provides you predefined listings for category(cms) listing and product search listing.
 * Using factory you can provide our own compatible search method and use it for example for creating listing of orders in my account.
 *
 * @beta
 */
export function createListingComposable({
  rootContext,
  searchMethod,
  searchDefaults,
  listingKey,
}: {
  rootContext: ApplicationVueContext;
  searchMethod: (
    searchParams: Partial<ShopwareSearchParams>
  ) => Promise<ProductListingResult>; // TODO: add type for Shopware Listing Result
  searchDefaults: ShopwareSearchParams;
  listingKey: string;
}): IUseListing {
  const { vuexStore, router } = getApplicationContext(
    rootContext,
    "createListingComposable"
  );

  const loading = ref(false);
  const loadingMore = ref(false);

  const getInitialListing = computed(
    () => vuexStore.getters.getInitialListings[listingKey] || {}
  );
  const setInitialListing = (initialListing: any) => {
    vuexStore.commit("SET_INITIAL_LISTING", { listingKey, initialListing });
    appliedListing.value = null;
  };

  // for internal usage, actual listing is computed from applied and initial listing
  const appliedListing = computed({
    get: () => vuexStore.getters.getAppliedListings[listingKey],
    set: (appliedListing) => {
      vuexStore.commit("SET_APPLIED_LISTING", { listingKey, appliedListing });
    },
  });

  const initSearch = async (
    criteria: Partial<ShopwareSearchParams>
  ): Promise<void> => {
    loading.value = true;
    try {
      const searchCriteria = merge({}, searchDefaults, criteria);

      const result = await searchMethod(searchCriteria);

      setInitialListing(result);
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const search = async (
    criteria: Partial<ShopwareSearchParams>
  ): Promise<void> => {
    loading.value = true;
    try {
      // replace URL query params with currently selected criteria
      router
        .replace({
          query: {
            ...criteria,
          },
        })
        .catch(() => {});

      // prepare full criteria using defaults and currently selected criteria
      const searchCriteria = merge({}, searchDefaults, criteria);
      const result = await searchMethod(searchCriteria);
      appliedListing.value = result;
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async (): Promise<void> => {
    loadingMore.value = true;
    try {
      const query = {
        ...router.currentRoute.query,
        p: getCurrentPage.value + 1,
      };

      const searchCriteria = merge({}, searchDefaults, query);
      const result = await searchMethod(searchCriteria);
      appliedListing.value = {
        ...getCurrentListing.value,
        page: result.page,
        elements: [...getCurrentListing.value.elements, ...result.elements],
      };
    } catch (e) {
      throw e;
    } finally {
      loadingMore.value = false;
    }
  };

  const getCurrentListing = computed(() => {
    return appliedListing.value || getInitialListing.value;
  });

  const getProducts = computed(() => {
    return getCurrentListing.value?.elements || [];
  });
  const getTotal = computed(() => {
    return getCurrentListing.value?.total || 0;
  });
  const getLimit = computed(() => {
    return getCurrentListing.value?.limit || searchDefaults?.limit || 10;
  });

  const getTotalPagesCount = computed(() =>
    Math.ceil(getTotal.value / getLimit.value)
  );

  const getOrderOptions = computed(() => {
    const oldSortings = Object.values(getCurrentListing.value?.sortings || {}); // before Shopware 6.4
    return getCurrentListing.value?.availableSortings || oldSortings;
  });

  const getCurrentSortingOrder = computed(
    () => getCurrentListing.value?.sorting
  );
  const changeCurrentSortingOrder = async (order: string | string[]) => {
    const query = {
      ...router.currentRoute.query,
      order,
    };
    await search(query);
  };

  const getCurrentPage = computed(() => getCurrentListing.value?.page || 1);
  const changeCurrentPage = async (pageNumber: number | string) => {
    const query = {
      ...router.currentRoute.query,
      p: pageNumber || 1,
    };
    await search(query);
  };

  const getAvailableFilters = computed(() => {
    return getListingFilters(getCurrentListing.value?.aggregations);
  });

  const getCurrentFilters = computed(() => {
    const currentFiltersResult: any = {};
    const currentFilters = {
      ...getCurrentListing.value.currentFilters,
      ...router.currentRoute.query,
    };
    Object.keys(currentFilters).forEach((objectKey) => {
      if (!currentFilters[objectKey]) return;
      if (objectKey === "navigationId") return;
      if (objectKey === "price") {
        if (currentFilters[objectKey].min)
          currentFiltersResult["min-price"] = currentFilters[objectKey].min;
        if (currentFilters[objectKey].max)
          currentFiltersResult["max-price"] = currentFilters[objectKey].max;
        return;
      }
      if (objectKey === "p") return;
      currentFiltersResult[objectKey] = currentFilters[objectKey];
    });
    return currentFiltersResult;
  });

  return {
    getInitialListing,
    setInitialListing,
    initSearch,
    search,
    getCurrentListing,
    getProducts,
    getOrderOptions,
    getCurrentSortingOrder,
    changeCurrentSortingOrder,
    getCurrentPage,
    changeCurrentPage,
    getTotal,
    getTotalPagesCount,
    getLimit,
    getAvailableFilters,
    getCurrentFilters,
    loading,
    loadMore,
    loadingMore,
  };
}
