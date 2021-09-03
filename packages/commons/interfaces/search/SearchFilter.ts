import {
  LtRangeFilter,
  GtRangeFilter,
  LteRangeFilter,
  GteRangeFilter,
  LtGtRangeFilter,
  LtGteRangeFilter,
  LteGtRangeFilter,
  LteGteRangeFilter,
} from "@shopware-pwa/commons/interfaces/search/RangeFilters";

/**
 * @beta
 */
export enum SearchFilterType {
  EQUALS = "equals",
  CONTAINS = "contains",
  EQUALS_ANY = "equalsAny",
  NOT = "not",
  MULTI = "multi",
  RANGE = "range",
  MAX = "max",
}

/**
 * @beta
 */
export interface SearchFilter {
  type: SearchFilterType;
}

/**
 * @beta
 */
export interface EqualsFilter extends SearchFilter {
  value: string | null;
  field: string;
}

/**
 * @beta
 */
export interface EqualsAnyFilter extends SearchFilter {
  value: string[];
  field: string;
}

/**
 * @beta
 */
export interface ContainsFilter extends SearchFilter {
  value: string[];
  field: string;
}

/**
 * @public
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
 * @beta
 */
export interface MaxFilter extends SearchFilter {
  field: string;
  max: number;
}

/**
 * @beta
 */
export interface MultiFilter extends SearchFilter {
  operator: string;
  queries: Array<
    EqualsAnyFilter | RangeFilter | ContainsFilter | EqualsFilter | MultiFilter
  >;
}

/**
 * @beta
 */
export interface NotFilter {
  type: SearchFilterType.NOT;
  queries: Array<
    EqualsAnyFilter | RangeFilter | ContainsFilter | EqualsFilter | MultiFilter
  >;
}
