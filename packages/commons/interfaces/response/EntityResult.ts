/**
 * @beta
 */
export interface EntityResult<ENTITY, ENTITY_TYPE> {
  entity: ENTITY;
  total: number;
  aggregations: any[];
  page: number;
  limit: null | number;
  elements: ENTITY_TYPE;
  apiAlias: string;
}
