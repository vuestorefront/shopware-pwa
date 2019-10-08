import { PromotionEntity } from "./PromotionEntity";
export interface PromotionIndividualCodeEntity {
    promotionId: string;
    code: string;
    promotion: PromotionEntity | null;
    payload: [] | null;
}
