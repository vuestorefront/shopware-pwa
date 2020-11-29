import { UiCategoryFilter, UiCategoryFilterType } from "../ui-interfaces";
import {
  Aggregations,
  AggregationFilterEntityOption,
} from "@shopware-pwa/commons/interfaces/search/Aggregations";

const getFilterType = (aggregation: any) => {
  if (aggregation.entities && Array.isArray(aggregation.entities)) {
    return UiCategoryFilterType.entity;
  }

  if (aggregation.hasOwnProperty("max") && aggregation.hasOwnProperty("min")) {
    return UiCategoryFilterType.range;
  }

  if (aggregation.hasOwnProperty("max") && !aggregation.min) {
    return UiCategoryFilterType.max;
  }

  throw new Error("Unrecognized type");
};

/**
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/841
 * TODO: https://github.com/DivanteLtd/shopware-pwa/issues/840
 */

const extractEntityTypeFilter = (
  name: string,
  options: AggregationFilterEntityOption[]
) => ({
  name,
  type: UiCategoryFilterType.entity,
  options: options.map((filterData: AggregationFilterEntityOption) => ({
    label: filterData.translated?.name || filterData.name,
    value: filterData.id,
    // false when there's no color property is fine, UI accepts it
    color: filterData.colorHexCode,
    ...filterData, // pass additional info that may be useful
  })),
});

/**
 * @beta
 */
export function getListingAvailableFilters(
  aggregations: Aggregations | undefined | null
): UiCategoryFilter[] {
  if (!aggregations) {
    return [];
  }
  const transformedFilters: UiCategoryFilter[] = [];
  // first level aggregations
  for (const [aggregationName, aggregation] of Object.entries(aggregations)) {
    try {
      const filterType = getFilterType(aggregation);
      // entity type
      if (filterType === UiCategoryFilterType.entity) {
        // some of the aggregations are grouped as a properties and have different structure
        if (aggregationName === "properties") {
          for (const property of aggregation.entities) {
            transformedFilters.push(
              extractEntityTypeFilter(
                property.translated?.name || property.name,
                property.options
              )
            );
          }
        } else {
          transformedFilters.push(
            extractEntityTypeFilter(aggregationName, aggregation.entities)
          );
        }
      } else {
        // other types
        transformedFilters.push({
          name: aggregationName,
          type: filterType,
          ...aggregation,
        });
      }
    } catch (error) {
      console.warn(
        `[helpers][getListingAvailableFilters][getFilterType]: ${error} | ${aggregationName}`
      );
    }
  }

  return transformedFilters;
}
