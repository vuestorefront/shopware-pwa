import { MediaType } from "./MediaType";
import { UserEntity } from "./UserEntity";
import { MediaTranslationCollection } from "./MediaTranslationCollection";
import { CategoryCollection } from "../category/CategoryCollection";
import { ProductMedia } from "../product/ProductMedia";
import { MediaThumbnailCollection } from "./MediaThumbnailCollection";
import { MediaFolder } from "./MediaFolder";
import { PropertyGroupOptionCollection } from "../property/PropertyGroupOptionCollection";
import { MailTemplateMediaCollection } from "./MailTemplateMediaCollection";
import { TagCollection } from "../../system/tag/Tag";
import { DocumentBaseConfigCollection } from "../../checkout/document/DocumentBaseConfigCollection";
import { ShippingMethodCollection } from "../../checkout/shipping/ShippingMethodCollection";
import { PaymentMethodCollection } from "../../checkout/payment/PaymentMethodCollection";
import { CmsBlockCollection } from "../cms/CmsBlockCollection";
import { DocumentCollection } from "../../checkout/document/DocumentCollection";
import { ProductManufacturerCollection } from "../product/ProductManufacturerCollection"
import { OrderLineItemCollection } from "../../checkout/order/OrderLineItemCollection"

export interface Media {
    userId: string | null;
    mimeType: string | null;
    fileExtension: string | null;
    fileSize: number | null;
    title: string | null;
    metaDataRaw: string| null;
    metaData: [] | null;
    mediaType: MediaType;
    uploadedAt: Date | null;
    alt: string | null;
    url: string;
    fileName: string;
    user: UserEntity;
    translations: MediaTranslationCollection | null;
    categories: CategoryCollection | null;
    productManufacturers: ProductManufacturerCollection | null;
    productMedia: ProductMedia | null;
    avatarUser: UserEntity | null;
    thumbnails: MediaThumbnailCollection | null;
    mediaFolderId: string | null;
    mediaFolder: MediaFolder | null;
    hasFile: boolean;
    private: boolean;
    propertyGroupOptions: PropertyGroupOptionCollection | null;
    mailTemplateMedia: MailTemplateMediaCollection | null;
    customFields: [] | null;
    tags: TagCollection | null;
    thumbnailsRo: string | null;
    documentBaseConfigs: DocumentBaseConfigCollection | null;
    shippingMethods: ShippingMethodCollection | null;
    paymentMethods: PaymentMethodCollection | null;
    orderLineItems: OrderLineItemCollection | null;
    cmsBlocks: CmsBlockCollection | null;
    documents: DocumentCollection | null;
}
