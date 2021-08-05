import { isArray, mergeWith, set, get } from "lodash";
import { ApiDefaults } from "@shopware-pwa/commons";
function _customizer(objValue: Object, srcValue: string[]) {
  if (isArray(objValue)) {
    return [...new Set([...objValue, ...srcValue])];
  }
}

const defaultConfig: ApiDefaults = {
  useCms: {
    limit: 10,
    associations: {
      manufacturer: {
        associations: {
          media: {},
        },
      },
      media: {
        sort: [
          {
            field: "position",
            order: "ASC",
            naturalSorting: false,
          },
        ],
      },
      productReviews: {},
      crossSellings: {
        associations: {
          assignedProducts: {
            associations: {
              product: {
                associations: {
                  media: {},
                  cover: {},
                  seoUrls: {},
                },
              },
            },
          },
        },
      },
      properties: {
        associations: {
          group: {},
        },
      },
    },
    includes: {
      cms_page_slot: [
        "id",
        "type",
        "slot",
        "blockId",
        "config",
        "data",
        "backgroundMediaMode",
        "backgroundMedia",
      ],
      cms_page_block: [
        "slots",
        "type",
        "id",
        "backgroundColor",
        "backgroundMedia",
        "sectionPosition",
      ],
      cms_page_section: [
        "id",
        "backgroundMedia",
        "blocks",
        "type",
        "sizingMode",
      ],
      cms_page: ["id", "name", "sections", "type", "config"],
      product: [
        "media",
        "productReviews",
        "name",
        "description",
        "ratingAverage",
        "calculatedPrice",
        "calculatedPrices",
        "calculatedListingPrice",
        "cover",
        "parentId",
        "id",
        "translated",
        "optionIds",
        "properties",
        "manufacturer",
        "seoUrls",
        "crossSellings",
        "availableStock",
        "customFields",
        "stock",
      ],
      product_media: ["media"],
      media: ["thumbnails", "width", "height", "url"],
      media_thumbnail: ["url", "width", "height", "id"],
      calculated_price: ["unitPrice", "quantity", "listPrice"],
      product_group_option: ["id", "group", "translated", "name"],
      product_group: ["id", "translated", "name"],
      product_listing: [
        "sorting",
        "currentFilters",
        "elements",
        "page",
        "limit",
        "sortings",
        "availableSortings",
        "total",
        "aggregations",
      ],
      property_group: ["id", "translated", "options", "name"],
      property_group_option: [
        "translated",
        "name",
        "id",
        "colorHexCode",
        "media",
        "group",
      ],
      product_manufacturer: ["translated", "link", "name"],
    },
  },
  useProductListing: {
    limit: 10,
    includes: {
      product: [
        "name",
        "ratingAverage",
        "calculatedPrice",
        "calculatedPrices",
        "calculatedListingPrice",
        "cover",
        "id",
        "translated",
        "options",
        "seoUrls",
      ],
      product_media: ["media"],
      media: ["thumbnails", "width", "height", "url"],
      calculated_price: ["unitPrice", "quantity", "listPrice"],
      product_group_option: ["name", "id", "group", "translated"],
      product_group: ["id", "name", "options", "translated"],
      property_group: ["id", "translated", "options", "name"],
      property_group_option: [
        "translated",
        "name",
        "id",
        "colorHexCode",
        "media",
        "group",
      ],
    },
  },
  useProductQuickSearch: {
    limit: 10,
    includes: {
      calculated_price: ["unitPrice", "quantity", "listPrice"],
    },
  },
  useListing: {
    limit: 10,
    includes: {
      product: [
        "name",
        "ratingAverage",
        "calculatedPrice",
        "calculatedPrices",
        "calculatedListingPrice",
        "cover",
        "id",
        "translated",
        "options",
        "seoUrls",
      ],
      product_media: ["media"],
      media: ["thumbnails", "width", "height", "url"],
      calculated_price: ["unitPrice", "quantity", "listPrice"],
      product_group_option: ["name", "id", "group", "translated"],
      product_group: ["id", "name", "options", "translated"],
      property_group: ["id", "translated", "options", "name"],
      property_group_option: [
        "name",
        "translated",
        "id",
        "colorHexCode",
        "media",
        "group",
      ],
    },
  },
  useProduct: {
    associations: {
      crossSellings: {
        associations: {
          assignedProducts: {
            associations: {
              product: {
                associations: {
                  media: {},
                  cover: {},
                  seoUrls: {},
                },
              },
            },
          },
        },
      },
      media: {
        sort: [
          {
            field: "position",
            order: "ASC",
            naturalSorting: false,
          },
        ],
      },
    },
    includes: {
      product: [
        "name",
        "ratingAverage",
        "calculatedPrice",
        "calculatedPrices",
        "calculatedListingPrice",
        "cover",
        "id",
        "parentId",
        "translated",
        "media",
        "seoUrls",
        "crossSellings",
        "availableStock",
        "customFields",
      ],
      product_media: ["media"],
      media: ["url"],
      media_thumbnail: ["url", "width", "height", "id"],
      calculated_price: ["unitPrice", "quantity", "listPrice"],
      product_group_option: ["name", "id", "group", "translated"],
      product_group: ["id", "name", "translated"],
    },
  },
  useNavigation: {
    associations: {
      seoUrls: {},
    },
    includes: {
      category: [
        "seoUrls",
        "externalLink",
        "name",
        "id",
        "children",
        "translated",
        "type",
      ],
      seo_url: ["pathInfo", "seoPathInfo"],
    },
  },
};

function _getDefaultConfig() {
  return JSON.parse(JSON.stringify(defaultConfig));
}

let finalConfig = _getDefaultConfig();
export default function defaultsConfigBuilder() {
  return {
    /**
     * Add value to existing config. Objects and arrays are merged recursively.
     * Primitives are overridden (example limit property).
     */
    add: (key: string, config: unknown) => {
      const property = get(finalConfig, key);
      if (Array.isArray(property) && !Array.isArray(config)) {
        mergeWith(property, [config], _customizer);
      } else {
        mergeWith(property, config, _customizer);
      }
      return defaultsConfigBuilder();
    },
    /**
     * Replace config for specific key with given value.
     */
    replace(key: string, value: unknown) {
      set(finalConfig, key, value);
      return defaultsConfigBuilder();
    },
    /**
     * Remove config value for specific key.
     */
    remove(key: string, value?: unknown) {
      if (value) {
        const property = get(finalConfig, key);
        if (Array.isArray(property)) {
          const newValue = property.filter((item) => item !== value);
          set(finalConfig, key, newValue);
        }
      } else {
        set(finalConfig, key, undefined);
      }
      return defaultsConfigBuilder();
    },
    /**
     * Reset the config to the default. Do not use this method unless you know what you are doing.
     */
    _resetToDefault: () => {
      finalConfig = _getDefaultConfig();
    },
    /**
     * Get config for specific key. If not specified whole config will be returned.
     */
    get: (key?: string) => {
      return key ? get(finalConfig, key) : finalConfig;
    },
  };
}
