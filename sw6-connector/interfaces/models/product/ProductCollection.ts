import { ProductEntity } from "./ProductEntity";
export interface ProductCollection {
    [index: number]: ProductEntity;
}
