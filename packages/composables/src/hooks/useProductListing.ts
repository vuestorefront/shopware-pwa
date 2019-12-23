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
  ContainsFilter,
  MultiFilter
} from "packages/shopware-6-client/src/interfaces/search/SearchFilter";
import { exportUrlQuery } from "@shopware-pwa/helpers";
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
  filters: {}
} as any);

// const searchCriteria = Vue.observable({
//   pagination: sharedPagination
// } as SearchCriteria);

export const useProductListing = (
  initialProducts: Product[] = []
  ): UseProductListing => {
  const { page } = useCms();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const categoryId: Ref<string> = ref(page.value.resourceIdentifier)
  sharedListing.products = initialProducts
  // increase test on init:
  test.value = test.value + 1;

  // temporary helper
  const getFilterSearchCriteria = () : MultiFilter[] => {
    const multiFilter: MultiFilter = {
      type: SearchFilterType.MULTI,
      operator: "AND", // @patzik have a look on it ;)
      queries: []
    }
    const selectedFilters = selectedCriteria.filters
    const chosenPropertyIds = []
    for(const filterName of Object.keys(selectedFilters)) {

      if (!selectedFilters[filterName].length) {
        continue;
      }

      if (filterName === "categoryTree") {
        multiFilter.queries.push({
          type: SearchFilterType.EQUALS_ANY,
          field: filterName,
          value: [...selectedFilters[filterName]]
        })
      } else {
        chosenPropertyIds.push(...selectedFilters[filterName])
      }
    }

    if (chosenPropertyIds.length) {
      multiFilter.queries.push({
        type: SearchFilterType.EQUALS_ANY,
        field: "propertyIds",
        value: [...chosenPropertyIds]
      })
    }

    return [multiFilter]
  }

  const toggleFilter = (
    filter: EqualsFilter | EqualsAnyFilter | ContainsFilter, // TODO: handle range filter case,
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

    console.warn('TOGGLE FILTER RESULT: ', selectedCriteria)
  };

  const search = async (): Promise<void> => {

    toggleFilter({ // append selected filters with currentCategory; should be taken from usePage
      field: "categoryTree",
      type: SearchFilterType.EQUALS_ANY,
      value: categoryId.value
    }, true)

    const searchCriteria: SearchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria()
    };
    console.warn('SEARCH CRITERIA', getFilterSearchCriteria())
    const search = exportUrlQuery(searchCriteria);
    history.replaceState({}, null as any, location.pathname + "?" + search);
    console.error("REPLACING WITH SEARCH: " + search);
    console.error("SQ: ", searchCriteria);
    const result = await getProducts(searchCriteria);
    sharedPagination.total = result.total;
    sharedListing.products = [];
    sharedListing.products = result.data;
    console.error('PRODUCTS replacement: ', result.data)
  };

  const changePagination = async (page: number) => {
    sharedPagination.currentPage = page;
    selectedCriteria.pagination = {
      limit: sharedPagination.perPage,
      page
    }
    await search()
  }

  const teest = computed(() => test.value);
  const pagination: any = computed(() => sharedPagination);
  const products = computed(() => sharedListing.products);

  return {
    teest,
    search,
    pagination,
    products,
    loading,
    error,
    toggleFilter,
    changePagination
  };
};
