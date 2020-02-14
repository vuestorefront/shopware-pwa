import Vue from "vue";
import { ref, Ref, computed, reactive } from "@vue/composition-api";
import {
  EqualsFilter,
  SearchFilterType,
  EqualsAnyFilter,
  ContainsFilter
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { getProducts } from "@shopware-pwa/shopware-6-client";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import {
  Sort,
  SearchCriteria
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  getFilterSearchCriteria,
  getSortingSearchCriteria,
  exportUrlQuery
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
  total: 100
} as any);

const sharedListing = Vue.observable({
  products: []
} as any);

const selectedCriteria = Vue.observable({
  pagination: null,
  propertyIds: [],
  filters: {},
  sorting: ""
} as any);

/**
 * @alpha
 */
export const useProductListing = (
  initialProducts: Product[] = []
): UseProductListing => {
  const { page } = useCms();
  const { activeSorting } = useCategoryFilters();

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const categoryId: Ref<string> = ref(
    page && page.value && page.value.resourceIdentifier
  );
  const localListing = reactive(sharedListing);
  const localCriteria = reactive(selectedCriteria);
  const localPagination = reactive(sharedPagination);

  sharedListing.products = initialProducts;
  selectedCriteria.sorting = activeSorting.value;

  const resetFilters = () => {
    selectedCriteria.filters = {};
  };

  const resetSorting = () => {
    selectedCriteria.sorting = activeSorting.value;
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
        [filter.field]: [...new Set(selected)]
      });
    } else {
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [filter.value]
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
    toggleFilter(
      {
        // append selected filters with currentCategory; should be taken from usePage
        field: "categoryTree",
        type: SearchFilterType.EQUALS_ANY,
        value: categoryId.value
      },
      true
    );

    const searchCriteria: SearchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria(selectedCriteria.filters),
      sort: getSortingSearchCriteria(selectedCriteria.sorting),
      configuration: {
        // fetch variant options
        associations: [
          {
            name: "options"
          },
          // fetch productReviews
          {
            name: "productReviews"
          }
        ]
      }
    };

    const search = exportUrlQuery(searchCriteria);
    /* istanbul ignore next */
    if (typeof history !== "undefined")
      history.replaceState({}, null as any, location.pathname + "?" + search);

    const result = await getProducts(searchCriteria);
    sharedPagination.total = (result && result.total) || 0;
    sharedListing.products = (result && result.data && [...result.data]) || [];
    loading.value = false;
  };

  const changePagination = async (page: number) => {
    if (!page) {
      return;
    }
    sharedPagination.currentPage = page;
    selectedCriteria.pagination = {
      limit: sharedPagination.perPage,
      page
    };
    await search();
  };

  // if reloaded on route change
  if (initialProducts.length) {
    resetFilters();
    resetSorting();
    changePagination(1);
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
    categoryId
  };
};
