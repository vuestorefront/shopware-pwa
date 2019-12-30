import { ref, Ref, computed, reactive } from "@vue/composition-api";
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
  EqualsAnyFilter,
  ContainsFilter
} from "packages/shopware-6-client/src/interfaces/search/SearchFilter";
import { exportUrlQuery, getFilterSearchCriteria } from "@shopware-pwa/helpers";
import { useCms } from "./useCms";

interface UseProductListing {
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

const sharedListing = Vue.observable({
  products: []
} as any)

const selectedCriteria = Vue.observable({
  pagination: null,
  propertyIds: [],
  filters: {}
} as any);


export const useProductListing = (
  initialProducts: Product[] = []
  ): UseProductListing => {
  const { page } = useCms();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const categoryId: Ref<string> = ref(page.value.resourceIdentifier)
  const localListing = reactive(sharedListing)
  const localCriteria = reactive(selectedCriteria)
  const localPagination = reactive(sharedPagination)

  sharedListing.products = initialProducts
 
  // increase test on init:
  test.value = test.value + 1;

  const resetFilters = async () => {
    selectedCriteria.filters = {}
    await search();
  }

  const toggleFilter = (
    filter: EqualsFilter | EqualsAnyFilter | ContainsFilter, // TODO: handle range filter case as well
    forceSave: boolean = false
  ): void => {
    console.warn('selected', selectedCriteria.filters[filter.field])
    if (!!selectedCriteria.filters[filter.field]) {
      let selected = selectedCriteria.filters[filter.field]
      if (!selected.find((optionId: string) => optionId === filter.value) || forceSave) {
        selected.push(filter.value)
      } else {
        selected = selected.filter((optionId:string) => optionId !== filter.value)
      }

      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [ ... new Set(selected)]
      });
    } else {
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [filter.value]
      });
    }
  };

  const search = async (): Promise<void> => {
    sharedListing.products = []
    loading.value = true
    toggleFilter({ // append selected filters with currentCategory; should be taken from usePage
      field: "categoryTree",
      type: SearchFilterType.EQUALS_ANY,
      value: categoryId.value
    }, true)

    const searchCriteria: SearchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria(selectedCriteria.filters)
    };
    const search = exportUrlQuery(searchCriteria);
    history.replaceState({}, null as any, location.pathname + "?" + search);
    const result = await getProducts(searchCriteria);
    sharedPagination.total = result.total;
    sharedListing.products = [ ...result.data];
    loading.value = false
  };

  const changePagination = async (page: number) => {
    sharedPagination.currentPage = page;
    selectedCriteria.pagination = {
      limit: sharedPagination.perPage,
      page
    }
    await search()
  }

  if (sharedListing.products.length) {
    resetFilters()
  }

  const pagination: any = computed(() => sharedPagination);
  const products = computed(() => localListing.products);
  const productsTotal = computed(() => localPagination.total);
  const selectedFilters = computed(() => localCriteria.filters);

  return {
    search,
    pagination,
    products,
    productsTotal,
    loading,
    error,
    toggleFilter,
    changePagination,
    selectedFilters,
    resetFilters
  };
};
