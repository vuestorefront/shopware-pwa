import { Media } from "../media/Media";
import { CmsPage } from "../cms/CmsPage";
import { Product } from "../product/Product";
import { Entity } from "../../common/Entity";
import { Tag } from "../../system/tag/Tag";
import { CategoryTranslation } from "./CategoryTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * Source: https://github.com/shopware/platform/blob/master/src/Core/Content/Category/CategoryDefinition.php#L50
 *
 * @beta
 */
export type CategoryType = "page" | "link" | "folder";

/**
 * @beta
 */
export interface Category extends Entity {
  parentId: string | null;
  autoIncrement: number;
  mediaId: string | null;
  name: string | null;
  breadcrumb: string[];
  level: number;
  active: boolean;
  childCount: number;
  displayNestedProducts: boolean;
  parent: Category | null;
  children: Category[] | null;
  translations: CategoryTranslation[] | null;
  media: Media | null;
  products: Product[] | null;
  nestedProducts: Product[] | null;
  afterCategoryId: string | null;
  customFields: CustomField[];
  tags: Tag[] | null;
  cmsPageId: string | null;
  cmsPage: CmsPage | null;
  slotConfig: [] | null;
  externalLink: string | null;
  linkNewTab: boolean;
  visible: boolean;
  type: CategoryType;
  description: string;
  id: string;
  parentVersionId: string;
  childrenCount: number;
  afterCategoryVersionId: string;
  route?: {
    path?: string;
  };
  seoUrls: {
    apiAlias: string;
    pathInfo: string;
    seoPathInfo: string;
  }[];

  translated: {
    breadcrumb: string[];
    description: string;
    externalLink: string;
  };
}
