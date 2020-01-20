import { Promotion } from "./Promotion";

/**
 * @alpha
 */
export interface PromotionIndividualCode {
  promotionId: string;
  code: string;
  promotion: Promotion | null;
  payload: string[] | null;
}
