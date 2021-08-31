import { Aggregations } from "@shopware-pwa/commons/interfaces/search/Aggregations";

/**
 * @public
 */
export interface ListingFilter {
  label: string;
  code: string;
  type?: "range" | "max";
  [key: string]: any;
}

const getFilter = (code: string, aggregation: any): ListingFilter => {
  return {
    label: aggregation.translated?.name || code,
    code,
    ...aggregation,
  };
};

/**
 * @beta
 */
export function getListingFilters(
  aggregations: Aggregations | undefined | null
): ListingFilter[] {
  if (!aggregations) {
    return [];
  }
  const transformedFilters: ListingFilter[] = [];
  for (const [aggregationName, aggregation] of Object.entries(aggregations)) {
    if (aggregationName === "properties" && aggregation.entities) {
      for (const property of aggregation.entities) {
        transformedFilters.push(getFilter(aggregationName, property));
      }
    } else if (!["properties", "options"].includes(aggregationName)) {
      transformedFilters.push(getFilter(aggregationName, aggregation));
    }
  }

  return transformedFilters;
}
