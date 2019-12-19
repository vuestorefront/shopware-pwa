import { ref, Ref, computed } from "@vue/composition-api";
import {
  Product,
  getProducts,
  SearchCriteria
} from "@shopware-pwa/shopware-6-client";
import Vue from "vue";
// test of lib, uninstall it if not used
import queryString from "query-string";
import { EqualsFilter, SearchFilterType } from "packages/shopware-6-client/src/interfaces/search/SearchFilter";

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

  // increase test on init:
  test.value = test.value + 1;


  const search = async (page: number): Promise<void> => {
    const searchCriteria: SearchCriteria = {
      pagination: {
        limit: sharedPagination.perPage,
        page
      },
      filters: [
        {
          field: 'categoryTree',
          type: SearchFilterType.EQUALS_ANY,
          value: '3f637f17cd9f4891a2d7625d19fb37c9'
        } as EqualsFilter
      ]
    };
    const query:any = {}
    const sc:any = searchCriteria
    Object.keys(searchCriteria).forEach((key:string) => {
      query[key] = JSON.stringify(sc[key])
    })
    const search = queryString.stringify(query);
    history.replaceState({}, null as any, location.pathname + '?' + search);
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
    products,
    error,
    loading,
    teest,
    search,
    pagination
  };
};
