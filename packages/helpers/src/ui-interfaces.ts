/**
 * @public
 */
export interface UiMediaGalleryItemUrl {
  url: string;
}

/**
 * @public
 */
export interface UiMediaGalleryItem {
  icon: UiMediaGalleryItemUrl;
  mobile: UiMediaGalleryItemUrl;
  desktop: UiMediaGalleryItemUrl;
}

/**
 * @public
 */
export interface UiProductOption {
  label: string;
  value: string;
  code: string;
  color: string | null;
}

/**
 * @public
 */
export interface UiProductProperty {
  name: string;
  value: string | null;
}

/**
 * @public
 */
export interface UiProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

/**
 * @public
 */
export enum UiCategoryFilterType {
  range = "range",
  term = "term",
  max = "max",
  entity = "entity",
}

/**
 * @public
 */
export interface UiCategoryFilterOption {
  color: boolean | string;
  label: string;
  value: string;
  count?: number;
}

/**
 * @public
 */
export interface UiCategoryRangeFilterOption {
  max: string;
  min: string;
}

/**
 * @public
 */
export interface UiCategoryFilter {
  name: string;
  type: UiCategoryFilterType;
  options: UiCategoryFilterOption[] | UiCategoryRangeFilterOption | any; // TODO when the feature is fully implemented on SW side.
}
