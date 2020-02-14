import {
  LtRangeFilter,
  GtRangeFilter,
  LteRangeFilter,
  GteRangeFilter,
  LtGtRangeFilter,
  LtGteRangeFilter,
  LteGtRangeFilter,
  LteGteRangeFilter
} from "./RangeFilters";

export enum SearchFilterType {
  EQUALS = "equals",
  CONTAINS = "contains",
  EQUALS_ANY = "equalsAny",
  NOT = "not",
  MULTI = "multi",
  RANGE = "range"
}

/**
 * @alpha
 */
export interface SearchFilter {
  type: SearchFilterType;
}

/**
 * @alpha
 */
export interface EqualsFilter extends SearchFilter {
  value: string | null;
  field: string;
}

/**
 * @alpha
 */
export interface EqualsAnyFilter extends SearchFilter {
  value: string[];
  field: string;
}

/**
 * @alpha
 */
export interface ContainsFilter extends SearchFilter {
  value: string[];
  field: string;
}

/**
 * @alpha
 */
export interface RangeFilter extends SearchFilter {
  field: string;
  parameters:
    | LtRangeFilter
    | GtRangeFilter
    | LteRangeFilter
    | GteRangeFilter
    | LtGtRangeFilter
    | LtGteRangeFilter
    | LteGtRangeFilter
    | LteGteRangeFilter;
}

/**
 * @alpha
 */
export interface MultiFilter extends SearchFilter {
  operator: string;
  queries: Array<
    EqualsAnyFilter | RangeFilter | ContainsFilter | EqualsFilter | MultiFilter
  >;
}

/**
 * @alpha
 */
export interface NotFilter {
  type: SearchFilterType.NOT;
  queries: Array<
    EqualsAnyFilter | RangeFilter | ContainsFilter | EqualsFilter | MultiFilter
  >;
}
