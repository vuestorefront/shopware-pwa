/**
 * @param name name of the aggregation
 * @param type count , avg, max, min, stats, sum, filter, entity, terms, histogram
 */
export interface Aggregation {
  name: string;
  type: string;
  field: string;
}
