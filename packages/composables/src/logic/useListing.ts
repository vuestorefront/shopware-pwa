import { getCategoryProducts } from "@shopware-pwa/shopware-6-client";
import { getListingAvailableFilters } from "@shopware-pwa/helpers";

import {
  useCms,
  ApplicationVueContext,
  getApplicationContext,
  useDefaults,
} from "@shopware-pwa/composables";
import { computed, ref } from "@vue/composition-api";
import merge from "lodash/merge";

/**
 * @alpha
 */
export interface IUseListing {
  [x: string]: any;
}

/**
 * @alpha
 */
// useCmsListing
export const useListing = (
  rootContext: ApplicationVueContext,
  listingKey: string
): IUseListing => {
  const { apiInstance, vuexStore, router } = getApplicationContext(
    rootContext,
    "useListing"
  );

  const loading = ref(false);
  const loadingMore = ref(false);
  const { getDefaults } = useDefaults(rootContext, "useProductListing");
  const { categoryId } = useCms(rootContext);

  const getInitialListing = computed(
    () => vuexStore.getters.getInitialListings[listingKey] || {}
  );
  const setInitialListing = (initialListing: any) =>
    vuexStore.commit("SET_INITIAL_LISTING", { listingKey, initialListing });

  const appliedListing = computed({
    get: () => vuexStore.getters.getAppliedListings[listingKey],
    set: (appliedListing) => {
      vuexStore.commit("SET_APPLIED_LISTING", { listingKey, appliedListing });
    },
  });

  const search = async (criteria: any): Promise<void> => {
    loading.value = true;
    try {
      router
        .replace({
          query: {
            ...criteria,
          },
        })
        .catch(() => {});

      const searchCriteria = merge({}, getDefaults(), criteria);
      const result = await getCategoryProducts(
        categoryId.value,
        searchCriteria,
        apiInstance
      );
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
        p: currentPage.value + 1,
      };

      const searchCriteria = merge({}, getDefaults(), query);
      const result = await getCategoryProducts(
        categoryId.value,
        searchCriteria,
        apiInstance
      );
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
    return getCurrentListing.value?.limit || getDefaults()?.limit || 10;
  });

  const getTotalPagesCount = computed(() =>
    Math.ceil(getTotal.value / getLimit.value)
  );

  const getOrderOptions = computed(() => {
    const sortings = getCurrentListing.value?.sortings || {};
    return Object.values(sortings);
  });

  // TODO: add possibility to pass an array for multiple orders strategy
  const currentSortingOrder = computed({
    get: () => getCurrentListing.value?.sorting,
    set: (order) => {
      const query = {
        ...router.currentRoute.query,
        order,
      };
      search(query);
    },
  });

  const currentPage = computed({
    get: () => getCurrentListing.value?.page || 1,
    set: (page) => {
      const query = {
        ...router.currentRoute.query,
        p: page || 1,
      };

      search(query);
    },
  });

  const getAvailableFilters = computed(() => {
    return getListingAvailableFilters(getCurrentListing.value?.aggregations);
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
    search,
    getCurrentListing,
    getProducts,
    getOrderOptions,
    currentSortingOrder,
    currentPage,
    getTotal,
    getTotalPagesCount,
    getLimit,
    getAvailableFilters,
    getCurrentFilters,
    loading,
    loadMore,
    loadingMore,
  };
};
