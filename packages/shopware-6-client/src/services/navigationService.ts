import {
  getNavigationEndpoint,
  getStoreNavigationEndpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  NavigationResponse,
  StoreNavigationElement,
} from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { convertSearchCriteria, ApiType } from "../helpers/searchConverter";

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
  requestActiveId:
    | "main-navigation"
    | "service-navigation"
    | "footer-navigation";
  requestRootId: "main-navigation" | "service-navigation" | "footer-navigation";
  depth?: number;
  buildTree?: boolean;
  searchCriteria?: SearchCriteria;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getNavigation(
  params: GetNavigationParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<NavigationResponse> {
  const resp = await contextInstance.invoke.post(
    getNavigationEndpoint(),
    params
  );

  return resp.data;
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
      ...convertSearchCriteria({
        searchCriteria,
        apiType: ApiType.store,
        config: contextInstance.config,
      }),
      ...{
        depth,
        buildTree,
      },
    }
  );

  return resp.data;
}
