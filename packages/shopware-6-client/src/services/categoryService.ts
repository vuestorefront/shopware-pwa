import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";
import { getCategoryEndpoint, getCategoryDetailsEndpoint } from "../endpoints";
import { convertSearchCriteria } from "../helpers/searchConverter";
import { SearchResult } from "@shopware-pwa/commons/interfaces/response/SearchResult";
import { apiService } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getCategories(
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Category[]>> {
  const resp = await apiService.post(
    getCategoryEndpoint(),
    convertSearchCriteria(searchCriteria)
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getCategory(categoryId: string): Promise<Category> {
  const resp = await apiService.get(getCategoryDetailsEndpoint(categoryId));

  return resp.data.data;
}
