import {
  getCategoryProducts,
  searchProducts,
} from "@shopware-pwa/shopware-6-client";

import {
  useCms,
  ApplicationVueContext,
  getApplicationContext,
  useDefaults,
  createListingComposable,
  IUseListing,
} from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @beta
 */
export type listingKey = "productSearchListing" | "categoryListing";

/**
 * @beta
 */
export function useListing(
  rootContext: ApplicationVueContext,
  listingKey: listingKey = "categoryListing"
): IUseListing<Product> {
  const COMPOSABLE_NAME = "useListing";
  const contextName = COMPOSABLE_NAME;

  const { getDefaults } = useDefaults(rootContext, contextName);
  const { apiInstance } = getApplicationContext({ contextName });

  let searchMethod;
  if (listingKey === "productSearchListing") {
    searchMethod = async (searchCriteria: Partial<ShopwareSearchParams>) => {
      return searchProducts(searchCriteria, apiInstance);
    };
  } else {
    const { resourceIdentifier } = useCms();
    searchMethod = async (searchCriteria: Partial<ShopwareSearchParams>) => {
      if (!resourceIdentifier.value) {
        throw new Error(
          "[useListing][search] Search category id does not exist."
        );
      }
      return getCategoryProducts(
        resourceIdentifier.value,
        searchCriteria,
        apiInstance
      );
    };
  }

  return createListingComposable<Product>({
    rootContext,
    listingKey,
    searchMethod,
    searchDefaults: getDefaults(),
  });
}
