import { Breadcrumb } from "./Breadcrumb";
import { ProductForCategoryPageHeadless } from "./ProductForCategoryPageHeadless";
import { CmsPage } from "../../packages/shopware-6-client/src/interfaces/models/content/cms/CmsPage";
import { Media } from "../../packages/shopware-6-client/src/interfaces/models/content/media/Media";

// PLACEHOLDERS IN CMS PAGES OF SHOPWARE 6
//
// category.type
// category.name
// category.externalLink
// category.description
// category.media.alt
// category.media.title
// category.media.url
// category.media

export interface CategoryForHeadless {
  availableSorting: [Sort];
  availableFiltering: [Filter];

  id: string;
  name: string | null;
  description: string;
  childCount: number;

  parentId: string | null;
  breadcrumb: Breadcrumb[];
  level: number;

  children: CategoryForHeadless[] | null;
  products: ProductForCategoryPageHeadless[] | null;

  cmsPage: CmsPage | null;

  // what is media here? some thumbnail of a category?
  media: Media | null;
}

interface Sort {
  field: string; // field name to sort by
  label: string; // translated label
}

enum FilterType {
  option = "option", // it's default and only one for properties - internally in SW
  range = "range" // additional, does not exist in SW, but could be only marked as the range for price
  // ...
}

interface FilterProperty {
  id: string; // property id
  label: string; // property label
}

interface Filter {
  groupId: string; // id of the group the attribute belongs to
  code: string; // literal code (user friendly insted of using groupId)
  label: string; // translated label, the name of the Field name you can filter by
  // translated : {} or just follow the SW translation standard and use to translated object inside the filter
  type: FilterType;
  properties?: [FilterProperty]; // optional, if type == 'option'
}
