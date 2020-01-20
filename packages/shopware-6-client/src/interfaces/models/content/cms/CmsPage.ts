import { CustomField } from "../../common/CustomField";
import { Category } from "../category/Category";

export enum CmsPageType {
  DEFAULT = "default",
  PRODUCT_LISTING = "product_list",
  LANDING_PAGE = "landingpage"
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
  TEXT = "text"
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

export enum SectionType {
  DEFAULT = "default"
}

export enum SizingMode {
  BOXED = "boxed"
}

export enum MobileBehavior {
  BOXED = "boxed",
  WRAP = "wrap"
}

export enum BackgroundMediaMode {
  COVER = "cover"
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
