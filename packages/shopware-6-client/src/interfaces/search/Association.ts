import { SearchFilter } from "./SearchFilter";

/**
 * @param name for instance `product.media.url` or something nested
 * @param filters nested filter on association
 */
export interface Association {
  name: string;
  filters?: SearchFilter[];
}
