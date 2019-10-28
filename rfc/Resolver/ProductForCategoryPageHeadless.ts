import { ListingPriceForHeadless } from "./ListingPriceForHeadless";

export interface ProductForCategoryPageHeadless {
  // basic product data for category page
  id: string;
  name: string | null;
  description: string | null;

  // labels to display in the frontend layer
  available: boolean; // because of "Inform me about availability" or for making it possible to switch between variants
  isNew: boolean;
  isCloseout: boolean | null;
  shippingFree: boolean | null;
  markAsTopseller: boolean | null;

  // it is a parent product of some variant
  parentId: string | null;

  // we would like to get price ranges or specific price, that we need to display in Category Page for given sw-context-token
  listingPrices: ListingPriceForHeadless;

  // thumbnail
  cover: {
    media: {
      title: string | null;
      alt: string | null;
      url: string;
      thumbnails: [
        // How do we choose the right thumbnail to display for specific view port?
        {
          width: number;
          height: number;
          url: string;
        }
      ];
    };
  };

  // star rating
  ratingAverage: number | null;
}
