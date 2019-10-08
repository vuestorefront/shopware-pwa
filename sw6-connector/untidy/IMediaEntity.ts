import { ICategoryCollection } from './ICategoryCollection'
import { IProductManufacturers } from './IProduct'
import { IProductMedia } from './IProduct'
import { IPaymentMethodCollection } from './IContext'
import { IShippingMethodCollection } from './IContext'
import { ICmsBLockCollection } from './IShoppingExperiences'
import { ITagCollection } from './ITag'

interface IMediaType {

}

interface IUserEntity {

}

interface IMediaTranslationCollection {

}

interface IMediaThumbnailCollection {

}

interface IMediaFolderEntity {

}

interface IPropertyGroupOptionCollection {

}

interface IMailTemplateMediaCollection {

}

interface IDocumentBaseConfigCollection {

}

interface IOrderLineItemCollection {

}

interface IDocumentCollection {

}

export interface IMediaCollection {
    [index: number]: IMediaEntity;
}

export interface IMediaEntity {
    userId: string | null;
    mimeType: string | null;
    fileExtension: string | null;
    fileSize: number | null;
    title: string | null;
    metaDataRaw: string| null;
    metaData: [] | null;
    mediaType: IMediaType;
    uploadedAt: Date | null;
    alt: string | null;
    url: string;
    fileName: string;
    user: IUserEntity;
    translations: IMediaTranslationCollection | null;
    categories: ICategoryCollection | null;
    productManufacturers: IProductManufacturers | null;
    productMedia: IProductMedia | null;
    avatarUser: IUserEntity | null;
    thumbnails: IMediaThumbnailCollection | null;
    mediaFolderId: string | null;
    mediaFolder: IMediaFolderEntity | null;
    hasFile: boolean;
    private: boolean;
    propertyGroupOptions: IPropertyGroupOptionCollection | null;
    mailTemplateMedia: IMailTemplateMediaCollection | null;
    customFields: [] | null;
    tags: ITagCollection | null;
    thumbnailsRo: string | null;
    documentBaseConfigs: IDocumentBaseConfigCollection | null;
    shippingMethods: IShippingMethodCollection | null;
    PaymentMethodCollection: IPaymentMethodCollection | null;
    OrderLineItemCollection: IOrderLineItemCollection | null;
    cmsBlocks: ICmsBLockCollection | null;
    documents: IDocumentCollection | null;
}
