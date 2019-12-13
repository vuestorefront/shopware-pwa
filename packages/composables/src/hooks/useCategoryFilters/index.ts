import { computed } from "@vue/composition-api";
import { useCms } from "@shopware-pwa/composables";
import {
  getCategoryAvailableFilters,
  UiCategoryFilter
} from "@shopware-pwa/helpers";

export const useCategoryFilters = (): any => {
  const { page } = useCms();

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
    activeFilters
  };
};
