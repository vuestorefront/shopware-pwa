import {
  getNavigationEndpoint
} from "../endpoints";
import { apiService } from "../apiService";

interface NavigationResponse {
  count: number,
  elements: NaviationElement[]
}

export interface NavigationElement {
  id: string
  path: string
  name: string
  children: NaviationElement[] | null,
  count: number,
  level: number,
  extensions: any[]
}


export async function getNavigation(
  depth: number,
  rootNode?: string
): Promise<NavigationResponse> {
  const resp = await apiService.post(getNavigationEndpoint(), {
    depth: 1
  });
  
  return resp.data
}
