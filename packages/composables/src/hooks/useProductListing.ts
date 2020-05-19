import Vue from "vue";
import { ref, Ref, computed, reactive } from "@vue/composition-api";
import {
  EqualsFilter,
  EqualsAnyFilter,
  ContainsFilter,
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
} from "@shopware-pwa/helpers";
import { useCms } from "./useCms";
import { useCategoryFilters } from "./useCategoryFilters";

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
} as any);

const selectedCriteria = Vue.observable({
  pagination: null,
  propertyIds: [],
  filters: {},
  sorting: "",
} as any);

/**
 * @alpha
 */
export const useProductListing = (
  initialListing?: ProductListingResult
): UseProductListing => {
  const { categoryId } = useCms();
  const { activeSorting } = useCategoryFilters();

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const localListing = reactive(sharedListing);
  const localCriteria = reactive(selectedCriteria);
  const localPagination = reactive(sharedPagination);

  sharedListing.products = initialListing?.elements || [];
  selectedCriteria.sorting = activeSorting.value;

  const resetFilters = () => {
    selectedCriteria.filters = {};
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
    filter: EqualsFilter | EqualsAnyFilter | ContainsFilter, // TODO: handle range filter case as well
    forceSave: boolean = false
  ): void => {
    if (!!selectedCriteria.filters[filter.field]) {
      let selected = selectedCriteria.filters[filter.field];
      if (
        !selected.find((optionId: string) => optionId === filter.value) ||
        forceSave
      ) {
        selected.push(filter.value);
      } else {
        selected = selected.filter(
          (optionId: string) => optionId !== filter.value
        );
      }

      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [...new Set(selected)],
      });
    } else {
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [filter.value],
      });
    }
  };

  const changeSorting = async (sorting: Sort) => {
    if (!sorting) {
      return;
    }
    selectedCriteria.sorting = sorting;
    await search();
  };
  const search = async (): Promise<void> => {
    loading.value = true;
    const searchCriteria: SearchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria(selectedCriteria.filters),
      sort: getSortingSearchCriteria(selectedCriteria.sorting),
      configuration: {
        // fetch variant options
        associations: [
          {
            name: "options",
          },
          // fetch productReviews
          {
            name: "productReviews",
          },
        ],
      },
    };

    const search = exportUrlQuery(searchCriteria);
    /* istanbul ignore next */
    if (typeof history !== "undefined")
      history.replaceState({}, null as any, location.pathname + "?" + search);

    const result = await getCategoryProductsListing(
      categoryId.value,
      searchCriteria
    );
    sharedPagination.total = (result && result.total) || 0;
    sharedListing.products = result?.elements || [];
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
  const selectedFilters = computed(() => localCriteria.filters);
  const selectedSorting = computed(() => localCriteria.sorting);

  return {
    search,
    pagination,
    products,
    productsTotal,
    loading,
    error,
    changePagination,
    selectedFilters,
    toggleFilter,
    resetFilters,
    changeSorting,
    selectedSorting,
    categoryId,
  };
};
