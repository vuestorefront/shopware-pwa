import { CategoryCollection } from '../category/CategoryCollection'
import { ProductManufacturers } from "../product/ProductManufacturers"
import { ProductMedia } from "../product/ProductMedia"
import { ShippingMethodCollection } from "../shipping/ShippingMethodCollection"
import { CmsBlockCollection } from "../cms/CmsBlockCollection"
import { TagCollection } from '../Tag'
import { MediaType } from './MediaType'
import { UserEntity } from './UserEntity'
import { MediaTranslationCollection } from './MediaTranslationCollection'
import { MediaThumbnailCollection } from './MediaThumbnailCollection'
import { MediaFolderEntity } from './MediaFolderEntity'
import { PropertyGroupOptionCollection } from './PropertyGroupOptionCollection'
import { MailTemplateMediaCollection } from './MailTemplateMediaCollection'
import { DocumentBaseConfigCollection } from './DocumentBaseConfigCollection'
import { OrderLineItemCollection } from './OrderLineItemCollection'
import { DocumentCollection } from './DocumentCollection'
import { PaymentMethodCollection } from '../checkout/PaymentMethodCollection'

export interface MediaEntity {
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
    productManufacturers: ProductManufacturers | null;
    productMedia: ProductMedia | null;
    avatarUser: UserEntity | null;
    thumbnails: MediaThumbnailCollection | null;
    mediaFolderId: string | null;
    mediaFolder: MediaFolderEntity | null;
    hasFile: boolean;
    private: boolean;
    propertyGroupOptions: PropertyGroupOptionCollection | null;
    mailTemplateMedia: MailTemplateMediaCollection | null;
    customFields: [] | null;
    tags: TagCollection | null;
    thumbnailsRo: string | null;
    documentBaseConfigs: DocumentBaseConfigCollection | null;
    shippingMethods: ShippingMethodCollection | null;
    PaymentMethodCollection: PaymentMethodCollection | null;
    OrderLineItemCollection: OrderLineItemCollection | null;
    cmsBlocks: CmsBlockCollection | null;
    documents: DocumentCollection | null;
}
