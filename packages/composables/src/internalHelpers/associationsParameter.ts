import { EntityType } from "@shopware-pwa/commons/interfaces/internal/EntityType";

const PRODUCT = {
  media: {},
  options: {
    associations: {
      group: {},
    },
  },
  properties: {
    associations: {
      group: {},
    },
  },
  productReviews: {},
  manufacturer: {},
  children: {
    associations: {
      options: {
        associations: {
          group: {},
        },
      },
      seoUrls: {},
    },
  },
};

const PRODUCT_LISTING = {
  options: {},
  productReviews: {},
};

const CMS = {
  name: "options",
  associations: [
    {
      name: "group",
    },
  ],
};

const getProductDetailsAssociations = () => PRODUCT;

const getProductListingAssociations = () => PRODUCT_LISTING;

const getPageAssociations = () => CMS;

/**
 * Gets the right associations parameter for given entity type
 * @param entity
 */
export const getAssociationsForEntity = (entity: string): any => {
  if (!entity) {
    throw new Error(
      "getAssociationsForEntity: there is no entityType provided."
    );
  }

  switch (entity) {
    case EntityType.PRODUCT:
      return getProductDetailsAssociations();
    case EntityType.PRODUCT_LISTING:
      return getProductListingAssociations();
    case EntityType.CMS:
      return getPageAssociations();
    default:
      throw new Error(
        "getAssociationsForEntity: entityType is not recognizable."
      );
  }
};
