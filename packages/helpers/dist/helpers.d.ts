import { CmsPage } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { CmsSection } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { NavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { PropertyGroupOption } from "@shopware-pwa/commons/interfaces/models/content/property/PropertyGroupOption";
import { Salutation } from "@shopware-pwa/commons/interfaces/models/system/salutation/Salutation";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ShopwareError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { UiMediaGalleryItem as UiMediaGalleryItem_2 } from "@shopware-pwa/helpers";
import { UiProductOption as UiProductOption_2 } from "@shopware-pwa/helpers";
import { UiProductProperty as UiProductProperty_2 } from "@shopware-pwa/helpers";
import { UiProductReview as UiProductReview_2 } from "@shopware-pwa/helpers";

/**
 * @alpha
 */
export declare interface CategoryFilterEntityValue {
  name: string;
  description: string | null;
  customFields: any;
}

/**
 * @alpha
 */
export declare interface CategoryFilterEntityValues {
  [valueId: string]: CategoryFilterEntityValue;
}

/**
 * @alpha
 */
export declare interface CategoryFilterRangeValues {
  max: string;
  min: string;
}

/**
 * @alpha
 */
export declare interface CategoryFilterTermValue {
  key: string;
  count: number;
  extensions: any;
}

/**
 * @alpha
 */
export declare function exportUrlQuery(
  searchCriteria: SearchCriteria
): string | undefined;

declare interface Filter {
  [filterCode: string]: {
    type: UiCategoryFilterType;
    name: string;
    values:
      | CategoryFilterRangeValues
      | CategoryFilterEntityValues
      | CategoryFilterTermValue[];
  };
}

/**
 * @alpha
 */
export declare function getCategoryAvailableFilters({
  filters,
}?: {
  filters?: Filter;
}): UiCategoryFilter[];

/**
 * @alpha
 */
export declare function getCategoryAvailableSorting({
  sorting,
}?: {
  sorting?: Sorting;
}): UiCategorySorting[];

/**
 * @alpha
 */
export declare function getCmsSections(content: CmsPage): CmsSection[];

/**
 * @alpha
 */
export declare const getFilterSearchCriteria: (selectedFilters: any) => any[];

/**
 * @alpha
 * Get the messages from the API response (array of ShopwareErrors)
 */
export declare function getMessagesFromErrorsArray(
  errors: ShopwareError[]
): string[];

/**
 * @alpha
 */
export declare function getNavigationRoutes(
  navigationElements: NavigationElement[]
): NavigationRoute[];

/**
 * gets the cover image
 *
 * @alpha
 */
export declare function getProductMainImageUrl(product: Product): string;

/**
 * @alpha
 */
export declare function getProductMediaGallery({
  product,
}?: {
  product?: Product;
}): UiMediaGalleryItem_2[];

/**
 * @alpha
 */
export declare function getProductName({
  product,
}?: {
  product?: Product;
}): string | null;

/**
 * @alpha
 */
export declare function getProductOption({
  product,
  attribute,
}?: {
  product?: Product;
  attribute?: string;
}): PropertyGroupOption | undefined;

/**
 * @alpha
 */
export declare function getProductOptions({
  product,
}?: {
  product?: Product;
}): ProductOptions;

/**
 * @alpha
 */
export declare function getProductOptionsUrl({
  product,
  options,
}?: {
  product?: Product;
  options?: string[];
}): string;

/**
 * @alpha
 */
export declare function getProductProperties({
  product,
}?: {
  product?: Product;
}): UiProductProperty_2[];

/**
 * @alpha
 */
export declare function getProductRegularPrice({
  product,
}?: {
  product?: Product;
}): number;

/**
 * @alpha
 */
export declare function getProductReviews({
  product,
}?: {
  product?: Product;
}): UiProductReview_2[];

/**
 * @alpha
 */
export declare function getProductSpecialPrice(product: Product): number;

/**
 * @alpha
 */
export declare function getProductUrl(product: Product | null): string;

/**
 * @alpha
 */
export declare const getSortingLabel: (sorting: SwSorting) => string;

/**
 * @alpha
 */
export declare const getSortingSearchCriteria: (
  selectedSorting: SwSorting
) => Sort;

/**
 * @alpha
 */
export declare function getVariantOptionsLabel({
  product,
}?: {
  product?: Product;
}): string | null;

/**
 * @alpha
 */
export declare function isProductSimple({
  product,
}?: {
  product?: Product;
}): boolean;

/**
 * Map available countries to (`name`: string | null, id: `string`) format
 *
 * @returns MappedCountries
 * @alpha
 **/
export declare function mapCountries(countries: Country[]): MappedCountry[];

/**
 * @alpha
 */
export declare interface MappedCountry {
  name: string | null;
  id: string;
}

/**
 * @alpha
 */
export declare interface MappedSalutation {
  name: string | null;
  id: string;
}

/**
 * Map available salutations to (`name`: string, `id`: string) format
 *
 * @returns MappedSalutations
 * @alpha
 **/
export declare function mapSalutations(
  salutations: Salutation[]
): MappedSalutation[];

declare interface NavigationRoute {
  routeLabel: string;
  routePath: string;
}

/**
 * @alpha
 */
export declare function parseUrlQuery(query: any): SearchCriteria;

declare interface ProductOptions {
  [attribute: string]: UiProductOption_2[];
}

declare interface Sorting {
  [sortingCode: string]: {
    key: string;
    active: boolean;
  };
}

/**
 * @alpha
 */
export declare interface SwSorting {
  name: string;
  active: boolean;
  field: string;
  order: string;
}

/**
 * @alpha
 */
export declare interface UiCategoryFilter {
  name: string;
  type: UiCategoryFilterType;
  options: UiCategoryFilterOption[] | UiCategoryRangeFilterOption | any;
}

/**
 * @alpha
 */
export declare interface UiCategoryFilterOption {
  color: boolean | string;
  label: string;
  value: string;
  count?: number;
}

/**
 * @alpha
 */
export declare enum UiCategoryFilterType {
  range = "range",
  term = "term",
  max = "max",
  entity = "entity",
}

/**
 * @alpha
 */
export declare interface UiCategoryRangeFilterOption {
  max: string;
  min: string;
}

/**
 * @alpha
 */
export declare interface UiCategorySorting {
  name: string;
  active: boolean;
  field: string;
  order: string;
}

/**
 * @alpha
 */
export declare interface UiMediaGalleryItem {
  icon: UiMediaGalleryItemUrl;
  mobile: UiMediaGalleryItemUrl;
  desktop: UiMediaGalleryItemUrl;
}

/**
 * @alpha
 */
export declare interface UiMediaGalleryItemUrl {
  url: string;
}

/**
 * @alpha
 */
export declare interface UiProductOption {
  label: string;
  value: string;
  code: string;
  attribute: string;
  [attribute: string]: string;
}

/**
 * @alpha
 */
export declare interface UiProductProperty {
  name: string;
  value: string | null;
}

/**
 * @alpha
 */
export declare interface UiProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

export {};
