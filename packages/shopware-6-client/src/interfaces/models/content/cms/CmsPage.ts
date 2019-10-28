import { CustomField } from "../../common/CustomField";
import { Category } from "../category/Category";

enum CmsPageType {
  default = "default",
  product_listing = "product_list",
  landingpage = "landingpage"
}
export interface CmsPage {
  type: CmsPageType;
  name: string;
  customFields: CustomFields[] | null;
  locked: boolean;
  _uniqueIdentifier: string;
  versionId: string | null;
  translated: any;
  createdAt: Date;
  updatedAt: Date;
  extensions: [any];
  id: string;
  entity: any | null;
  sections: [Section];
  translations: [any] | null;
  categories: [Category] | null;
  config: any | null;
  previewMediaId: any | null;
  previewMedia: any | null;
}

enum SlotType {
  image = "image",
  productSlider = "product-slider",
  productListing = "product-listing",
  productBox = "product-box",
  slot = "slot",
  text = "text"
}

interface FieldConfig {
  name: string;
  source: string;
  value: string;
}

interface Slot {
  type: SlotType;
  customFields: [CustomField] | null;
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
  block: Block | null;
  blockId: string;
  fieldConfig: [FieldConfig];
  data?: any;
}

interface Block {
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
  slots: [Slot];
}

enum SectionType {
  default = "default"
}

enum SizingMode {
  boxed = "boxed"
}

enum MobileBehavior {
  boxed = "boxed",
  wrap = "wrap"
}

enum BackgroundMediaMode {
  cover = "cover"
}

interface Section {
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
  customFields: [CustomField] | null;
  locked: false;
  _uniqueIdentifier: string;
  versionId: string | null;
  translated: [any];
  createdAt: Date;
  updatedAt: Date;
  extensions: [any];
  id: string;
  blocks: [Block];
}
