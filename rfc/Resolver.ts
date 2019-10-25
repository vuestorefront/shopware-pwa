import axios from "axios";
import { PageCriteria } from "./ResolverInterface";

/**
 * use case for specific category
 */
const getPageForHeadless = (params: PageCriteria) =>
  axios.post("/resolver", params);

const searchCriteria: PageCriteria = {
  path: "Kids-Toys/Health-Beauty",
  includes: ["products", "name"]
};

!(async () => {
  const { data } = await getPageForHeadless(searchCriteria);
  // here is an output of the query.
  // the includes parameter for associated products should be also handled on server-side, or prepare data models (take them from ./Resolver/PageContentResolver.ts)
  //
  // data = {
  //   pageTypeId: "category",
  //   pathInfo: "/navigation/03dfd5badd3d43bd8a345ef660761e09",
  //   seoPathInfo: "Kids-Toys/Health-Beauty",
  //   isCanonical: true,
  //   resourceIdentifier: "03dfd5badd3d43bd8a345ef660761e09",
  //   data: {
  //     availableSorting: [
  //       {
  //         field: "name",
  //         label: "Product name"
  //       },
  //       {
  //         price: "price",
  //         label: "Price"
  //       }
  //     ],
  //     availableFiltering: [
  //       {
  //         groupId: "a79e0b21158b4586bb8a5349d37cacf7",
  //         code: "size",
  //         label: "Size",
  //         type: "option",
  //         properties: [
  //           {
  //             id: "43231c2e5de1434a8bda2ddd0cd3239c",
  //             label: "Black"
  //           },
  //           {
  //             id: "c8c382b1e90748d2bb5719f456dc2cb9",
  //             label: "white"
  //           }
  //         ]
  //       },
  //       {
  //         groupId: "bfeb468ae333484fbce5a28d4064c960",
  //         code: "price",
  //         label: "Price",
  //         type: "range"
  //       }
  //     ],
  //     name: "Health & Beauty", // only name and products were in includes parameter
  //     products: [
  //       {
  //         "calculatedListingPrice": {},
  //         "calculatedPrices": [],
  //         "calculatedPrice": {},
  //         "sortedProperties": null,
  //         "isNew": false,
  //         "parentId": null,
  //         "childCount": 0,
  //         "autoIncrement": 46,
  //         "taxId": "cc3adb9eed9a4a4b9229acd4e67f1ec8",
  //         "manufacturerId": "8d86cc11ebd54306b1d8f7d2faaa833f",
  //         "unitId": null,
  //         "active": true,
  //         "displayGroup": "c32d8f279db1897716a783e2e3b1944f",
  //         "price": [
  //             {
  //                 "currencyId": "b7d2554b0ce847cd82f3ac9bd1c0dfca",
  //                 "net": 302.52100840336135,
  //                 "gross": 360,
  //                 "linked": true,
  //                 "extensions": []
  //             }
  //         ],
  //         "manufacturerNumber": null,
  //         "ean": null,
  //         "productNumber": "721d6d56b5084776861e60661d821ae7",
  //         "stock": 47,
  //         "availableStock": 47,
  //         "available": true,
  //         "deliveryTimeId": null,
  //         "deliveryTime": null,
  //         "restockTime": 3,
  //         "isCloseout": false,
  //         "purchaseSteps": 1,
  //         "maxPurchase": null,
  //         "minPurchase": 1,
  //         "purchaseUnit": null,
  //         "referenceUnit": null,
  //         "shippingFree": false,
  //         "purchasePrice": null,
  //         "markAsTopseller": null,
  //         "weight": null,
  //         "width": null,
  //         "height": null,
  //         "length": null,
  //         "releaseDate": null,
  //         "categoryTree": [
  //             "3f637f17cd9f4891a2d7625d19fb37c9"
  //         ],
  //         "optionIds": null,
  //         "propertyIds": [
  //             "06a7ed91305d47e1b7f3d6f7660c8316",
  //             "0bea5d5f73b046f88f7a27415969dce4",
  //             "1f0ae04b881342659d87c45ce68899c9",
  //             "2d5f5d19881a4b90afdde97fbe1a6527",
  //             "40af119c20a7428cadbc450a047c877e",
  //             "43231c2e5de1434a8bda2ddd0cd3239c",
  //             "50a5178bafdb4dfab3873575735d9099",
  //             "525cf9bcae5d4ee49386e6cb7f11bc96",
  //             "52e3c67cf79343deb2cf4dd84295989b",
  //             "59346f081ed849db9d03d92088a0a1f1",
  //             "6ab2226fd10345a3a8bfadc2d5a3bca4",
  //             "81d74b7492db4e9f9be0e897e99f9ffd",
  //             "872a36ad229f4a2bb747e8f504bd8d67",
  //             "a5f307eb50ed48e3963988787bbfcb74",
  //             "c7cba0fd0f0242a0afd57715a4e42fd0",
  //             "ce0d7c8cccae452aaa5e78265c28dccb",
  //             "d6207bc795c24a958441200528505649",
  //             "d9231ebabf5e4e5e8695e5e5f5c9d717"
  //         ],
  //         "additionalText": null,
  //         "name": "Synergistic Paper Britchies",
  //         "keywords": null,
  //         "description": "Eum ea nihil autem quia odio. Optio ut placeat modi voluptate et voluptatem consequatur veritatis.",
  //         "metaTitle": null,
  //         "packUnit": null,
  //         "variantRestrictions": null,
  //         "configuratorGroupConfig": null,
  //         "tax": {},
  //         "manufacturer": null,
  //         "unit": null,
  //         "prices": [],
  //         "listingPrices": [],
  //         "cover": null,
  //         "parent": null,
  //         "children": null,
  //         "media": null,
  //         "searchKeywords": null,
  //         "translations": null,
  //         "categories": null,
  //         "tags": null,
  //         "properties": null,
  //         "options": null,
  //         "configuratorSettings": null,
  //         "categoriesRo": null,
  //         "coverId": "7c8a5bc4c8b841e0bc363ab08c890059",
  //         "blacklistIds": null,
  //         "whitelistIds": null,
  //         "customFields": null,
  //         "visibilities": null,
  //         "tagIds": null,
  //         "productReviews": null,
  //         "ratingAverage": null,
  //         "mainCategories": null,
  //         "_uniqueIdentifier": "f7efff51718d4592b6d655b83d16f1db",
  //         "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
  //         "translated": {
  //             "additionalText": null,
  //             "name": "Synergistic Paper Britchies",
  //             "keywords": null,
  //             "description": "Eum ea nihil autem quia odio. Optio ut placeat modi voluptate et voluptatem consequatur veritatis.",
  //             "metaTitle": null,
  //             "packUnit": null,
  //             "customFields": []
  //         },
  //         "createdAt": "2019-10-08T09:42:16+00:00",
  //         "updatedAt": null,
  //         "extensions": [],
  //         "id": "f7efff51718d4592b6d655b83d16f1db",
  //         "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
  //         "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
  //         "productMediaVersionId": null
  //     }
  //     ]
  //   }
  // }
})();

/**
 * use case for specific product
 */
const resolveProductCriteria: PageCriteria = {
  path: "Aerodynamic-Iron-Jetsilk/eea0f69ec02d44f7a4224272b3d99478",
  includes: ["price", "name", "stock", "properties"]
};

!(async () => {
  const { data } = await getPageForHeadless(resolveProductCriteria);
  // here is an output of the query.
  // it discovers a type and returnes data for specific product for provided path

  // data = {
  //   pageTypeId: "product",
  //   pathInfo: "/detail/044a190a54ab4f06803909c3ee8063ef",
  //   seoPathInfo: "Aerodynamic-Iron-Jetsilk/044a190a54ab4f06803909c3ee8063ef",
  //   isCanonical: true,
  //   resourceIdentifier: "044a190a54ab4f06803909c3ee8063ef",
  //   data: {
  //     price: 141.46,
  //     name: "Aerodynamic Iron Jetsilk",
  //     stock: 16,
  //     properties: [
  //       {
  //           "groupId": "a79e0b21158b4586bb8a5349d37cacf7",
  //           "name": "8 mm",
  //           "position": 1,
  //           "colorHexCode": null,
  //           "mediaId": null,
  //           "group": null,
  //           "translations": null,
  //           "productConfiguratorSettings": null,
  //           "productProperties": null,
  //           "productOptions": null,
  //           "media": null,
  //           "customFields": null,
  //           "_uniqueIdentifier": "003a81c935674e90a48eb0a52a6575dc",
  //           "versionId": null,
  //           "translated": {
  //               "name": "8 mm",
  //               "position": 1,
  //               "customFields": []
  //           },
  //           "createdAt": "2019-10-08T09:42:14+00:00",
  //           "updatedAt": null,
  //           "extensions": [],
  //           "id": "003a81c935674e90a48eb0a52a6575dc"
  //       },
  //       {
  //           "groupId": "a73f47ebd9f541bd9fb9f037bc399cf8",
  //           "name": "12 mm",
  //           "position": 1,
  //           "colorHexCode": null,
  //           "mediaId": null,
  //           "group": null,
  //           "translations": null,
  //           "productConfiguratorSettings": null,
  //           "productProperties": null,
  //           "productOptions": null,
  //           "media": null,
  //           "customFields": null,
  //           "_uniqueIdentifier": "0a4ff74816154e7fa1ba043d35b46014",
  //           "versionId": null,
  //           "translated": {
  //               "name": "12 mm",
  //               "position": 1,
  //               "customFields": []
  //           },
  //           "createdAt": "2019-10-08T09:42:14+00:00",
  //           "updatedAt": null,
  //           "extensions": [],
  //           "id": "0a4ff74816154e7fa1ba043d35b46014"
  //       }
  //     ]
  //   }
  // }
})();
