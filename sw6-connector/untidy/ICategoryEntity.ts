const apiConnector = require('./apiConnector.vue');
import { IMediaEntity } from './IMediaEntity'
import { ICategoryCollection } from './ICategoryCollection'
import { ICmsPageEntity } from './IShoppingExperiences'
import { IProductCollection } from './IProduct'
import { IEntity } from './IEntity'
import { ITagCollection } from "./ITag"

interface ICategoryDetailsRequest {
    categoryId: string;
}

interface IBreadcrumbArray {
    [index:number]: string;
}

interface ICategoryTranslation {

}

interface ICategoryTranslationCollection {
    [index:number]: ICategoryTranslation;
}

export interface ICategoryEntity extends IEntity {
    parentId: string | null;
    autoIncrement: number;
    mediaId: string | null;
    name: string | null;
    breadcrumb: IBreadcrumbArray
    path: string | null;
    level: number;
    active: boolean;
    childCount: number;
    displayNestedProducts: boolean;
    parent: ICategoryEntity | null,
    children: ICategoryCollection | null,
    translations: ICategoryTranslationCollection | null,
    media: IMediaEntity | null,
    products: IProductCollection | null,
    nestedProducts: IProductCollection | null,
    afterCategoryId: string | null;
    customFields: [] | null,
    tags: ITagCollection | null,
    cmsPageId: string | null;
    cmsPage: ICmsPageEntity | null,
    slotConfig: [] | null,
    externalLink: string | null,
    visible: boolean,
    type: string;
    description: string;    
    extensions: [],
    id: string;
    parentVersionId: string;
    afterCategoryVersionId: string;
}