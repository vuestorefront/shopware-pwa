/**
 * A collection of performance set of includes parameters
 */

const PRODUCT = [
  "name",
  "ratingAverage",
  "calculatedPrice",
  "calculatedPrices",
  "cover",
  "id",
  "translated",
  "options",
];
const PRODUCT_MEDIA = ["media"];
const PRODUCT_GROUP = ["id", "name", "options", "translated"];
const PRODUCT_GROUP_OPTION = ["name", "id", "group", "translated"];
const PRODUCT_CALCULATED_PRICE = ["unitPrice"];
const MEDIA = ["url"];
const CMS_PAGE = ["id", "name", "sections", "type", "config"];
const CMS_PAGE_SECTION = [
  "id",
  "backgroundMedia",
  "blocks",
  "type",
  "sizingMode",
];
const CMS_PAGE_BLOCK = [
  "slots",
  "type",
  "id",
  "backgroundMedia",
  "sectionPosition",
];
const CMS_PAGE_SLOT = [
  "id",
  "type",
  "slot",
  "blockId",
  "data",
  "backgroundMediaMode",
  "backgroundMedia",
];

/**
 * Parameters for page resolver - aligned with getPage method of @shopware-pwa/shopware-6-client
 */
export const getPageIncludes = () => ({
  cms_page_slot: CMS_PAGE_SLOT,
  cms_page_block: CMS_PAGE_BLOCK,
  cms_page_section: CMS_PAGE_SECTION,
  cms_page: CMS_PAGE,
  product: PRODUCT,
  product_media: PRODUCT_MEDIA,
  media: MEDIA,
  calculated_price: PRODUCT_CALCULATED_PRICE,
  product_group_option: PRODUCT_GROUP_OPTION,
  product_group: PRODUCT_GROUP,
});

/**
 * Parameters for product listing - aligned with getCategoryProductsListing method of @shopware-pwa/shopware-6-client
 */
export const getProductListingIncludes = () => ({
  product: PRODUCT,
  product_media: PRODUCT_MEDIA,
  media: MEDIA,
  calculated_price: PRODUCT_CALCULATED_PRICE,
  product_group_option: PRODUCT_GROUP_OPTION,
  product_group: PRODUCT_GROUP,
});
