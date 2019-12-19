import { ref, Ref, computed } from "@vue/composition-api";
import {
  Product,
  getProducts,
  SearchCriteria
} from "@shopware-pwa/shopware-6-client";
import Vue from "vue";
// test of lib, uninstall it if not used
import {
  EqualsFilter,
  SearchFilterType,
  RangeFilter,
  EqualsAnyFilter,
  ContainsFilter
} from "packages/shopware-6-client/src/interfaces/search/SearchFilter";
import { exportUrlQuery } from "@shopware-pwa/helpers";

interface UseProductListing {
  products: Ref<Product[]>;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

// shows how many usage of this composable has been fired
const test = Vue.observable({
  value: 0
} as any);

const sharedPagination = Vue.observable({
  currentPage: 1,
  perPage: 10,
  total: 100
} as any);

// const searchCriteria = Vue.observable({
//   pagination: sharedPagination
// } as SearchCriteria);

export const useProductListing = (
  initialProducts: Product[] = []
): UseProductListing => {
  const products: Ref<Product[]> = ref(initialProducts || []);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const selectedFilters: Ref<any> = ref({});

  // increase test on init:
  test.value = test.value + 1;

  const toggleFilter = (
    filter: EqualsFilter | RangeFilter | EqualsAnyFilter | ContainsFilter
  ): void => {
    if (selectedFilters.value[filter.field]) {
      selectedFilters.value[filter.field] = null;
    }
    selectedFilters.value[filter.field] = filter;
  };

  const search = async (page: any): Promise<void> => {
    const searchCriteria: SearchCriteria = {
      pagination: {
        limit: sharedPagination.perPage,
        page
      },
      filters: [
        {
          field: "categoryTree",
          type: SearchFilterType.EQUALS_ANY,
          value: "3f637f17cd9f4891a2d7625d19fb37c9"
        } as EqualsAnyFilter
      ]
    };
    const search = exportUrlQuery(searchCriteria);
    history.replaceState({}, null as any, location.pathname + "?" + search);
    console.error("REPLACING WITH SEARCH: " + search);
    console.error("SQ: ", searchCriteria);
    const result = await getProducts(searchCriteria);
    sharedPagination.total = result.total;
    sharedPagination.currentPage = page;
    products.value = result.data;
  };

  const teest = computed(() => test.value);
  const pagination: any = computed(() => sharedPagination);

  return {
    teest,
    search,
    pagination,
    products,
    loading,
    error
  };
};
