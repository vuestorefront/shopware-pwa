import { UnitTranslationCollection } from "./UnitTranslationCollection";
export interface UnitEntity {
    shortCode: string | null;
    name: string | null;
    translations: UnitTranslationCollection | null;
    customFields: [] | null;
}
