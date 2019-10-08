import { ICategoryEntity } from './ICategoryEntity'

export interface ICategoryCollection {
    [index:number]: ICategoryEntity;
    aggregations: [];
}