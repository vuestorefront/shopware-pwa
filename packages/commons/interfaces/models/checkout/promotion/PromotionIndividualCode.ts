import { Promotion } from "./Promotion";

/**
 * @public
 */
export interface PromotionIndividualCode {
  promotionId: string;
  code: string;
  promotion: Promotion | null;
  payload: string[] | null;
}
