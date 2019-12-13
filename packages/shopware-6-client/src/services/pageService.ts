import { getPageResolverEndpoint } from "../endpoints";
import { apiService } from "../apiService";
import { SearchCriteria } from "../interfaces/search/SearchCriteria";
import { CmsPage } from "../interfaces/models/content/cms/CmsPage";
import { PageResolverResult } from "../interfaces/response/PageResolverResult";
import { convertSearchCriteria } from "../helpers/searchConverter";

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
