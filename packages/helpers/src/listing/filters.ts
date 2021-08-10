import {
  SearchFilterType,
  MultiFilter,
  EqualsAnyFilter,
  EqualsFilter,
  RangeFilter,
  MaxFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ListingFilter } from "./getListingFilters";

const createMultiFilter = (operator: string, queries: any[]): MultiFilter => ({
  type: SearchFilterType.MULTI,
  operator: operator,
  queries: queries,
});

const createRangeFilter = (filterData: any, field: string): RangeFilter => ({
  type: SearchFilterType.RANGE,
  field,
  parameters: filterData,
});

const createMaxFilter = (filterData: any, field: string): MaxFilter => ({
  type: SearchFilterType.MAX,
  field,
  max: filterData.max,
});

const createEqualsFilter = (value: string, field: string): EqualsFilter => ({
  type: SearchFilterType.EQUALS,
  field,
  value,
});

const createEqualsAnyFilter = (
  values: string[],
  field: string = "propertyIds"
): EqualsAnyFilter => {
  if (!Array.isArray(values)) {
    throw "EqualsAnyFilter value is not an array";
  }
  const valuesFiltered = values.filter((value) => !!value);
  if (!valuesFiltered.length) {
    throw "EqualsAnyFilter has no values provided";
  }

  return {
    type: SearchFilterType.EQUALS_ANY,
    field,
    value: valuesFiltered,
  };
};

/**
 * Get the right filter format depending on filter's code
 */
const extractFilter = (
  filterCode: string,
  filterData: any
): RangeFilter | EqualsFilter | EqualsAnyFilter | MultiFilter | MaxFilter => {
  let extractedFilter = null;
  switch (filterCode) {
    case "price":
      extractedFilter = createRangeFilter(filterData, filterCode);
      break;
    case "shipping-free":
      extractedFilter = createMaxFilter(filterData, filterCode);
      break;
    case "rating":
      extractedFilter = createMaxFilter(filterData, filterCode);
      break;
    case "categoryTree":
      extractedFilter = createEqualsFilter(
        filterData.shift(),
        "product.categoriesRo.id"
      );
      break;
    case "manufacturer":
      extractedFilter = createEqualsAnyFilter(filterData, "manufacturerId");
      break;
    default:
      const subFilters = [];
      subFilters.push(createEqualsAnyFilter(filterData));
      // passed propertyIds could be also interpreted as optionIds
      subFilters.push(createEqualsAnyFilter(filterData, "optionIds"));
      extractedFilter = createMultiFilter("OR", subFilters);
  }

  return extractedFilter;
};

/**
 * @alpha
 */
export const getFilterSearchCriteria = (selectedFilters: any): any[] => {
  const filters: any[] = [];

  if (!selectedFilters) {
    return filters;
  }

  for (const filterName of Object.keys(selectedFilters)) {
    try {
      filters.push(extractFilter(filterName, selectedFilters[filterName]));
    } catch (error) {
      console.warn("helpers:getFilterSearchCriteria:extractFilter", error);
    }
  }

  return filters;
};

/**
 * @alpha
 */
export interface SwSorting {
  name: string;
  active: boolean;
  field: string;
  order: string;
  translated: any;
}

/**
 * @alpha
 */
export const getSortingSearchCriteria = (selectedSorting: SwSorting): Sort => {
  if (!selectedSorting) {
    return {} as Sort;
  }

  return {
    field: selectedSorting.field,
    name: selectedSorting.translated?.name || selectedSorting.name,
    desc: selectedSorting.order === "desc",
  };
};

/**
 * It creates new selected filters object based on the filter existence
 *
 * @beta
 */
export function toggleSearchFilter(currentFilters: any, filter: ListingFilter) {
  console.error("current filter", currentFilters);
  console.error("filter to toggle", filter);
  let resultFilterValue = undefined;
  if (["range", "max"].includes(filter.type || "")) {
    if (filter.value) resultFilterValue = filter.value;
  } else {
    let filterCopy = currentFilters[filter.code] || [];
    if (!Array.isArray(filterCopy)) filterCopy = [filterCopy];
    const index = filterCopy.findIndex(
      (element: unknown) => element === filter.value
    );
    if (index < 0) {
      filterCopy.push(filter.value);
    } else {
      filterCopy.splice(index, 1);
    }
    if (filterCopy.length) resultFilterValue = filterCopy;
  }
  return Object.assign(
    {},
    {
      ...currentFilters,
      [filter.code]: resultFilterValue,
    }
  );
}
