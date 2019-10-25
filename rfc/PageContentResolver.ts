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
  CategoryCmsPage: CmsPage;
  availableFilters: AvailableFilters;
  availableSortings: AvailableSortings;
  categories: CategoryForHeadless[];
}

interface ProductPageHeadless {
  ProductCmsPage: CmsPage;
  product: ProductForHeadless;
}

interface CategoryForCategoryPageHeadless {
  // basic category data
  id: string;
  name: string | null;
  description: string;
  childCount: number;
  type: string;

  // url to external resource if "category" is not a category but external link
  externalLink: string | null;

  // can we delete that field and include only visible categories in response?
  visible: boolean;
  // can we delete that field and include only active categories in response?
  active: boolean;

  // structure in a tree
  parentId: string | null;
  breadcrumb: string[];
  level: number;
  afterCategoryId: string | null;

  // child categories and products
  children: Category[] | null;
  products: Product[] | null;

  // what's that?
  displayNestedProducts: boolean;
  nestedProducts: Product[] | null;

  // how to handle cms pages?
  cmsPageId: string | null;
  cmsPage: CmsPage | null;

  // I guess we do not need media on category level. More like on cms page level?
  mediaId: string | null;
  media: Media | null;
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
