var helpers = (function (exports) {
  'use strict';

  /**
   * gets the cover image
   */
  function getProductMainImageUrl(params) {
      const { product } = params;
      return (product && product.cover && product.cover.media) ? product.cover.media.url : null;
  }

  function getProductMediaGallery(params) {
      const { product } = params;
      return product && product.media ? product.media.map(media => {
          const smallThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "400");
          const normalThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "800");
          const bigThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "1920");
          return {
              small: { url: smallThumb ? smallThumb.url : "" },
              normal: { url: normalThumb ? normalThumb.url : "" },
              big: { url: bigThumb ? bigThumb.url : "" }
          };
      }) : [];
  }

  function getProductOptions(params) {
      const { product, attribute } = params;
      if (!product || !product.children || !attribute) {
          return [];
      }
      const typeOptions = new Map();
      product.children.forEach(variant => {
          if (!variant || !variant.options || !variant.options.length) {
              return;
          }
          for (let option of variant.options) {
              if (option.group && option.group.name === attribute) {
                  if (!typeOptions.has(option.id)) {
                      typeOptions.set(option.id, {
                          label: option.name,
                          value: variant.id,
                          [attribute]: option.name
                      });
                  }
              }
          }
      });
      return Array.from(typeOptions.values());
  }

  function getProductProperties(params) {
      const { product } = params;
      if (!product.properties) {
          return [];
      }
      const propertyList = product.properties.map(property => ({
          name: property.group ? (property.group.name || "") : "",
          value: property.name
      }));
      return propertyList;
  }

  function getProductReviews(params) {
      const { product } = params;
      if (!product.productReviews) {
          return [];
      }
      return product.productReviews.map(({ id, externalUser, customerId, createdAt, content, points }) => ({
          id,
          author: externalUser ? externalUser : customerId,
          date: createdAt,
          message: content,
          rating: points
      }));
  }

  function getProductOption(params) {
      const { product, attribute } = params;
      return product.options && product.options.find(option => option.group && option.group.name === attribute);
  }

  function getProductRegularPrice(params) {
      const { product } = params;
      return product.price ? product.price[0].gross : 0;
  }

  function isProductSimple(params) {
      const { product } = params;
      return !!product.parentId;
  }

  exports.getProductMainImageUrl = getProductMainImageUrl;
  exports.getProductMediaGallery = getProductMediaGallery;
  exports.getProductOption = getProductOption;
  exports.getProductOptions = getProductOptions;
  exports.getProductProperties = getProductProperties;
  exports.getProductRegularPrice = getProductRegularPrice;
  exports.getProductReviews = getProductReviews;
  exports.isProductSimple = isProductSimple;

  return exports;

}({}));
