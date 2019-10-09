import { Media } from '../media/Media'
import { CategoryCollection } from './CategoryCollection'
import { CmsPage } from "../cms/CmsPage";
import { ProductCollection } from "../product/ProductCollection";
import { Entity } from '../../framework/struct/Entity'
import { TagCollection } from "../../system/tag/Tag"
import { CategoryTranslationCollection } from './CategoryTranslationCollection';

export interface Category extends Entity {
    parentId: string | null;
    autoIncrement: number;
    mediaId: string | null;
    name: string | null;
    breadcrumb: string[]
    level: number;
    active: boolean;
    childCount: number;
    displayNestedProducts: boolean;
    parent: Category | null;
    children: CategoryCollection | null;
    translations: CategoryTranslationCollection | null;
    media: Media | null;
    products: ProductCollection | null;
    nestedProducts: ProductCollection | null;
    afterCategoryId: string | null;
    customFields: [] | null;
    tags: TagCollection | null;
    cmsPageId: string | null;
    cmsPage: CmsPage | null;
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