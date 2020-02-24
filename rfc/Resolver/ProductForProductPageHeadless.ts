import { ProductManufacturer } from "@shopware-pwa/commons/interfaces/models/content/product/ProductManufacturer";
import { Unit } from "@shopware-pwa/commons/interfaces/models/system/unit/Unit";
import { Price } from "@shopware-pwa/commons/interfaces/models/framework/pricing/Price";
import { CalculatedPrice } from "@shopware-pwa/commons/interfaces/models/checkout/cart/price/CalculatedPrice";
import { Tax } from "@shopware-pwa/commons/interfaces/models/system/tax/Tax";
import { ProductPrice } from "@shopware-pwa/commons/interfaces/models/content/product/ProductPrice";

export interface ProductForProductPageHeadless {
  // basic product data
  id: string;
  ean: string | null;
  productNumber: string;
  additionalText: string | null;
  name: string | null;
  keywords: string | null;
  description: string | null;
  metaTitle: string | null;
  manufacturerNumber: string | null;
  manufacturer: ProductManufacturer | null;
  unit: Unit | null;

  // labels
  isCloseout: boolean | null;
  shippingFree: boolean | null;
  markAsTopseller: boolean | null;
  isNew: boolean;

  // whats the difference between calculated and not calculated prices?
  // can we get the price objects just to display for given sw-context-token and product page url path?
  calculatedPrices: Price[];
  calculatedPrice: CalculatedPrice;
  price: Price[] | null;
  tax: Tax;
  prices: ProductPrice[];
  parentId: string | null;

  // warehouse stocks
  available: boolean;

  // decission on how to display a quantity? as a text field, drop down etc.
  purchaseSteps: number | null; // 5 10 15
  maxPurchase: number | null;
  minPurchase: number | null;

  // variants
  // regardless the type of the product
  options?: Array<{
    // always all the siblings, other variants of the product, that customer can go to
    name: string;
    available: boolean;
    url: string;
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
    properties: Array<{
      groupId: string; // "a3eb3fbc88bb4cfea87a57e16e52dedf"
      code: string; // color, size
      label: string; // thistle, red, xl
    }>;
  }>;

  // images
  media: Array<{
    mimeType: string;
    position: number;
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
  }>;

  // reviews
  productReviews: Array<{
    reviewerName: string | null;
    reviewerEmail: string | null;
    points: number | null;
    content: string | null;
    title: string | null;
  }> | null;

  ratingAverage: number;
}
