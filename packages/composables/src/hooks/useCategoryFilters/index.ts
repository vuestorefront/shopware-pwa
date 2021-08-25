import { computed } from "vue-demi";
import {
  useCms,
  getApplicationContext,
  ApplicationVueContext,
} from "@shopware-pwa/composables";
import {
  getCategoryAvailableFilters,
  getCategoryAvailableSorting,
  UiCategoryFilter,
  UiCategorySorting,
  SwSorting,
} from "@shopware-pwa/helpers";
import { deprecationWarning } from "@shopware-pwa/commons";

/**
 * @beta
 * @deprecated please see useListing instead
 */
export function useCategoryFilters(rootContext: ApplicationVueContext): any {
  deprecationWarning({
    methodName: "useCategoryFilters",
    newMethodName: "useListing",
    packageName: "composables",
  });
  getApplicationContext(rootContext, "useCategoryFilters");
  const { page } = useCms();

  const activeFilters = computed(() => {
    if (!page || !page.value || !(page.value as any).listingConfiguration) {
      return [];
    }

    return (page.value as any).listingConfiguration.activeFilters;
  });

  const availableFilters = computed((): UiCategoryFilter[] | any => {
    if (!page || !page.value || !(page.value as any).listingConfiguration) {
      return [];
    }

    return getCategoryAvailableFilters({
      filters: (page.value as any).listingConfiguration.availableFilters,
    });
  });

  const availableSorting = computed((): UiCategorySorting[] | any => {
    if (!page || !page.value || !(page.value as any).listingConfiguration) {
      return [];
    }

    return getCategoryAvailableSorting({
      sorting: (page.value as any).listingConfiguration.availableSortings,
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
    activeSorting,
  };
}
