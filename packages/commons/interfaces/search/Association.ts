import { SearchFilter } from "./SearchFilter";

/**
 * @beta
 * @deprecated use ShopwareAssociation interface
 */
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

/**
 * @alpha
 */
export interface ShopwareAssociation {
  [name: string]: {
    associations?: ShopwareAssociation;
  };
}
