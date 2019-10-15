import { getCategoryEndpoint } from "./endpoints";
import { apiService } from "./apiService";

export interface Category {
  name: String;
}

export interface SearchResult<T> {
  total: Number;
  data: T[];
}

export async function getCategories(): Promise<SearchResult<Category[]>> {
  const resp = await apiService.get(getCategoryEndpoint());
  return resp.data;
}
