import {
  getCategoryProducts,
  searchProducts,
} from "@shopware-pwa/shopware-6-client";

import {
  useCms,
  getApplicationContext,
  useDefaults,
  createListingComposable,
} from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { IUseListing } from "../factories/createListingComposable";

/**
 * @beta
 */
export type ListingType = "productSearchListing" | "categoryListing";

/**
 * @beta
 */
export function useListing(params?: {
  listingType: ListingType;
}): IUseListing<Product> {
  const COMPOSABLE_NAME = "useListing";
  const contextName = COMPOSABLE_NAME;

  const listingType = params?.listingType || "categoryListing";

  const { getDefaults } = useDefaults({ defaultsKey: contextName });
  const { apiInstance } = getApplicationContext({ contextName });

  let searchMethod;
  if (listingType === "productSearchListing") {
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
    listingKey: listingType,
    searchMethod,
    searchDefaults: getDefaults(),
  });
}
