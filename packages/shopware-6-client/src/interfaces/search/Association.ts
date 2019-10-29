import { SearchFilter } from "./SearchFilter";

export interface Association {
  /**
   * for instance `product.media.url` or something nested
   */
  name: string;
  /**
   * nested filter on association
   */
  filters?: SearchFilter[];
  associations?: Association[];
}
