import {
  SearchFilterType,
  MultiFilter,
  EqualsAnyFilter,
  EqualsFilter,
  RangeFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

const createMultiFilter = (operator: string, queries: any[]): MultiFilter => ({
  type: SearchFilterType.MULTI,
  operator: operator,
  queries: queries,
});

const createRangeFilter = (filterData: any, field: string): RangeFilter => ({
  type: SearchFilterType.RANGE,
  field: field,
  parameters: filterData,
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
): RangeFilter | EqualsFilter | EqualsAnyFilter | MultiFilter => {
  let extractedFilter = null;
  switch (filterCode) {
    case "price":
      extractedFilter = createRangeFilter(filterData, filterCode);
      break;
    case "shipping-free":
      extractedFilter = createEqualsFilter(filterData, filterCode);
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
      console.error("helpers:getFilterSearchCriteria:extractFilter", error);
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
    name: selectedSorting.name,
    desc: selectedSorting.order === "desc",
  };
};

/**
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/841
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/840
 * @deprecated - a general solution for toggling the filters will be replaced by dedicated ones.
 * @beta
 */
export const toggleFilter = (
  filter: EqualsFilter | EqualsAnyFilter, // TODO: handle range filter case as well
  selectedCriteria: any,
  forceSave: boolean = false
): void => {
  if (!filter) {
    return;
  }

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
      [filter.field]: [...new Set(selected)],
    });
  } else {
    selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
      [filter.field]: [filter.value],
    });
  }
};
