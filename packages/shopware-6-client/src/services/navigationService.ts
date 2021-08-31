import { getStoreNavigationEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  StoreNavigationElement,
  StoreNavigationType,
} from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @alpha
 */
export interface GetNavigationParams {
  depth: number;
  rootNode?: string;
}

/**
 * More about the navigation parameters: https://docs.shopware.com/en/shopware-platform-dev-en/store-api-guide/navigation?category=shopware-platform-dev-en/store-api-guide
 * @beta
 */
export interface GetStoreNavigationParams {
  requestActiveId: StoreNavigationType;
  requestRootId: StoreNavigationType;
  depth?: number;
  buildTree?: boolean;
  searchCriteria?: ShopwareSearchParams;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getStoreNavigation(
  {
    requestActiveId,
    requestRootId,
    depth,
    buildTree,
    searchCriteria,
  }: GetStoreNavigationParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<StoreNavigationElement[]> {
  const resp = await contextInstance.invoke.post(
    getStoreNavigationEndpoint(requestActiveId, requestRootId),
    {
      ...(searchCriteria || {}),
      ...{
        depth,
        buildTree,
      },
    }
  );

  return resp.data;
}
