import {
  getNavigationEndpoint,
  getStoreNavigationEndpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  NavigationResponse,
  StoreNavigationElement,
} from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { ShopwareParams } from "../helpers/searchConverter";

/**
 * @alpha
 */
export interface GetNavigationParams {
  depth: number;
  rootNode?: string;
}

/**
 * @beta
 */
export interface GetStoreNavigationParams {
  activeNavigationId: string;
  navigationId: string;
  params?: ShopwareParams;
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
  { activeNavigationId, navigationId, params }: GetStoreNavigationParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<StoreNavigationElement[]> {
  const resp = await contextInstance.invoke.post(
    getStoreNavigationEndpoint(activeNavigationId, navigationId),
    params
  );

  return resp.data;
}
