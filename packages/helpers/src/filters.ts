import {
  SearchFilterType,
  MultiFilter,
  EqualsAnyFilter
} from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchFilter";  

export const getFilterSearchCriteria = (selectedFilters:any) : MultiFilter[] => {
    const multiFilter: MultiFilter = {
      type: SearchFilterType.MULTI,
      operator: "AND",
      queries: []
    }
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
        } as EqualsAnyFilter)
      } else {
        chosenPropertyIds.push(...selectedFilters[filterName])
      }
    }

    if (chosenPropertyIds.length) {
      multiFilter.queries.push({
        type: SearchFilterType.EQUALS_ANY,
        field: "propertyIds",
        value: [...chosenPropertyIds]
      } as EqualsAnyFilter)
    }

    return [multiFilter]
  }