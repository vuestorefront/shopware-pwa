import { MediaEntity } from '../media/MediaEntity'
import { CategoryCollection } from './CategoryCollection'
import { CmsPageEntity } from "../cms/CmsPageEntity";
import { ProductCollection } from "../product/ProductCollection";
import { Entity } from '../Entity'
import { TagCollection } from "../Tag"
import { CategoryTranslationCollection } from './CategoryTranslationCollection';
import { BreadcrumbArray } from './BreadcrumbArray';

export interface CategoryEntity extends Entity {
    parentId: string | null;
    autoIncrement: number;
    mediaId: string | null;
    name: string | null;
    breadcrumb: BreadcrumbArray
    path: string | null;
    level: number;
    active: boolean;
    childCount: number;
    displayNestedProducts: boolean;
    parent: CategoryEntity | null;
    children: CategoryCollection | null;
    translations: CategoryTranslationCollection | null;
    media: MediaEntity | null;
    products: ProductCollection | null;
    nestedProducts: ProductCollection | null;
    afterCategoryId: string | null;
    customFields: [] | null;
    tags: TagCollection | null;
    cmsPageId: string | null;
    cmsPage: CmsPageEntity | null;
    slotConfig: [] | null;
    externalLink: string | null;
    visible: boolean;
    type: string;
    description: string;    
    extensions: [],
    id: string;
    parentVersionId: string;
    afterCategoryVersionId: string;
}