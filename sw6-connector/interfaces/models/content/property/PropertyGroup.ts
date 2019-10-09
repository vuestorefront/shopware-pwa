import { PropertyGroupOptionCollection } from "./PropertyGroupOptionCollection";
import { PropertyGroupOptionTranslationCollection } from "./PropertyGroupOptionTranslationCollection";
export interface PropertyGroup {
    name: string | null;
    displayType: string;
    sortingType: string;
    description: string | null;
    options: PropertyGroupOptionCollection | null;
    translations: PropertyGroupOptionTranslationCollection | null;
    customFields: [] | null;
}
