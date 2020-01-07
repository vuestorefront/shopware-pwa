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

export interface SearchFilter {
  type: SearchFilterType;
}

export interface EqualsFilter extends SearchFilter {
  value: string;
  field: string;
}

export interface EqualsAnyFilter extends SearchFilter {
  value: string[];
  field: string;
}

export interface ContainsFilter extends SearchFilter {
  value: string[];
  field: string;
}

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

export interface MultiFilter extends SearchFilter {
  operator: string;
  queries: Array<
    EqualsAnyFilter | RangeFilter | ContainsFilter | EqualsFilter | MultiFilter
  >;
}
