/**
 * @alpha
 */
export interface UiMediaGalleryItemUrl {
  url: string;
}

/**
 * @alpha
 */
export interface UiMediaGalleryItem {
  icon: UiMediaGalleryItemUrl;
  mobile: UiMediaGalleryItemUrl;
  desktop: UiMediaGalleryItemUrl;
}

/**
 * @alpha
 */
export interface UiProductOption {
  label: string;
  value: string;
  code: string;
  attribute: string;
  [attribute: string]: string;
}

/**
 * @alpha
 */
export interface UiProductProperty {
  name: string;
  value: string | null;
}

/**
 * @alpha
 */
export interface UiProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

export enum UiCategoryFilterType {
  range = "range",
  term = "term",
  max = "max",
  entity = "entity"
}
interface UiCategoryFilterOption {
  color: boolean | string;
  label: string;
  value: string;
  count?: number;
}

interface UiCategoryRangeFilterOption {
  max: string;
  min: string;
}

/**
 * @alpha
 */
export interface UiCategoryFilter {
  name: string;
  type: UiCategoryFilterType;
  options: UiCategoryFilterOption[] | UiCategoryRangeFilterOption | any; // TODO when the feature is fully implemented on SW side.
}

/**
 * @alpha
 */
export interface UiCategorySorting {
  name: string;
  active: boolean;
  field: string;
  order: string;
}
