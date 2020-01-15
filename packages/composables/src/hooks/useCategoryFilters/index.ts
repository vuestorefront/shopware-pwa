import { computed } from "@vue/composition-api";
import { useCms } from "@shopware-pwa/composables";
import {
  getCategoryAvailableFilters,
  getCategoryAvailableSorting,
  UiCategoryFilter,
  UiCategorySorting,
  SwSorting
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

  const availableSorting = computed((): UiCategorySorting[] | any => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }

    return getCategoryAvailableSorting({
      sorting: page.value.listingConfiguration.availableSortings
    });
  });

  const activeSorting = computed(
    (): SwSorting =>
      availableSorting.value.find((sorting: SwSorting) => sorting.active)
  );

  return {
    availableFilters,
    activeFilters,
    availableSorting,
    activeSorting
  };
};
