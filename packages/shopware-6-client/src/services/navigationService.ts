import {
  getNavigationEndpoint
} from "../endpoints";
import { apiService } from "../apiService";

export interface NavigationResponse {
  count: number,
  elements: NavigationElement[]
}

export interface NavigationElement {
  id: string
  path: string
  name: string
  children: NavigationElement[] | null,
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
