import { getPageResolverEndpoint } from "../endpoints";
import { apiService } from "../apiService";
import { SearchCriteria } from "../interfaces/search/SearchCriteria";
import { CmsPage } from "../interfaces/models/content/cms/CmsPage";
import { PageResolverResult } from "../interfaces/response/PageResolverResult";

export async function getPage(
  path: string,
  searchCriteria?: SearchCriteria
): Promise<PageResolverResult<CmsPage>> {
  const resp = await apiService.post(getPageResolverEndpoint(), {
    path: path
  });

  return resp.data;
}
