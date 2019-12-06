export interface UiMediaGalleryItemUrl {
  url: string;
}
export interface UiMediaGalleryItem {
  small: UiMediaGalleryItemUrl;
  normal: UiMediaGalleryItemUrl;
  big: UiMediaGalleryItemUrl;
}

export interface UiProductOption {
  label: string;
  value: string;
  [attribute: string]: string;
}

export interface UiProductProperty {
  name: string;
  value: string | null;
}

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

export interface UiCategoryFilter {
  name: string;
  type: UiCategoryFilterType;
  options: UiCategoryFilterOption[] | UiCategoryRangeFilterOption | any; // TODO when the feature is fully implemented on SW side.
}
