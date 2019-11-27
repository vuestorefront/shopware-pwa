import { AxiosStatic } from "axios";

// Global compile-time constants
declare var __DEV__: boolean;
declare var __JSDOM__: boolean;
declare var __BROWSER__: boolean;
declare var __COMMIT__: string;
declare var __VERSION__: string;

// Feature flags
declare var __FEATURE_OPTIONS__: boolean;
declare var __FEATURE_SUSPENSE__: boolean;

// Externals
declare var axios: AxiosStatic;


// Ui interfaces
interface UiMediaGalleryItemUrl {
  url: string
}
interface UiMediaGalleryItem {
  small: UiMediaGalleryItemUrl
  normal: UiMediaGalleryItemUrl
  big: UiMediaGalleryItemUrl
}

interface UiProductOption {
  label: string,
  value: string,
  [attribute: string]: string
}

interface UiProductProperty {
  name: string
  value: string | null
}

interface UiProductReview {
  id: string,
  author: string,
  date: Date
  message: string | null,
  rating: number | null
}