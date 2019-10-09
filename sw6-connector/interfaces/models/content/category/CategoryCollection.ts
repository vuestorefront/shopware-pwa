import { Category } from './Category'

export interface CategoryCollection {
    [index:number]: Category;
    aggregations: [];
}