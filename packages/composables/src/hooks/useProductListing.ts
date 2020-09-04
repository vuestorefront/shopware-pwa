import Vue from "vue";
import { ref, Ref, computed, reactive } from "@vue/composition-api";
import {
  EqualsFilter,
  RangeFilter,
  SearchFilterType,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { getCategoryProductsListing } from "@shopware-pwa/shopware-6-client";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import {
  Sort,
  SearchCriteria,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  getFilterSearchCriteria,
  getSortingSearchCriteria,
  exportUrlQuery,
  getListingAvailableFilters,
} from "@shopware-pwa/helpers";
import {
  useCms,
  useCategoryFilters,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";
import { useDefaults } from "../logic/useDefaults";

import {
  toggleEntityFilter,
  toggleFilter as toggleGenericFilter,
} from "../internalHelpers/searchCriteria";
/**
 * @alpha
 */
export interface UseProductListing {
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

const sharedPagination = Vue.observable({
  currentPage: 1,
  perPage: 10,
  total: 100,
} as any);

const sharedListing = Vue.observable({
  products: [],
  availableFilters: [],
} as any);

const selectedCriteria = Vue.observable({
  pagination: {},
  propertyIds: [],
  manufacturer: [],
  properties: [],
  filters: {},
  sorting: "",
} as any);

/**
 * @alpha
 */
export const useProductListing = (
  rootContext: ApplicationVueContext,
  initialListing?: ProductListingResult
): UseProductListing => {
  const { apiInstance } = getApplicationContext(
    rootContext,
    "useProductListing"
  );
  const { getAssociationsConfig, getIncludesConfig } = useDefaults(
    rootContext,
    "useProductListing"
  );
  const { categoryId } = useCms(rootContext);
  const { activeSorting } = useCategoryFilters(rootContext);

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const localListing = reactive(sharedListing);
  const localCriteria = reactive(selectedCriteria);
  const localPagination = reactive(sharedPagination);
  const productListingResult: Ref<ProductListingResult | null> = ref(null);

  // check whether the search result has some filters applied
  /* istanbul ignore next */
  const isBaseRequest = () =>
    !productListingResult.value?.currentFilters?.manufacturer?.length &&
    !productListingResult.value?.currentFilters?.properties?.length;

  if (initialListing?.elements && initialListing.elements.length) {
    sharedListing.products = initialListing.elements;
  }

  selectedCriteria.sorting = activeSorting.value;

  if (initialListing?.aggregations) {
    sharedListing.availableFilters = getListingAvailableFilters(
      initialListing.aggregations
    );
  }

  const resetFilters = () => {
    selectedCriteria.filters = {};
    selectedCriteria.manufacturer = [];
    selectedCriteria.properties = [];
  };

  const resetSorting = () => {
    selectedCriteria.sorting = activeSorting.value;
  };

  const setupPagination = () => {
    if (
      !initialListing ||
      isNaN(initialListing.total as any) ||
      isNaN(initialListing.page as any) ||
      isNaN(initialListing.limit as any)
    ) {
      return;
    }

    sharedPagination.total = initialListing.total;
    sharedPagination.currentPage = initialListing.page;
    sharedPagination.perPage = initialListing.limit;
  };

  const toggleFilter = (
    filter: EqualsFilter | RangeFilter,
    forceSave?: boolean
  ): undefined | string => {
    if (!filter || !Object.keys(filter).length) {
      return;
    }
    if (filter.type === SearchFilterType.RANGE) {
      toggleGenericFilter(filter, selectedCriteria);
    }

    if ([SearchFilterType.EQUALS].includes(filter.type)) {
      toggleEntityFilter(filter as EqualsFilter, selectedCriteria, forceSave);
    }
  };

  const changeSorting = (sorting: Sort) => {
    if (!sorting) {
      return;
    }
    selectedCriteria.sorting = sorting;
    search();
  };
  const search = async (): Promise<void> => {
    loading.value = true;
    const searchCriteria: SearchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria(
        Object.assign({}, selectedCriteria.filters, {
          // Add entity filters to other filters' object
          manufacturer: selectedCriteria.manufacturer,
          properties: selectedCriteria.properties,
        })
      ),
      sort: getSortingSearchCriteria(selectedCriteria.sorting),
      configuration: {
        associations: getAssociationsConfig(),
        includes: getIncludesConfig(),
      },
    };

    const search = exportUrlQuery(searchCriteria);
    /* istanbul ignore next */
    if (typeof history !== "undefined")
      history.replaceState({}, null as any, location.pathname + "?" + search);

    productListingResult.value = await getCategoryProductsListing(
      categoryId.value,
      searchCriteria,
      apiInstance
    );
    sharedPagination.total =
      (productListingResult.value && productListingResult.value.total) || 0;
    sharedListing.products = productListingResult.value?.elements || [];

    // base response has always all the aggregations
    if (isBaseRequest()) {
      sharedListing.availableFilters = getListingAvailableFilters(
        productListingResult.value?.aggregations
      );
    } else {
      // get the aggregations without narrowing down the results, so another api call is needed (using post-aggregation may fix it)
      const productListingBaseResult = await getCategoryProductsListing(
        categoryId.value,
        { pagination: { limit: 1 } },
        apiInstance
      );
      sharedListing.availableFilters = getListingAvailableFilters(
        productListingBaseResult.aggregations
      );
    }

    initialListing = undefined;
    loading.value = false;
  };

  const changePagination = async (page: number) => {
    if (!page) {
      return;
    }
    sharedPagination.currentPage = page;
    selectedCriteria.pagination = {
      limit: sharedPagination.perPage,
      page,
    };

    await search();
  };

  // if reloaded on route change
  if (initialListing) {
    resetFilters();
    resetSorting();
    setupPagination();
  }

  const pagination: any = computed(() => localPagination);
  const products = computed(() => localListing.products);
  const productsTotal = computed(() => localPagination.total);
  const selectedEntityFilters = computed(() => [
    ...localCriteria.manufacturer,
    ...localCriteria.properties,
  ]);
  const selectedFilters = computed(() => localCriteria.filters);
  const selectedSorting = computed(() => localCriteria.sorting);
  const availableFilters = computed(() => localListing.availableFilters);

  return {
    search,
    pagination,
    products,
    productsTotal,
    loading,
    error,
    changePagination,
    selectedFilters,
    selectedEntityFilters,
    toggleFilter,
    resetFilters,
    changeSorting,
    selectedSorting,
    categoryId,
    availableFilters,
  };
};
