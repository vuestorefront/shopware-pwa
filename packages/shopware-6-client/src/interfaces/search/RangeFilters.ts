export interface LtRangeFilter {
  lt: string | number;
}

export interface GtRangeFilter {
  gt: string | number;
}

export interface LteRangeFilter {
  lte: string | number;
}

export interface GteRangeFilter {
  gte: string | number;
}

export interface LtGtRangeFilter {
  lt: string | number;
  gt: string | number;
}

export interface LtGteRangeFilter {
  lt: string | number;
  gte: string | number;
}

export interface LteGtRangeFilter {
  lte: string | number;
  gt: string | number;
}

export interface LteGteRangeFilter {
  lte: string | number;
  gte: string | number;
}
