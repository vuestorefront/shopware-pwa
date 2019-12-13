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
  code: string;
  [attribute: string]: string;
  active?: boolean;
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
