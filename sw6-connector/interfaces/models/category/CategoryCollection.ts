import { CategoryEntity } from './CategoryEntity'

export interface CategoryCollection {
    [index:number]: CategoryEntity;
    aggregations: [];
}