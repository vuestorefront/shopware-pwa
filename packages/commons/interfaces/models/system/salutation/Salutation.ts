import { SalutationTranslation } from "./SalutationTranslation";

/**
 * @public
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
  extensions: object;
}
