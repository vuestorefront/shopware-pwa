import { getNavigationEndpoint } from "../endpoints";
import { apiService } from "../apiService";

/**
 * @alpha
 */
export interface NavigationResponse {
  count: number;
  children: NavigationElement[];
}

/**
 * @alpha
 */
export interface NavigationElement {
  id: string;
  path: string;
  name: string;
  children: NavigationElement[] | null;
  count: number;
  level: number;
  extensions: any[];
}

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
