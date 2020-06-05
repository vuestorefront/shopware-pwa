import {
  SearchFilterType,
  MultiFilter,
  EqualsAnyFilter,
  EqualsFilter,
  RangeFilter,
  ContainsFilter,
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
  value: string[],
  field: string = "propertyIds"
): EqualsAnyFilter => ({
  type: SearchFilterType.EQUALS_ANY,
  field,
  value,
});

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
    // if (!selectedFilters[filterName].length && typeof selectedFilters[filterName] !== "boolean" && !selectedFilters[filterName].hasOwnProperty('gte')) {
    //   continue;
    // }
    filters.push(extractFilter(filterName, selectedFilters[filterName]));
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
    desc: selectedSorting.order === "desc",
  };
};

/**
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/841
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/840
 *
 * @beta
 */
export const toggleFilter = (
  filter: EqualsFilter | EqualsAnyFilter | ContainsFilter, // TODO: handle range filter case as well
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
