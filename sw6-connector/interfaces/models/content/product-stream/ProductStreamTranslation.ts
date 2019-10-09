import { iCustomField } from "../../Common";
import { ProductStream } from "./ProductStream";
export interface ProductStreamTranslation {
    productStreamId: string;
    name: string | null;
    description: string | null;
    productStream: ProductStream | null;
    customFields: iCustomField;
}
