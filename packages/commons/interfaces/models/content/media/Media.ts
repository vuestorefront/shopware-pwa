import { MediaType } from "./MediaType";
import { MediaTranslation } from "./MediaTranslation";
import { Category } from "../category/Category";
import { ProductMedia } from "../product/ProductMedia";
import { MediaThumbnail } from "./MediaThumbnail";
import { MediaFolder } from "./MediaFolder";
import { PropertyGroupOption } from "../property/PropertyGroupOption";
import { MailTemplateMedia } from "../mail-template/MailTemplateMedia";
import { Tag } from "../../system/tag/Tag";
import { DocumentBaseConfig } from "../../checkout/document/DocumentBaseConfig";
import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";
import { PaymentMethod } from "../../checkout/payment/PaymentMethod";
import { CmsBlock } from "../cms/CmsBlock";
import { Document } from "../../checkout/document/Document";
import { ProductManufacturer } from "../product/ProductManufacturer";
import { OrderLineItem } from "../../checkout/order/OrderLineItem";
import { CustomField } from "../../common/CustomField";
import { User } from "../../system/user/User";

/**
 * @public
 */
export interface Media {
  userId: string | null;
  mimeType: string | null;
  fileExtension: string | null;
  fileSize: number | null;
  title: string | null;
  metaDataRaw: string | null;
  metaData: [] | null;
  mediaType: MediaType;
  uploadedAt: Date | null;
  alt: string | null;
  url: string;
  fileName: string;
  user: User;
  translations: MediaTranslation[] | null;
  categories: Category[] | null;
  productManufacturers: ProductManufacturer[] | null;
  productMedia: ProductMedia | null;
  avatarUser: User | null;
  thumbnails: MediaThumbnail[] | null;
  mediaFolderId: string | null;
  mediaFolder: MediaFolder | null;
  hasFile: boolean;
  private: boolean;
  propertyGroupOptions: PropertyGroupOption[] | null;
  mailTemplateMedia: MailTemplateMedia[] | null;
  customFields: CustomField[];
  tags: Tag | null;
  thumbnailsRo: string | null;
  documentBaseConfigs: DocumentBaseConfig[] | null;
  shippingMethods: ShippingMethod[] | null;
  paymentMethods: PaymentMethod[] | null;
  orderLineItems: OrderLineItem[] | null;
  cmsBlocks: CmsBlock[] | null;
  documents: Document[] | null;
}
