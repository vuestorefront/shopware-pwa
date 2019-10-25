import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
import { CategoryForHeadless } from "./Resolver/CategoryForHeadless";
import { ProductForHeadless } from "./Resolver/ProductForHeadless";
import { CmsPageForHeadless } from "./Resolver/CmsPageForHeadless";

export interface Resolver {
  getPageForHeadless: (
    criteria: PageCriteria
  ) => PageForHeadless<
    ProductForHeadless | CategoryForHeadless | CmsPageForHeadless
  >;
}

export interface PageForHeadless<T> {
  pageTypeId: PageType;
  // pageType: string;
  pathInfo: string;
  seoPathInfo: string;
  isCanonical: boolean;
  resourceIdentifier: string;
  data: T;
}

enum PageType {
  category = "category",
  product = "product",
  cmsPage = "cms-page"
}

export interface PageCriteria extends SearchCriteria {
  path: string; // path + other possible criteria
  includes?: Array<string>; // array of fields to be included (removes others from payload)
  // 1. includes might be available for associated resources as well - to consider
  // 2. would be awesome to have a deep mode for associations to get the deeper objects returned
}
