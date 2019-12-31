import { Category } from "@shopware-pwa/shopware-6-client/src/interfaces//models/content/category/Category";
import { getCategoryEndpoint, getCategoryDetailsEndpoint } from "@shopware-pwa/shopware-6-client/src/endpoints";
import { convertSearchCriteria } from "@shopware-pwa/shopware-6-client/src/helpers/searchConverter";
import { SearchResult } from "@shopware-pwa/shopware-6-client/src/interfaces//response/SearchResult";
import { apiService } from "@shopware-pwa/shopware-6-client/src/apiService";
import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";

export async function getCategories(
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Category[]>> {
  const resp = await apiService.post(
    getCategoryEndpoint(),
    convertSearchCriteria(searchCriteria)
  );

  return resp.data;
}

export async function getCategory(categoryId: string): Promise<Category> {
  const resp = await apiService.get(getCategoryDetailsEndpoint(categoryId));

  return resp.data.data;
}
