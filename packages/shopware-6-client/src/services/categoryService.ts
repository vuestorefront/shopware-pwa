import { Category } from "../interfaces/models/content/category/Category";
import { getCategoryEndpoint, getCategoryDetailsEndpoint } from "../endpoints";
import { ParamsConverter } from "../helpers/paramsConverter";
import { SearchResult } from "../interfaces/response/SearchResult";
import { apiService } from "../apiService";

export async function getCategories(
  pagination?: any,
  sort?: any,
  filter?: any
): Promise<SearchResult<Category[]>> {
  const resp = await apiService.get(getCategoryEndpoint(), {
    params: ParamsConverter.getParams(pagination, sort, filter)
  });

  return resp.data;
}

export async function getCategory(categoryId: string): Promise<Category> {
  const resp = await apiService.get(getCategoryDetailsEndpoint(categoryId));

  return resp.data.data;
}

export async function getCategoryWithAssociation(
  categoryId: string,
  associationName: string
): Promise<Category> {
  const resp = await apiService.get(
    `${getCategoryDetailsEndpoint(
      categoryId
    )}?associations[${associationName}][]`
  );

  return resp.data.data;
}
