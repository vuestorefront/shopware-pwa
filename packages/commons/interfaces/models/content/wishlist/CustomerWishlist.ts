import { EntityResult } from "../../../response/EntityResult";
import { Product } from "../product/Product";

export interface CustomerWishlist {
  customerId: string;
  _uniqueIdentifier: string;
  versionId: null | string;
  translated: string[];
  createdAt: string;
  updatedAt: null | string;
  extensions: unknown;
  id: string;
  customFields: null | unknown;
  apiAlias: string;
}

export interface CustomerWishlistResponse {
  apiAlias: string;
  wishlist: CustomerWishlist;
  products: EntityResult<Product, "product">;
}
