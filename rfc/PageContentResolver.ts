interface PageForHeadless {
  pageTypeId: Enumerator;
  pageType: string;
  data: CategoryPageForHeadless | ProductPageForHeadless;
}

interface CategoryPageForHeadless {
  CategoryCmsPage: CmsPage;
  availableFilters: AvailableFilters;
  availableSortings: AvailableSortings;
  categories: CategoryForHeadless[];
}

interface ProductPageForHeadless {
  ProductCmsPage: CmsPage;
  product: ProductForHeadless;
}

interface CategoryForHeadless {
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

interface ProductForCategoryHeadless {
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

interface ProductForHeadless {
  id: string;
  ean: string | null;
  productNumber: string;

  // whats the difference between calculated and not calculated prices?
  calculatedListingPrice: ListingPrice[];
  calculatedPrices: Price[];
  calculatedPrice: CalculatedPrice;
  price: Price[] | null;

  // variants handling?
  parentId: string | null;

  sortedProperties: PropertyGroup[] | null;
  isNew: boolean;

  // maybe endpoint can simply return an error instead of returning not-active products?
  active: boolean;

  taxId: string | null;
  manufacturerId: string | null;
  unitId: string | null;

  // what's a displayGroup?
  displayGroup: string;

  manufacturerNumber: string | null;

  stock: number;
  availableStock: number | null;
  available: boolean;
  deliveryTimeId: string | null;
  deliveryTime: DeliveryTime;
  restockTime: number;
  isCloseout: boolean | null;
  purchaseSteps: number | null;
  maxPurchase: number | null;
  minPurchase: number | null;
  purchaseUnit: number | null;
  referenceUnit: number | null;
  shippingFree: boolean | null;
  purchasePrice: number | null;
  markAsTopseller: boolean | null;
  weight: number | null;
  width: number | null;
  height: number | null;
  length: number | null;
  releaseDate: Date;
  categoryTree: [] | null;
  optionsIds: [] | null;
  propertyIds: [] | null;
  additionalText: string | null;
  name: string | null;
  keywords: string | null;
  description: string | null;
  metaTitle: string | null;
  packUnit: string | null;
  tax: Tax;
  manufacturer: ProductManufacturer | null;
  unit: Unit | null;
  prices: ProductPrice[];
  listingPrices: ListingPrice[] | null;
  cover: ProductMedia;
  parent: Product;
  children: Product[];
  media: ProductMedia[];
  translations: ProductTranslation[];
  categories: Category[];
  tags: Tag[];
  properties: PropertyGroupOption[] | null;
  options: PropertyGroupOption[] | null;
  categoriesRo: Category[] | null;
  coverId: string | null;
  customFields: CustomField[];
  tagIds: [] | null;
  productReviews: ProductReview[] | null;
  ratingAverage: number | null;
  extensions: [];

  parentVersionId: string;
  productManufacturerVersionId: string;
  productMediaVersiond: null;
}
