export interface PageResolverResult<T> {
  resourceType: string;
  resourceIdentifier: string;
  cmsPage: T;
}
