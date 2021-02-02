import * as innerClient from "./index.inner";
export * from "./index.inner";

import { IDBPDatabase, openDB } from "idb";

import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { defaultInstance, ShopwareApiInstance } from "./apiService";

import { handleRequest } from "./offline/criteria/RequestCriteriaHandler";

/* Should be extracted into a separate module, expects products to be present in the local store already */
export async function searchProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  if (typeof window !== "undefined" && window.indexedDB) {
    let db: IDBPDatabase<Product> = await openDB("shopware_pwa_data", 1);

    let readProducts = db.transaction("product");

    let elements = await readProducts.store.getAll();

    /* This is where the magic happens */
    let productResult: ProductListingResult = await handleRequest(
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

/**
 * Search for suggested products based on criteria.
 * From: Shopware 6.4
 *
 * @beta
 */
export async function searchSuggestedProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  if (typeof window !== "undefined" && window.indexedDB) {
    let db: IDBPDatabase<Product> = await openDB("shopware_pwa_data", 1);

    let readProducts = db.transaction("product");

    let elements = await readProducts.store.getAll();

    /* This is where the magic happens */
    let productResult: ProductListingResult = await handleRequest(
      elements,
      criteria
    );

    if (productResult.total > 0) {
      return productResult;
    }
  }

  /* Fall back to API */
  const resp = await innerClient.searchSuggestedProducts(
    criteria,
    contextInstance
  );

  return resp;
}
