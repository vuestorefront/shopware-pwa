import { CustomField } from "../../common/CustomField";
import { Category } from "../category/Category";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";

/**
 * @beta
 */
export enum PageType {
  PRODUCT_DETAIL_PAGE = "frontend.detail.page",
  NAVIGATION_PAGE = "frontend.navigation.page",
}

/**
 * @beta
 */
export interface PageResolverResult<T> {
  cmsPage: T;
  breadcrumb: {
    [id: string]: {
      name: string;
      path: string;
    };
  };
  listingConfiguration: any;
  resourceType: PageType;
  resourceIdentifier: string;
  apiAlias: string;
}

/**
 * @beta
 */
export interface PageResolverProductResult {
  product: Partial<Product>;
  aggregations: Aggregation[];
  resourceType: PageType;
  resourceIdentifier: string;
  cannonicalPathInfo: string;
  apiAlias: string;
}

export enum CmsPageType {
  DEFAULT = "default",
  PRODUCT_LISTING = "product_list",
  LANDING_PAGE = "landingpage",
}

/**
 * @alpha
 */
export interface CmsPage {
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

export enum CmsSlotType {
  IMAGE = "image",
  PRODUCT_SLIDER = "product-slider",
  PRODUCT_LISTING = "product-listing",
  PRODUCT_BOX = "product-box",
  SLOT = "slot",
  TEXT = "text",
}

/**
 * @alpha
 */
export interface CmsFieldConfig {
  name: string;
  source: string;
  value: string;
}

/**
 * @alpha
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
 * @alpha
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
 * @alpha
 */
export enum SectionType {
  DEFAULT = "default",
}

/**
 * @alpha
 */
export enum SizingMode {
  BOXED = "boxed",
}

/**
 * @alpha
 */
export enum MobileBehavior {
  BOXED = "boxed",
  WRAP = "wrap",
}

/**
 * @alpha
 */
export enum BackgroundMediaMode {
  COVER = "cover",
}

/**
 * @alpha
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
