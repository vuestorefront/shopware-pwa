import { SalutationTranslation } from "./SalutationTranslation";

/**
 * @alpha
 */
export interface Salutation {
  salutationKey: string;
  id: string;
  displayName: string | null;
  letterName: string | null;
  createdAt: string;
  translations: SalutationTranslation[] | null;
  translated: object;
  updatedAt: string | null;
  extenstions: object;
}
