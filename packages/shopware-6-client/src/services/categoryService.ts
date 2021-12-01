import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";
import { getCategoryEndpoint, getCategoryDetailsEndpoint } from "../endpoints";
import { EntityResult } from "@shopware-pwa/commons/interfaces/response/EntityResult";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * @throws ClientApiError
 * @public
 */
export async function getCategories(
  searchCriteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"category", Category[]>> {
  const resp = await contextInstance.invoke.post(
    getCategoryEndpoint(),
    searchCriteria
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @public
 */
export async function getCategory(
  categoryId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Category> {
  const resp = await contextInstance.invoke.get(
    getCategoryDetailsEndpoint(categoryId)
  );

  return resp.data;
}
