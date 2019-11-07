import { Category } from "../interfaces/models/content/category/Category";
import { getNavigationEndpoint } from "../endpoints";
import { SearchResult } from "../interfaces/response/SearchResult";
import { apiService } from "../apiService";
import { getCategories } from "./categoryService";
import { SearchFilterType } from "../interfaces/search/SearchFilter";

export async function getNavigation(): Promise<SearchResult<Category[]>> {
  const resp = await apiService.post(getNavigationEndpoint());

  return resp.data;
}
/**
 * remove when https://github.com/elkmod/SwagVueStorefront/issues/15 is done
 */
export async function getNavigationTemp(
  parentId: string
): Promise<
  Array<{
    header: string | null;
    items: Array<{
      label: string | null;
      count: number;
    }>;
  }>
> {
  const resp = await getCategories({
    filters: [
      {
        type: SearchFilterType.EQUALS,
        field: "parentId",
        value: parentId
      }
    ],
    configuration: { associations: [{ name: "children" }] }
  });

  const navigation = resp.data.map(category => ({
    header: category.name,
    id: category.id,
    items: category.children
      ? category.children.map(child => ({
          label: child.name,
          count: child.childrenCount
        }))
      : []
  }));

  return navigation;
}
