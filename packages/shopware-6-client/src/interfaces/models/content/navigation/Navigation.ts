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
  name: string;
  route: {
    path: string;
    resourceType: string;
  };
  children: NavigationElement[] | null;
  count: number;
  level: number;
  extensions: any[];
}
