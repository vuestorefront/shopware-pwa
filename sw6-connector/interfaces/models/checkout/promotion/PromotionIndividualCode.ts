import { Promotion } from "./Promotion";
export interface PromotionIndividualCode {
    promotionId: string;
    code: string;
    promotion: Promotion | null;
    payload: [] | null;
}
