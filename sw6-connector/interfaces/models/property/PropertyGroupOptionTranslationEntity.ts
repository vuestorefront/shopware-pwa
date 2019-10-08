import { PropertyGroupOptionEntity } from "./PropertyGroupOptionEntity";
export interface PropertyGroupOptionTranslationEntity {
    propertyGroupOptionId: string;
    name: string | null;
    position: number | null;
    propertyGroupOption: PropertyGroupOptionEntity | null;
    customFields: [] | null;
}
