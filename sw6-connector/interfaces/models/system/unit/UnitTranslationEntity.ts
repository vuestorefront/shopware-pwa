import { UnitEntity } from "./UnitEntity";
export interface UnitTranslationEntity {
    unitId: string;
    shortCode: string | null;
    name: string | null;
    unit: UnitEntity | null;
    customFields: [] | null;
}
