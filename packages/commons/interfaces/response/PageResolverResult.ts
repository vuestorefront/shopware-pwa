export interface PageResolverResult<T> {
  breadcrumb: any[];
  resourceType: string;
  resourceIdentifier: string;
  cmsPage: T;
}
