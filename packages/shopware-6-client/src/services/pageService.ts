import { getPageResolverEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { CmsPage } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { convertSearchCriteria } from "../helpers/searchConverter";

/**
 * @alpha
 */
export interface PageResolverResult<T> {
  breadcrumb: {
    [id: string]: {
      name: string;
      path: string;
    };
  };
  resourceType: string;
  resourceIdentifier: string;
  cmsPage: T;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getPage(
  path: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<PageResolverResult<CmsPage>> {
  const resp = await contextInstance.invoke.post(getPageResolverEndpoint(), {
    path: path,
    ...convertSearchCriteria({
      searchCriteria,
      config: contextInstance.config,
    }),
  });

  return resp.data;
}
