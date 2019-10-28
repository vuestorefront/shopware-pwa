import { CmsPage } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";

interface PageForHeadless {
  pageTypeId: Enumerator;
  pageType: string;
  pathInfo: string;
  seoPathInfo: string;
  isCanonical: boolean;
  resourceIdentifier: string;
  data: CategoryPageHeadless | ProductPageHeadless;
}

interface CategoryPageHeadless {
  cmsPage: CmsPage;
  availableFilters: AvailableFilters;
  availableSortings: AvailableSortings;
  categories: CategoryForCategoryPageHeadless[];
}

interface ProductPageHeadless {
  cmsPage: CmsPage;
  product: ProductForHeadless;
}

interface Breadcrumb {
  name: string;
  path: string;
}

interface CategoryForCategoryPageHeadless {
  // basic category data
  id: string;
  name: string | null;
  description: string;
  childCount: number;
  // type: string;

  // structure in a tree
  parentId: string | null;
  breadcrumb: Breadcrumb[];
  level: number;

  // child categories and products
  children: CategoryForCategoryPageHeadless[] | null;
  products: ProductForCategoryPageHeadless[] | null;

  // how to handle cms pages?
  // cmsPageId: string | null;
  cmsPage: CmsPage | null;

  // I guess we do not need media on category level. More like on cms page level?
  //mediaId: string | null;
  //media: Media | null;
}

interface ProductForCategoryPageHeadless {
  // basic product data for category page
  id: string;
  name: string | null;
  description: string | null;

  // can we delete active and get only active products?
  active: boolean;

  // boolean labels to display
  available: boolean;
  isNew: boolean;
  isCloseout: boolean | null;
  shippingFree: boolean | null;
  markAsTopseller: boolean | null;

  // structure in a tree
  parentId: string | null;

  // whats the difference between calculated and not calculated prices?
  calculatedListingPrice: ListingPrice[];
  calculatedPrice: CalculatedPrice;
  price: Price[] | null;
  prices: ProductPrice[];
  listingPrices: ListingPrice[] | null;

  // thumbnail
  coverId: string | null;
  cover: ProductMedia;

  // star rating
  ratingAverage: number | null;
}

interface ProductForProductPageHeadless {
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
  manufacturerId: string | null;
  manufacturer: ProductManufacturer | null;

  unitId: string | null;
  unit: Unit | null;

  // labels
  isCloseout: boolean | null;
  shippingFree: boolean | null;
  markAsTopseller: boolean | null;
  isNew: boolean;

  // whats the difference between calculated and not calculated prices?
  calculatedListingPrice: ListingPrice[];
  calculatedPrices: Price[];
  calculatedPrice: CalculatedPrice;
  price: Price[] | null;
  taxId: string | null;
  tax: Tax;
  prices: ProductPrice[];
  listingPrices: ListingPrice[] | null;

  // parent categoryId?
  parentId: string | null;

  // what are sortedProperties?
  sortedProperties: PropertyGroup[] | null;

  // maybe endpoint can simply return an error instead of returning not-active products?
  active: boolean;

  // what's a displayGroup?
  displayGroup: string;

  // stocks
  stock: number;
  availableStock: number | null;
  available: boolean;

  // shipping
  deliveryTimeId: string | null;
  deliveryTime: DeliveryTime;

  // what are purchaseSteps?
  purchaseSteps: number | null;
  maxPurchase: number | null;
  minPurchase: number | null;
  purchaseUnit: number | null;

  // properties
  weight: number | null;
  width: number | null;
  height: number | null;
  length: number | null;

  // variants and proprties
  optionsIds: [] | null;
  propertyIds: [] | null;
  properties: PropertyGroupOption[] | null;
  options: PropertyGroupOption[] | null;
  parent: Product;
  children: Product[];

  // tags
  tagIds: [] | null;
  tags: Tag[];

  // images
  coverId: string | null;
  cover: ProductMedia;
  media: ProductMedia[];

  // reviews
  productReviews: ProductReview[] | null;
  ratingAverage: number | null;
}
