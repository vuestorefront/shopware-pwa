export interface LtRangeFilter {
  lt: string | number;
}

/**
 * @alpha
 */
export interface GtRangeFilter {
  gt: string | number;
}

/**
 * @alpha
 */
export interface LteRangeFilter {
  lte: string | number;
}

/**
 * @alpha
 */
export interface GteRangeFilter {
  gte: string | number;
}

/**
 * @alpha
 */
export interface LtGtRangeFilter {
  lt: string | number;
  gt: string | number;
}

/**
 * @alpha
 */
export interface LtGteRangeFilter {
  lt: string | number;
  gte: string | number;
}

/**
 * @alpha
 */
export interface LteGtRangeFilter {
  lte: string | number;
  gt: string | number;
}

/**
 * @alpha
 */
export interface LteGteRangeFilter {
  lte: string | number;
  gte: string | number;
}
