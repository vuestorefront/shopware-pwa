import { getPageResolverEndpoint } from "../endpoints";
import { apiService } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
import { CmsPage } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";
import { convertSearchCriteria } from "../helpers/searchConverter";

/**
 * @alpha
 */
export interface PageResolverResult<T> {
  breadcrumb: any[];
  resourceType: string;
  resourceIdentifier: string;
  cmsPage: T;
}

/**
 * @alpha
 */
export async function getPage(
  path: string,
  searchCriteria?: SearchCriteria
): Promise<PageResolverResult<CmsPage>> {
  const resp = await apiService.post(getPageResolverEndpoint(), {
    path: path,
    ...convertSearchCriteria(searchCriteria)
  });

  return resp.data;
}
