import queryString from "query-string";

/**
 * gets the cover image
 *
 * @alpha
 */
function getProductMainImageUrl(product) {
  var _a, _b, _c, _d, _e;
  return (
    ((_c =
      (_b = (_a = product) === null || _a === void 0 ? void 0 : _a.cover) ===
        null || _b === void 0
        ? void 0
        : _b.media) === null || _c === void 0
      ? void 0
      : _c.url) ||
    ((_e = (_d = product) === null || _d === void 0 ? void 0 : _d.cover) ===
      null || _e === void 0
      ? void 0
      : _e.url) ||
    ""
  );
}

/**
 * @alpha
 */
function getProductMediaGallery({ product } = {}) {
  return product && product.media
    ? product.media.map((media) => {
        const smallThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "400");
        const normalThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "800");
        const bigThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "1920");
        return {
          icon: { url: smallThumb ? smallThumb.url : media.media.url },
          mobile: { url: normalThumb ? normalThumb.url : media.media.url },
          desktop: { url: bigThumb ? bigThumb.url : media.media.url },
        };
      })
    : [];
}

/**
 * @alpha
 */
function getProductOptions({ product } = {}) {
  var _a, _b;
  let typeOptions = {};
  (_b = (_a = product) === null || _a === void 0 ? void 0 : _a.children) ===
    null || _b === void 0
    ? void 0
    : _b.forEach((variant) => {
        var _a, _b, _c;
        if (
          !((_b =
            (_a = variant) === null || _a === void 0 ? void 0 : _a.options) ===
            null || _b === void 0
            ? void 0
            : _b.length)
        ) {
          return;
        }
        for (let option of variant.options) {
          if (
            (_c = option.group) === null || _c === void 0 ? void 0 : _c.name
          ) {
            if (!typeOptions.hasOwnProperty(option.group.name)) {
              typeOptions[option.group.name] = [];
            }
            if (
              !typeOptions[option.group.name].find(
                (valueOption) => option.id == valueOption.code
              )
            ) {
              typeOptions[option.group.name].push({
                label: option.name,
                code: option.id,
                value: option.name,
              });
            }
          }
        }
      });
  return typeOptions;
}

/**
 * @alpha
 */
function getProductProperties({ product } = {}) {
  var _a, _b;
  const propertyList =
    (_b = (_a = product) === null || _a === void 0 ? void 0 : _a.properties) ===
      null || _b === void 0
      ? void 0
      : _b.map((property) => {
          var _a;
          return {
            name:
              ((_a = property.group) === null || _a === void 0
                ? void 0
                : _a.name) || "",
            value: property.name,
          };
        });
  return propertyList || [];
}

/**
 * @alpha
 */
function getProductReviews({ product } = {}) {
  if (!product || !product.productReviews) {
    return [];
  }
  return product.productReviews.map(
    ({ id, externalUser, customerId, createdAt, content, points }) => ({
      id,
      author: externalUser ? externalUser : customerId,
      date: createdAt,
      message: content,
      rating: points,
    })
  );
}

/**
 * @alpha
 */
function getProductOption({ product, attribute } = {}) {
  var _a, _b;
  return (_b =
    (_a = product) === null || _a === void 0 ? void 0 : _a.options) === null ||
    _b === void 0
    ? void 0
    : _b.find((option) => option.group && option.group.name === attribute);
}

/**
 * @alpha
 */
function getProductRegularPrice({ product } = {}) {
  var _a, _b, _c;
  return (
    ((_c =
      (_b = (_a = product) === null || _a === void 0 ? void 0 : _a.price) ===
        null || _b === void 0
        ? void 0
        : _b[0]) === null || _c === void 0
      ? void 0
      : _c.gross) || 0
  );
}

/**
 * @alpha
 */
function getProductSpecialPrice(product) {
  var _a, _b, _c;
  const price =
    (_c =
      (_b =
        (_a = product) === null || _a === void 0
          ? void 0
          : _a.calculatedPrices) === null || _b === void 0
        ? void 0
        : _b[0]) === null || _c === void 0
      ? void 0
      : _c.unitPrice;
  return price || 0;
}

/**
 * @alpha
 */
function isProductSimple({ product } = {}) {
  var _a;
  return (
    !!((_a = product) === null || _a === void 0 ? void 0 : _a.parentId) &&
    product.id !== product.parentId
  );
}

/**
 * @alpha
 */
function getProductUrl(product) {
  if (!product) return "/";
  // TODO change after fixing URL resolver
  // const seoUrl =
  //   product.seoUrls &&
  //   product.seoUrls.length &&
  //   product.seoUrls[0].seoPathInfo;
  // return seoUrl ? `/${seoUrl}` : `/detail/${product.id}`;
  return `/detail/${product.id}`;
}

/**
 * @alpha
 */
function getProductOptionsUrl({ product, options } = {}) {
  if (!product) return "";
  const variant =
    options &&
    product.children &&
    product.children
      .filter(
        (variant) =>
          variant.optionIds &&
          variant.optionIds.every((optionId) => options.includes(optionId))
      )
      .shift();
  const result = variant || product;
  return getProductUrl(result);
}

/**
 * @alpha
 */
function getVariantOptionsLabel({ product } = {}) {
  if (
    !product ||
    !product.options ||
    (product.options && !product.options.length)
  ) {
    return null;
  }
  let variantLabel = "";
  for (let { name } of product.options) {
    variantLabel += `${name} `;
  }
  return variantLabel.trim();
}

/**
 * @alpha
 */
function getProductName({ product } = {}) {
  if (!product) {
    return null;
  }
  const variantLabel = getVariantOptionsLabel({ product: product });
  return `${product.translated.name}${
    variantLabel ? " - " + variantLabel : ""
  }`;
}

/**
 * @alpha
 */
var UiCategoryFilterType;
(function (UiCategoryFilterType) {
  UiCategoryFilterType["range"] = "range";
  UiCategoryFilterType["term"] = "term";
  UiCategoryFilterType["max"] = "max";
  UiCategoryFilterType["entity"] = "entity";
})(UiCategoryFilterType || (UiCategoryFilterType = {}));

const convertTermFilterValues = (values) => {
  return values.map(({ key, count }) => ({
    value: key,
    label: key,
    count: count,
  }));
};
const convertEntityFilterValues = (values, isColor) => {
  return !values
    ? []
    : Object.entries(values).map(([valueId, { name }]) => {
        let filterValue = {
          value: valueId,
          label: name,
        };
        if (isColor) {
          filterValue = Object.assign({}, filterValue, { color: name });
        }
        return filterValue;
      });
};
const convertOptionsByType = ({ type, values, isColor }) => {
  switch (type) {
    case UiCategoryFilterType.term:
      return convertTermFilterValues(values);
    case UiCategoryFilterType.entity:
      return convertEntityFilterValues(values, isColor);
    default:
      return values;
  }
};
/**
 * @alpha
 */
function getCategoryAvailableFilters({ filters } = {}) {
  if (!filters) {
    return [];
  }
  const filtersTransformed = Object.entries(filters).map(
    ([filterCode, { name, values, type }]) => ({
      name: name || filterCode,
      type: type,
      options: convertOptionsByType({
        type,
        values,
        isColor: filterCode === "color",
      }),
    })
  );
  return filtersTransformed;
}

/**
 * @alpha
 */
function getCategoryAvailableSorting({ sorting } = {}) {
  if (!sorting) {
    return [];
  }
  const sortingTransformed = Object.entries(sorting).map(
    ([sortingCode, { active }]) => ({
      name: sortingCode,
      active: active,
      field: sortingCode.split("-")[0],
      order: sortingCode.split("-")[1],
    })
  );
  return sortingTransformed;
}

/**
 * Map available countries to (`name`: string | null, id: `string`) format
 *
 * @returns MappedCountries
 * @alpha
 **/
function mapCountries(countries) {
  var _a;
  if (!((_a = countries) === null || _a === void 0 ? void 0 : _a.length))
    return [];
  const mappedCountries = countries.map((country) => ({
    name: country.name,
    id: country.id,
  }));
  return mappedCountries.filter((country) => country.name !== null);
}

/**
 * @alpha
 */
function getCmsSections(content) {
  var _a;
  return (
    ((_a = content) === null || _a === void 0 ? void 0 : _a.sections) || []
  );
}

/**
 * @alpha
 */
function parseUrlQuery(query) {
  const searchCriteria = {};
  if (!query || typeof query !== "object") {
    return searchCriteria;
  }
  Object.keys(query).forEach((key) => {
    searchCriteria[key] =
      typeof query[key] === "string" ? JSON.parse(query[key]) : query[key];
  });
  return searchCriteria;
}
/**
 * @alpha
 */
function exportUrlQuery(searchCriteria) {
  if (!searchCriteria) {
    return;
  }
  const sC = searchCriteria;
  const query = {};
  Object.keys(searchCriteria).forEach((key) => {
    query[key] = JSON.stringify(sC[key]);
  });
  return queryString.stringify(query);
}

var SearchFilterType;
(function (SearchFilterType) {
  SearchFilterType["EQUALS"] = "equals";
  SearchFilterType["CONTAINS"] = "contains";
  SearchFilterType["EQUALS_ANY"] = "equalsAny";
  SearchFilterType["NOT"] = "not";
  SearchFilterType["MULTI"] = "multi";
  SearchFilterType["RANGE"] = "range";
})(SearchFilterType || (SearchFilterType = {}));

const createMultiFilter = (operator, queries) => ({
  type: SearchFilterType.MULTI,
  operator: operator,
  queries: queries,
});
const createRangeFilter = (filterData, field) => ({
  type: SearchFilterType.RANGE,
  field: field,
  parameters: filterData,
});
const createEqualsFilter = (value, field) => ({
  type: SearchFilterType.EQUALS,
  field,
  value,
});
const createEqualsAnyFilter = (value, field = "propertyIds") => ({
  type: SearchFilterType.EQUALS_ANY,
  field,
  value,
});
/**
 * Get the right filter format depending on filter's code
 */
const extractFilter = (filterCode, filterData) => {
  let extractedFilter = null;
  switch (filterCode) {
    case "price":
      extractedFilter = createRangeFilter(filterData, filterCode);
      break;
    case "shipping-free":
      extractedFilter = createEqualsFilter(filterData, filterCode);
      break;
    case "categoryTree":
      extractedFilter = createEqualsFilter(
        filterData.shift(),
        "product.categoriesRo.id"
      );
      break;
    case "manufacturer":
      extractedFilter = createEqualsAnyFilter(filterData, "manufacturerId");
      break;
    default:
      const subFilters = [];
      subFilters.push(createEqualsAnyFilter(filterData));
      // passed propertyIds could be also interpreted as optionIds
      subFilters.push(createEqualsAnyFilter(filterData, "optionIds"));
      extractedFilter = createMultiFilter("OR", subFilters);
  }
  return extractedFilter;
};
/**
 * @alpha
 */
const getFilterSearchCriteria = (selectedFilters) => {
  const filters = [];
  if (!selectedFilters) {
    return filters;
  }
  for (const filterName of Object.keys(selectedFilters)) {
    // if (!selectedFilters[filterName].length && typeof selectedFilters[filterName] !== "boolean" && !selectedFilters[filterName].hasOwnProperty('gte')) {
    //   continue;
    // }
    filters.push(extractFilter(filterName, selectedFilters[filterName]));
  }
  return filters;
};
/**
 * @alpha
 */
const getSortingSearchCriteria = (selectedSorting) => {
  if (!selectedSorting) {
    return {};
  }
  return {
    field: selectedSorting.field,
    desc: selectedSorting.order === "desc",
  };
};
/**
 * @alpha
 */
const getSortingLabel = (sorting) => {
  if (!sorting || !sorting.order || !sorting.field) {
    return "";
  }
  const ascLabel = `▲`;
  const descLabel = `▼`;
  const label = sorting.order === "desc" ? descLabel : ascLabel;
  return `${sorting.field} ${label}`;
};

/**
 * @alpha
 */
function getNavigationRoutes(navigationElements) {
  return navigationElements.map((element) => ({
    routeLabel: element.name,
    routePath:
      element.route.path.charAt(0) !== "/"
        ? `/${element.route.path}`
        : element.route.path,
    children: element.children && getNavigationRoutes(element.children),
  }));
}

/**
 * Map available salutations to (`name`: string, `id`: string) format
 *
 * @returns MappedSalutations
 * @alpha
 **/
function mapSalutations(salutations) {
  var _a;
  if (!((_a = salutations) === null || _a === void 0 ? void 0 : _a.length))
    return [];
  const mappedSalutations = salutations.map((salutation) => {
    var _a;
    return {
      name:
        ((_a = salutation.displayName),
        _a !== null && _a !== void 0 ? _a : salutation.salutationKey),
      id: salutation.id,
    };
  });
  return mappedSalutations.filter(
    (mappedSalutation) => mappedSalutation.name !== null
  );
}

/**
 * @alpha
 * Get the messages from the API response (array of ShopwareErrors)
 */
function getMessagesFromErrorsArray(errors) {
  var _a;
  if (
    !((_a = errors) === null || _a === void 0 ? void 0 : _a.length) ||
    !Array.isArray(errors)
  ) {
    return [];
  }
  // return a message only if detail and pointer propery is provided in upcoming ShopwareError
  return errors
    .map(
      ({ detail, source }) =>
        detail &&
        source &&
        source.pointer &&
        `${source.pointer.substring(1)}: ${detail}`
    )
    .filter((message) => message);
}

export {
  UiCategoryFilterType,
  exportUrlQuery,
  getCategoryAvailableFilters,
  getCategoryAvailableSorting,
  getCmsSections,
  getFilterSearchCriteria,
  getMessagesFromErrorsArray,
  getNavigationRoutes,
  getProductMainImageUrl,
  getProductMediaGallery,
  getProductName,
  getProductOption,
  getProductOptions,
  getProductOptionsUrl,
  getProductProperties,
  getProductRegularPrice,
  getProductReviews,
  getProductSpecialPrice,
  getProductUrl,
  getSortingLabel,
  getSortingSearchCriteria,
  getVariantOptionsLabel,
  isProductSimple,
  mapCountries,
  mapSalutations,
  parseUrlQuery,
};
