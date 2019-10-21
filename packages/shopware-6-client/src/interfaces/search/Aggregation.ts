export interface Aggregation {
  /**
   * name of the aggregation
   */
  name: string;
  /**
   * types: count , avg, max, min, stats, sum, filter, entity, terms, histogram
   */
  type: string;
  field: string;
}
