/**
 * A collection of performance set of includes parameters
 */

/**
 * Parameters for page resolver - aligned with getPage method of @shopware-pwa/shopware-6-client
 */
export const getPageIncludes = () => ({
  cms_page_slot: [
    "id",
    "type",
    "slot",
    "blockId",
    "data",
    "backgroundMediaMode",
    "backgroundMedia",
  ],
  cms_page_block: ["slots", "type", "id", "backgroundMedia", "sectionPosition"],
  cms_page_section: ["id", "backgroundMedia", "blocks", "type", "sizingMode"],
  cms_page: ["id", "name", "sections", "type", "config"],
  product: [
    "name",
    "ratingAverage",
    "calculatedPrice",
    "calculatedPrices",
    "cover",
    "id",
    "translated",
    "options",
  ],
  product_media: ["media"],
  media: ["url"],
  calculated_price: ["unitPrice"],
  product_group_option: ["name", "id", "group", "translated"],
  product_group: ["id", "name", "options", "translated"],
});
