import { Category } from "../interfaces/models/content/category/Category";
import { getCategoryEndpoint, getCategoryDetailsEndpoint } from "../endpoints";
import { ParamsConverter } from "../helpers/paramsConverter";
import { SearchResult } from "../interfaces/response/SearchResult";
import { apiService } from "../apiService";

const getCategories = async function(
  pagination?: any,
  sort?: any,
  filter?: any
): Promise<SearchResult<Category[]>> {
  const resp = await apiService.get(getCategoryEndpoint(), {
    params: ParamsConverter.getParams(pagination, sort, filter)
  });

  return resp.data;
};

const getCategory = async function(categoryId: string): Promise<Category> {
  const resp = await apiService.get(getCategoryDetailsEndpoint(categoryId));

  return resp.data.data;
};

const getCategoryWithAssociation = async function(
  categoryId: string,
  associationName: string
): Promise<Category> {
  const resp = await apiService.get(
    `${getCategoryDetailsEndpoint(
      categoryId
    )}?associations[${associationName}][]`
  );

  return resp.data.data;
};

interface CategoryService {
  getCategories: (
    pagination?: any,
    sort?: any,
    filter?: any
  ) => Promise<SearchResult<Category[]>>;

  getCategory: (categoryId: string) => Promise<Category>;

  getCategoryWithAssociation: (
    categoryId: string,
    associationName: string
  ) => Promise<Category>;
}

export const CategoryService: CategoryService = {
  getCategories,
  getCategory,
  getCategoryWithAssociation
};
