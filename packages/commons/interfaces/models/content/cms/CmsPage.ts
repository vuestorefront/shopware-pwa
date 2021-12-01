import { CustomField } from "../../common/CustomField";
import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";

/**
 * Cms page type
 *
 * @public
 */
export type CmsPageType = "product_list" | "landingpage" | "product_detail";

/**
 * Cms page resource type
 *
 * @public
 */
export type CmsResourceType =
  | "frontend.navigation.page"
  | "frontend.landing.page"
  | "frontend.detail.page";

/**
 * @public
 */
export type CmsResponse = {
  apiAlias: "pwa_page_result";
  resourceIdentifier: string;
  canonicalPathInfo: string;
  breadcrumb: PageBreadcrumb;
  cmsPage: CmsPage;
};

/**
 * @public
 */
export type CmsProductPageResponse = CmsResponse & {
  resourceType: "frontend.detail.page";
  cmsPage: CmsPage | null;
  product: Product;
};

/**
 * @public
 */
export type CmsCategoryPageResponse = CmsResponse & {
  resourceType: "frontend.navigation.page";
  category: Category;
};

/**
 * @public
 */
export type CmsStaticPageResponse = CmsResponse & {
  resourceType: "frontend.landing.page";
};

/**
 * @public
 */
export type CmsPageResponse =
  | CmsCategoryPageResponse
  | CmsProductPageResponse
  | CmsStaticPageResponse;

/**
 * @public
 */
export interface Breadcrumb {
  name: string;
  path: string;
}

/**
 * @public
 */
export interface PageBreadcrumb {
  [id: string]: Breadcrumb;
}

/**
 * @deprecated use CmsPageResponse instead
 */
export interface PageResolverResult<T> {
  cmsPage: T;
  breadcrumb: PageBreadcrumb;
  listingConfiguration: any;
  resourceType: CmsPageType;
  resourceIdentifier: string;
  apiAlias: string;
}

/**
 * @deprecated use CmsPageResponse or CmsProductPageResponse instead
 */
export interface PageResolverProductResult {
  product: Partial<Product>;
  breadcrumb: PageBreadcrumb;
  aggregations: Aggregation[];
  resourceType: CmsPageType;
  resourceIdentifier: string;
  cannonicalPathInfo: string;
  apiAlias: string;
}

/**
 * @public
 */
export interface CmsPage {
  category: Category;
  type: CmsPageType;
  name: string;
  customFields: CustomField[] | null;
  locked: boolean;
  _uniqueIdentifier: string;
  versionId: string | null;
  translated: any;
  createdAt: Date;
  updatedAt: Date;
  extensions: [any];
  id: string;
  entity: any | null;
  sections: CmsSection[];
  translations: [any] | null;
  categories: [Category] | null;
  config: any | null;
  previewMediaId: any | null;
  previewMedia: any | null;
}

/**
 * @public
 */
export type CmsSlotType =
  | "image"
  | "product-slider"
  | "product-listing"
  | "product-box"
  | "slot"
  | "text";

/**
 * @public
 */
export interface CmsFieldConfig {
  name: string;
  source: string;
  value: string;
}

/**
 * @public
 */
export interface CmsSlot {
  type: CmsSlotType;
  customFields: CustomField[] | null;
  locked: boolean;
  _uniqueIdentifier: string;
  versionId: string;
  translated: any;
  createdAt: Date;
  updatedAt: Date | null;
  extensions: [any];
  id: string;
  translations: any | null;
  config: any;
  slot: string;
  block: CmsBlock | null;
  blockId: string;
  fieldConfig: CmsFieldConfig[];
  data?: any;
}

/**
 * @public
 */
export interface CmsBlock {
  name: string;
  sectionPosition: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  backgroundColor: string;
  backgroundMediaId: string;
  backgroundMediaMode: string;
  cssClass: string;
  slots: CmsSlot[];
}

/**
 * @public
 */
export type SectionType = "default";

/**
 * @public
 */
export type SizingMode = "boxed";

/**
 * @public
 */
export type MobileBehavior = "boxed" | "wrap";

/**
 * @public
 */
export type BackgroundMediaMode = "cover";

/**
 * @public
 */
export interface CmsSection {
  type: SectionType;
  pageId: string;
  page: null;
  position: number;
  name: string | null;
  sizingMode: SizingMode;
  mobileBehavior: MobileBehavior;
  backgroundColor: string | null;
  backgroundMediaId: string | null;
  backgroundMedia: null;
  backgroundMediaMode: BackgroundMediaMode;
  cssClass: string | null;
  customFields: CustomField[] | null;
  locked: false;
  _uniqueIdentifier: string;
  versionId: string | null;
  translated: [any];
  createdAt: Date;
  updatedAt: Date;
  extensions: [any];
  id: string;
  blocks: CmsBlock[];
}
