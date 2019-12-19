import { computed, ref, Ref, watch } from "@vue/composition-api";
import { useCms } from "@shopware-pwa/composables";
import { convertSearchCriteria } from "@shopware-pwa/shopware-6-client";
import { getStore } from "../..";

import {
  getCategoryAvailableFilters,
  UiCategoryFilter
} from "@shopware-pwa/helpers";
import { SearchFilterType } from "packages/shopware-6-client/src/interfaces/search/SearchFilter";

export const useCategoryFilters = (): any => {
  const { page, search, error } = useCms();
  
  const selectedFilters: Ref<any[]> = ref([])
  const selectFilter = (filter: any) => selectedFilters.value.push(filter)
  //const getSelectedFilters = computed(() => selectedFilters.value)

  interface ShopwareFilter {
    name: string,
    option: {
      value: string
    }
  }

  const convertFiltersToParams = (filters: ShopwareFilter[]) => {
    const firstFiltersToTest = filters.shift() // should iterate whole collection and combine multifilters object.
    if (!firstFiltersToTest) {
      return {}
    }
    return convertSearchCriteria({
      filters: [
        {
          type: SearchFilterType.EQUALS,
          value: firstFiltersToTest.option.value,
          field: firstFiltersToTest.name
        }
      ]
    })
  }

    watch(() => selectedFilters.value, async (value, preValue) => { 

      console.warn('WARN: ', value, preValue)
      if (selectedFilters.value.length) {
        console.warn('VALUE', selectedFilters.value)
        await search('navigation/'+page.value.resourceIdentifier, convertFiltersToParams(selectedFilters.value))
        console.warn('PAGE', page.value)
        console.warn('ERRIR', error.value)
      }
      
    })




  const activeFilters = computed(() => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }

    return page.value.listingConfiguration.activeFilters;
  });

  const availableFilters = computed((): UiCategoryFilter[] | any => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }

    return getCategoryAvailableFilters({
      filters: page.value.listingConfiguration.availableFilters
    });
  });

  return {
    availableFilters,
    activeFilters,
    selectFilter,
    selectedFilters
  
  };
};
