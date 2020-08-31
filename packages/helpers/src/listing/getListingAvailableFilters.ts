import { UiCategoryFilter, UiCategoryFilterType } from "../ui-interfaces";
import {
  Aggregations,
  AggregationFilterEntityOption,
} from "@shopware-pwa/commons/interfaces/search/Aggregations";

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
    label: filterData.translated.name,
    value: filterData.id,
    // false when there's no color property is fine, UI accepts it
    color: filterData.colorHexCode,
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
  for (const [aggregationName, aggregation] of Object.entries(aggregations)) {
    if (
      aggregationName === "manufacturer" &&
      Array.isArray(aggregation.entities)
    ) {
      transformedFilters.push(
        extractEntityTypeFilter(aggregationName, aggregation.entities)
      );
    }

    if (aggregationName === "properties") {
      for (const filter of aggregation.entities) {
        transformedFilters.push(
          extractEntityTypeFilter(filter.name, filter.options)
        );
      }
    }
  }

  return transformedFilters;
}
