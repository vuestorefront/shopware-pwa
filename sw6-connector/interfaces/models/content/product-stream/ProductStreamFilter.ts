import { ProductStream } from "./ProductStream";
import { ProductStreamFilterCollection } from "./ProductStreamFilterCollection";
export interface ProductStreamFilter {
    type: string;
    field: string | null;
    operator: string | null;
    value: string | null;
    productStreamId: string;
    parentId: string | null;
    productStream: ProductStream | null;
    queries: ProductStreamFilterCollection | null;
    parent: ProductStreamFilter | null;
    position: number;
    parameters: [] | null;
    customFields: [] | null;
}
