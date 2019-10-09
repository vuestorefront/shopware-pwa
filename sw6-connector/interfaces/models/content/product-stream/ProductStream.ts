import { iCustomField } from "../../Common";
import { ProductStreamTranslationCollection } from "./ProductStreamTranslationCollection";
import { ProductStreamFilterCollection } from "./ProductStreamFilterCollection";
export interface ProductStream {
    name: string;
    description: string | null;
    apiFilter: [] | null;
    filters: ProductStreamFilterCollection | null;
    invalid: boolean;
    translations: ProductStreamTranslationCollection | null;
    customFields: iCustomField | null;
}
