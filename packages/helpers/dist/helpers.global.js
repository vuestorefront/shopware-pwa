var helpers = (function (exports) {
  'use strict';

  /**
   * gets the cover image
   */
  function getProductMainImageUrl({ product } = {}) {
      return (product && product.cover && product.cover.media && product.cover.media.url);
  }

  function getProductMediaGallery({ product } = {}) {
      return product && product.media
          ? product.media.map(media => {
              const smallThumb = media.media &&
                  media.media.thumbnails &&
                  media.media.thumbnails.find(thumb => thumb.width == "400");
              const normalThumb = media.media &&
                  media.media.thumbnails &&
                  media.media.thumbnails.find(thumb => thumb.width == "800");
              const bigThumb = media.media &&
                  media.media.thumbnails &&
                  media.media.thumbnails.find(thumb => thumb.width == "1920");
              return {
                  small: { url: smallThumb ? smallThumb.url : "" },
                  normal: { url: normalThumb ? normalThumb.url : "" },
                  big: { url: bigThumb ? bigThumb.url : "" }
              };
          })
          : [];
  }

  function getProductOptions({ product, attribute } = {}) {
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

  function getProductProperties({ product } = {}) {
      if (!product || !product.properties) {
          return [];
      }
      const propertyList = product.properties.map(property => ({
          name: property.group ? property.group.name || "" : "",
          value: property.name
      }));
      return propertyList;
  }

  function getProductReviews({ product } = {}) {
      if (!product || !product.productReviews) {
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

  function getProductOption({ product, attribute } = {}) {
      return (product &&
          product.options &&
          product.options.find(option => option.group && option.group.name === attribute));
  }

  function getProductRegularPrice({ product } = {}) {
      return product && product.price ? product.price[0].gross : 0;
  }

  function isProductSimple({ product } = {}) {
      return product ? !!product.parentId : false;
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
