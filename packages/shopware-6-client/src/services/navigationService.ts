import {
  getNavigationEndpoint
} from "../endpoints";
import { apiService } from "../apiService";

interface NavigationResponse {
  count: number,
  elements: NaviationElement[]
}

interface NaviationElement {
  id: string
  path: string
  name: string
  children: NaviationElement[] | null,
  count: number,
  level: number,
  extensions: any[]
}

interface GetNavigationParams {
  depth: number,
  rootNode?: string
}

export async function getNavigation(params: GetNavigationParams): Promise<NavigationResponse> {
  const resp = await apiService.post(getNavigationEndpoint(), 
    params
  );
  
  return resp.data
}