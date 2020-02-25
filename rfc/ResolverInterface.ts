import { ShopwareParams } from "@shopware-pwa/shopware-6-client";
import { CmsPageForHeadless } from "./Resolver/CmsPageForHeadless";
import { ProductForCategoryPageHeadless } from "./Resolver/ProductForCategoryPageHeadless";
import { ProductForProductPageHeadless } from "./Resolver/ProductForProductPageHeadless";
import { CategoryForHeadless } from "./Resolver/CategoryForHeadless";

export interface Resolver {
  getPageForHeadless: (
    criteria: PageCriteria
  ) => PageForHeadless<
    | CategoryForHeadless
    | ProductForCategoryPageHeadless
    | ProductForProductPageHeadless
    | CmsPageForHeadless
  >;
}

export interface PageForHeadless<T> {
  pageTypeId: PageType;
  entityId: string;
  data: T;
}

enum PageType {
  CATEGORY = "frontend.navigation.page",
  PRODUCT = "frontend.detail.page",
  CMS = "frontend.cms.page",
  LINK = "frontend.link.redirect"
}

export interface PageCriteria {
  path: string; // path + other possible criteria
  parameters?: ShopwareParams; // in order to filter, sort, paginate associated collection of products (associated to Category)
}
