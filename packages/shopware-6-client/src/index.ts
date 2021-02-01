import * as innerClient from "./index.inner";
export * from "./index.inner";

import { openDB } from "idb";

import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { defaultInstance, ShopwareApiInstance } from "./apiService";

import { parseCriteria } from "./offline/criteria/queryParser";

/* Should be extracted into a separate module, expects products to be present in the local store already */
export async function searchProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  if (typeof window !== "undefined" && window.indexedDB) {
    let db = await openDB("shopware_pwa_data", 1);

    let readProducts = db.transaction("product");

    let elements = await readProducts.store.getAll();

    /* This is where the magic happens */
    let productResult: ProductListingResult = await parseCriteria(
      elements,
      criteria
    );

    if (productResult.total > 0) {
      return productResult;
    }
  }

  /* Fall back to API */
  const resp = await innerClient.searchProducts(criteria, contextInstance);

  /* End Offline Querying PoC */

  return resp;
}
