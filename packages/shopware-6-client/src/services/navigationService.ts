import { getNavigationEndpoint } from "../endpoints";
import { apiService } from "../apiService";
import { NavigationResponse } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/navigation/Navigation";

/**
 * @alpha
 */
export interface GetNavigationParams {
  depth: number;
  rootNode?: string;
}
/**
 * @throws ClientApiError
 * @alpha
 */
export async function getNavigation(
  params: GetNavigationParams
): Promise<NavigationResponse> {
  const resp = await apiService.post(getNavigationEndpoint(), params);

  return resp.data;
}
