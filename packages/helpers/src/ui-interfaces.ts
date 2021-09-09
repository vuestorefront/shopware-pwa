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
