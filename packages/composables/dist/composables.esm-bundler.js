import {
  ref,
  computed,
  reactive,
  onMounted,
  watch,
  toRefs,
} from "@vue/composition-api";
import {
  getPage,
  getProduct,
  getCart,
  addProductToCart,
  removeCartItem,
  changeCartItemQuantity,
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createGuestOrder,
  createOrder,
  getSessionContext,
  setCurrentShippingMethod,
  getNavigation,
  getAvailableSalutations,
  getAvailableCountries,
  login,
  register,
  logout,
  getCustomer,
  getCustomerOrders,
  getCustomerOrderDetails,
  getCustomerAddresses,
  getUserCountry,
  getUserSalutation,
  setDefaultCustomerShippingAddress,
  setDefaultCustomerBillingAddress,
  createCustomerAddress,
  deleteCustomerAddress,
  updateProfile,
  updatePassword,
  updateEmail,
  getProducts,
} from "@shopware-pwa/shopware-6-client";
import queryString from "query-string";
import Vue from "vue";
import cookieUniversal from "cookie-universal";

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
 * @alpha
 */
const useCms = () => {
  let vuexStore = getStore();
  const error = ref(null);
  const loading = ref(false);
  const page = computed(() => {
    return vuexStore.getters.getPage;
  });
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value && page.value.resourceIdentifier;
  });
  /**
   * @alpha
   */
  const search = async (path, query) => {
    loading.value = true;
    const searchCriteria = parseUrlQuery(query);
    // Temp Maciej solution for associations
    if (!searchCriteria.configuration) searchCriteria.configuration = {};
    if (!searchCriteria.configuration.associations)
      searchCriteria.configuration.associations = [];
    searchCriteria.configuration.associations.push({
      name: "options",
      associations: [
        {
          name: "group",
        },
      ],
    });
    try {
      const result = await getPage(path, searchCriteria);
      vuexStore.commit("SET_PAGE", result);
    } catch (e) {
      const err = e;
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return {
    page,
    categoryId,
    loading,
    search,
    error,
  };
};

const NO_PRODUCT_REFERENCE_ERROR =
  "Associations cannot be loaded for undefined product";
/**
 * @alpha
 */
const useProduct = (loadedProduct) => {
  const loading = ref(false);
  const product = ref(loadedProduct);
  const error = ref(null);
  const loadAssociations = async (associations) => {
    if (!product || !product.value || !product.value.id) {
      throw NO_PRODUCT_REFERENCE_ERROR;
    }
    const {
      media,
      cover,
      properties,
      productReviews,
      children,
    } = await getProduct(
      product.value.parentId || product.value.id,
      associations
    );
    product.value = Object.assign({}, product.value, {
      media,
      cover,
      properties,
      productReviews,
      children,
    });
  };
  const search = async (productId) => {
    loading.value = true;
    try {
      const result = await getProduct(productId);
      product.value = result;
      return result;
    } catch (e) {
      const err = e;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return {
    product,
    loading,
    search,
    error,
    loadAssociations,
  };
};

/**
 * @alpha
 */
const useCart = () => {
  let vuexStore = getStore();
  const loading = ref(false);
  const error = ref(null);
  async function refreshCart() {
    loading.value = true;
    try {
      const result = await getCart();
      vuexStore.commit("SET_CART", result);
    } catch (e) {
      const err = e;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }
  async function addProduct({ id, quantity }) {
    const result = await addProductToCart(id, quantity);
    vuexStore.commit("SET_CART", result);
  }
  async function removeProduct({ id }) {
    const result = await removeCartItem(id);
    vuexStore.commit("SET_CART", result);
  }
  async function changeProductQuantity({ id, quantity }) {
    const result = await changeCartItemQuantity(id, quantity);
    vuexStore.commit("SET_CART", result);
  }
  const cart = computed(() => {
    return vuexStore.getters.getCart;
  });
  const cartItems = computed(() => {
    return cart.value ? cart.value.lineItems || [] : [];
  });
  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator, lineItem) => lineItem.quantity + accumulator,
      0
    );
  });
  const totalPrice = computed(() => {
    const cartPrice =
      cart.value && cart.value.price && cart.value.price.totalPrice;
    return cartPrice || 0;
  });
  const subtotal = computed(() => {
    var _a, _b;
    const cartPrice =
      (_b = (_a = cart.value) === null || _a === void 0 ? void 0 : _a.price) ===
        null || _b === void 0
        ? void 0
        : _b.positionPrice;
    return cartPrice || 0;
  });
  return {
    addProduct,
    cart,
    cartItems,
    changeProductQuantity,
    count,
    error,
    loading,
    refreshCart,
    removeProduct,
    totalPrice,
    subtotal,
  };
};

/**
 * @alpha
 */
const useAddToCart = (product) => {
  const { addProduct, cartItems } = useCart();
  const quantity = ref(1);
  const loading = ref(false);
  const error = ref(null);
  const addToCart = async () => {
    if (!product || !product.id) {
      error.value =
        "Product has to be passed as a composable argument and needs to have an id property.";
      return;
    }
    loading.value = true;
    error.value = null;
    if (!quantity.value) quantity.value = 1;
    try {
      await addProduct({ id: product.id, quantity: quantity.value });
      quantity.value = 1;
    } catch (e) {
      const err = e;
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const getStock = computed(() => product && product.stock);
  const isInCart = computed(() =>
    cartItems.value.some((item) => item.id === product.id)
  );
  return {
    addToCart,
    quantity,
    error,
    loading,
    getStock,
    isInCart,
  };
};

const orderData = Vue.observable({
  guestOrderParams: {},
  shippingMethods: [],
  paymentMethods: [],
});
/**
 * @alpha
 */
const useCheckout = () => {
  const { isLoggedIn } = useUser();
  const { refreshCart } = useCart();
  const shippingMethods = computed(() => orderData.shippingMethods);
  const paymentMethods = computed(() => orderData.paymentMethods);
  const localOrderData = reactive(orderData);
  const getShippingMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (shippingMethods.value.length && !forceReload) return shippingMethods;
    const shippingMethodsResponse = await getAvailableShippingMethods();
    orderData.shippingMethods = shippingMethodsResponse.data || [];
    return shippingMethods;
  };
  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const paymentMethodsResponse = await getAvailablePaymentMethods();
    orderData.paymentMethods = paymentMethodsResponse.data || [];
    return paymentMethods;
  };
  const createOrder$1 = async () => {
    try {
      if (isGuestOrder.value) {
        return await createGuestOrder(orderData.guestOrderParams);
      } else {
        return await createOrder();
      }
    } catch (e) {
      console.error(
        "[useCheckout][createOrder] isGuest:" + isGuestOrder.value,
        e
      );
      throw e;
    } finally {
      await refreshCart();
    }
  };
  const isGuestOrder = computed(() => !isLoggedIn.value);
  const guestOrderParams = computed(() => localOrderData.guestOrderParams);
  const updateGuestOrderParams = (params) => {
    orderData.guestOrderParams = { ...orderData.guestOrderParams, ...params };
  };
  return {
    isGuestOrder,
    getPaymentMethods,
    getShippingMethods,
    createOrder: createOrder$1,
    guestOrderParams,
    updateGuestOrderParams,
  };
};

/**
 * @alpha
 */
const useSessionContext = () => {
  let vuexStore = getStore();
  const sessionContext = computed(() => {
    return vuexStore.getters.getSessionContext || null;
  });
  const refreshSessionContext = async () => {
    try {
      const context = await getSessionContext();
      vuexStore.commit("SET_SESSION_CONTEXT", context);
    } catch (e) {
      console.error("[UseSessionContext][refreshSessionContext]", e);
    }
  };
  const shippingMethod = computed(() => {
    var _a;
    return (
      ((_a = sessionContext.value) === null || _a === void 0
        ? void 0
        : _a.shippingMethod) || null
    );
  });
  const setShippingMethod = async (shippingMethod = {}) => {
    var _a;
    if (!((_a = shippingMethod) === null || _a === void 0 ? void 0 : _a.id)) {
      throw new Error(
        "You need to provige shipping method id in order to set shipping method."
      );
    }
    await setCurrentShippingMethod(shippingMethod.id);
  };
  return {
    sessionContext,
    refreshSessionContext,
    shippingMethod,
    setShippingMethod,
  };
};

/**
 * @alpha
 */
const useCategoryFilters = () => {
  const { page } = useCms();
  const activeFilters = computed(() => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }
    return page.value.listingConfiguration.activeFilters;
  });
  const availableFilters = computed(() => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }
    return getCategoryAvailableFilters({
      filters: page.value.listingConfiguration.availableFilters,
    });
  });
  const availableSorting = computed(() => {
    if (!page || !page.value || !page.value.listingConfiguration) {
      return [];
    }
    return getCategoryAvailableSorting({
      sorting: page.value.listingConfiguration.availableSortings,
    });
  });
  const activeSorting = computed(() =>
    availableSorting.value.find((sorting) => sorting.active)
  );
  return {
    availableFilters,
    activeFilters,
    availableSorting,
    activeSorting,
  };
};

const sharedNavigation = Vue.observable({
  routes: null,
});
/**
 * @alpha
 */
const useNavigation = () => {
  const localNavigation = reactive(sharedNavigation);
  const routes = computed(() => localNavigation.routes);
  const fetchRoutes = async (params) => {
    const navigation = await getNavigation(params);
    if (typeof navigation.children === "undefined") return;
    sharedNavigation.routes = getNavigationRoutes(navigation.children);
  };
  return {
    routes,
    fetchRoutes,
  };
};

const sharedSalutations = Vue.observable({
  salutations: null,
});
/**
 * @alpha
 */
const useSalutations = () => {
  const localSalutations = reactive(sharedSalutations);
  const error = ref(null);
  const fetchSalutations = async () => {
    try {
      const fetchSalutations = await getAvailableSalutations();
      sharedSalutations.salutations = fetchSalutations.data;
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
  };
  // created separate function for testing proposes
  const mountedCallback = async () => {
    if (!sharedSalutations.salutations) {
      await fetchSalutations();
    }
  };
  const getSalutations = computed(() => {
    var _a;
    return (
      (_a = localSalutations.salutations),
      _a !== null && _a !== void 0 ? _a : []
    );
  });
  onMounted(mountedCallback);
  return {
    mountedCallback,
    fetchSalutations,
    getSalutations,
    error,
  };
};

const sharedCountries = Vue.observable({
  countries: null,
});
/**
 * @alpha
 */
const useCountries = () => {
  const localCountries = reactive(sharedCountries);
  const error = ref(null);
  const fetchCountries = async () => {
    try {
      const fetchCountries = await getAvailableCountries();
      sharedCountries.countries = fetchCountries.data;
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
  };
  const getCountries = computed(() => {
    var _a;
    return (
      (_a = localCountries.countries), _a !== null && _a !== void 0 ? _a : []
    );
  });
  const mountedCallback = async () => {
    if (!sharedCountries.countries) {
      await fetchCountries();
    }
  };
  onMounted(mountedCallback);
  return {
    mountedCallback,
    fetchCountries,
    getCountries,
    error,
  };
};

var AddressType;
(function (AddressType) {
  AddressType["billing"] = "billing";
  AddressType["shipping"] = "shipping";
})(AddressType || (AddressType = {}));

/**
 * @alpha
 */
const useUser = () => {
  let vuexStore = getStore();
  const loading = ref(false);
  const error = ref(null);
  const orders = ref(null);
  const addresses = ref(null);
  const country = ref(null);
  const salutation = ref(null);
  const user = computed(() => {
    return vuexStore.getters.getUser;
  });
  const login$1 = async ({ username, password } = {}) => {
    loading.value = true;
    error.value = null;
    try {
      await login({ username, password });
      return true;
    } catch (e) {
      const err = e;
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
      await refreshUser();
    }
  };
  const register$1 = async (params) => {
    loading.value = true;
    error.value = null;
    try {
      await register(params);
      return true;
    } catch (e) {
      const err = e;
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };
  const logout$1 = async () => {
    try {
      await logout();
    } catch (e) {
      const err = e;
      error.value = err.message;
    } finally {
      await refreshUser();
    }
  };
  const refreshUser = async () => {
    try {
      const user = await getCustomer();
      vuexStore.commit("SET_USER", user);
    } catch (e) {
      console.error("useUser:refreshUser:getCustomer", e);
    }
  };
  const loadOrders = async () => {
    const fetchedOrders = await getCustomerOrders();
    orders.value = fetchedOrders;
  };
  const getOrderDetails = async (orderId) => {
    return getCustomerOrderDetails(orderId);
  };
  const loadAddresses = async () => {
    try {
      addresses.value = await getCustomerAddresses();
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
  };
  const loadCountry = async (userId) => {
    try {
      country.value = await getUserCountry(userId);
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
  };
  const loadSalutation = async (salutationId) => {
    try {
      salutation.value = await getUserSalutation(salutationId);
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
  };
  const markAddressAsDefault = async ({ addressId, type }) => {
    if (!addressId || !type) {
      return false;
    }
    try {
      switch (type) {
        case AddressType.billing:
          await setDefaultCustomerBillingAddress(addressId);
          break;
        case AddressType.shipping:
          await setDefaultCustomerShippingAddress(addressId);
          break;
        default:
          return false;
      }
      await refreshUser();
    } catch (e) {
      const err = e;
      error.value = err.message;
      return false;
    }
    return true;
  };
  const addAddress = async (params) => {
    try {
      await createCustomerAddress(params);
      return true;
    } catch (e) {
      const err = e;
      error.value = err.message;
      return false;
    }
  };
  const deleteAddress = async (addressId) => {
    try {
      await deleteCustomerAddress(addressId);
      return true;
    } catch (e) {
      const err = e;
      error.value = err.message;
    }
    return false;
  };
  const updatePersonalInfo = async (personals) => {
    try {
      await updateProfile(personals);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };
  const updatePassword$1 = async (updatePasswordData) => {
    try {
      await updatePassword(updatePasswordData);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };
  const updateEmail$1 = async (updateEmailData) => {
    try {
      await updateEmail(updateEmailData);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };
  const isLoggedIn = computed(() => {
    var _a;
    return !!((_a = user.value) === null || _a === void 0 ? void 0 : _a.id);
  });
  return {
    login: login$1,
    register: register$1,
    user,
    error,
    loading,
    isLoggedIn,
    refreshUser,
    logout: logout$1,
    orders,
    loadOrders,
    getOrderDetails,
    loadAddresses,
    addresses,
    markAddressAsDefault,
    updateEmail: updateEmail$1,
    updatePersonalInfo,
    updatePassword: updatePassword$1,
    addAddress,
    deleteAddress,
    loadSalutation,
    salutation,
    loadCountry,
    country,
  };
};

var SearchFilterType$1;
(function (SearchFilterType) {
  SearchFilterType["EQUALS"] = "equals";
  SearchFilterType["CONTAINS"] = "contains";
  SearchFilterType["EQUALS_ANY"] = "equalsAny";
  SearchFilterType["NOT"] = "not";
  SearchFilterType["MULTI"] = "multi";
  SearchFilterType["RANGE"] = "range";
})(SearchFilterType$1 || (SearchFilterType$1 = {}));

const sharedPagination = Vue.observable({
  currentPage: 1,
  perPage: 10,
  total: 100,
});
const sharedListing = Vue.observable({
  products: [],
});
const selectedCriteria = Vue.observable({
  pagination: null,
  propertyIds: [],
  filters: {},
  sorting: "",
});
/**
 * @alpha
 */
const useProductListing = (initialProducts = []) => {
  const { categoryId } = useCms();
  const { activeSorting } = useCategoryFilters();
  const loading = ref(false);
  const error = ref(null);
  const localListing = reactive(sharedListing);
  const localCriteria = reactive(selectedCriteria);
  const localPagination = reactive(sharedPagination);
  sharedListing.products = initialProducts;
  selectedCriteria.sorting = activeSorting.value;
  const resetFilters = () => {
    selectedCriteria.filters = {};
  };
  const resetSorting = () => {
    selectedCriteria.sorting = activeSorting.value;
  };
  const toggleFilter = (
    filter, // TODO: handle range filter case as well
    forceSave = false
  ) => {
    if (!!selectedCriteria.filters[filter.field]) {
      let selected = selectedCriteria.filters[filter.field];
      if (
        !selected.find((optionId) => optionId === filter.value) ||
        forceSave
      ) {
        selected.push(filter.value);
      } else {
        selected = selected.filter((optionId) => optionId !== filter.value);
      }
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [...new Set(selected)],
      });
    } else {
      selectedCriteria.filters = Object.assign({}, selectedCriteria.filters, {
        [filter.field]: [filter.value],
      });
    }
  };
  const changeSorting = async (sorting) => {
    if (!sorting) {
      return;
    }
    selectedCriteria.sorting = sorting;
    await search();
  };
  const search = async () => {
    loading.value = true;
    toggleFilter(
      {
        // append selected filters with currentCategory; should be taken from usePage
        field: "categoryTree",
        type: SearchFilterType$1.EQUALS_ANY,
        value: categoryId.value,
      },
      true
    );
    const searchCriteria = {
      pagination: selectedCriteria.pagination,
      filters: getFilterSearchCriteria(selectedCriteria.filters),
      sort: getSortingSearchCriteria(selectedCriteria.sorting),
      configuration: {
        // fetch variant options
        associations: [
          {
            name: "options",
          },
          // fetch productReviews
          {
            name: "productReviews",
          },
        ],
      },
    };
    const search = exportUrlQuery(searchCriteria);
    /* istanbul ignore next */
    if (typeof history !== "undefined")
      history.replaceState({}, null, location.pathname + "?" + search);
    const result = await getProducts(searchCriteria);
    sharedPagination.total = (result && result.total) || 0;
    sharedListing.products = (result && result.data && [...result.data]) || [];
    loading.value = false;
  };
  const changePagination = async (page) => {
    if (!page) {
      return;
    }
    sharedPagination.currentPage = page;
    selectedCriteria.pagination = {
      limit: sharedPagination.perPage,
      page,
    };
    await search();
  };
  // if reloaded on route change
  if (initialProducts.length) {
    resetFilters();
    resetSorting();
    changePagination(1);
  }
  const pagination = computed(() => localPagination);
  const products = computed(() => localListing.products);
  const productsTotal = computed(() => localPagination.total);
  const selectedFilters = computed(() => localCriteria.filters);
  const selectedSorting = computed(() => localCriteria.sorting);
  return {
    search,
    pagination,
    products,
    productsTotal,
    loading,
    error,
    changePagination,
    selectedFilters,
    toggleFilter,
    resetFilters,
    changeSorting,
    selectedSorting,
    categoryId,
  };
};

const sharedListing$1 = Vue.observable({
  products: [],
});
/**
 * @alpha
 */
const useProductSearch = () => {
  const loading = ref(false);
  const error = ref(null);
  const localListing = reactive(sharedListing$1);
  sharedListing$1.products = [];
  const search = async (term) => {
    loading.value = true;
    if (!term) {
      loading.value = false;
      error.value = "Term string expected to be passed";
      return;
    }
    console.log(
      `[shopware-pwa][debug]: %cSearch for products with term: "${term}" started...`,
      "color:#006994;font-family:system-ui;"
    );
    const searchCriteria = {
      term,
      configuration: {
        associations: [
          {
            name: "options",
          },
          {
            name: "productReviews",
          },
        ],
      },
    };
    try {
      const result = await getProducts(searchCriteria);
      sharedListing$1.products =
        (result && result.data && [...result.data]) || [];
      console.log(
        `[shopware-pwa][debug]: %cproducts found:`,
        "color:#006994;font-family:system-ui;"
      );
      console.log(`[shopware-pwa][debug]:`, sharedListing$1.products);
      console.log(
        `[shopware-pwa][debug]: %c----------------------------------------------------------`,
        "color:#006994;font-family:system-ui;"
      );
    } catch (e) {
      error.value = e;
    }
    loading.value = false;
  };
  const products = computed(() => localListing.products);
  return {
    search,
    products,
    loading,
    error,
  };
};

const sharedCartSidebarState = Vue.observable({
  open: false,
});
/**
 * @alpha
 */
const useCartSidebar = () => {
  const localCartSidebarState = reactive(sharedCartSidebarState);
  const isSidebarOpen = computed(() => localCartSidebarState.open);
  function toggleSidebar() {
    sharedCartSidebarState.open = !sharedCartSidebarState.open;
  }
  return {
    isSidebarOpen,
    toggleSidebar,
  };
};

const sharedUserLoginModalState = Vue.observable({
  open: false,
});
/**
 * @alpha
 */
const useUserLoginModal = () => {
  const localUserLoginModal = reactive(sharedUserLoginModalState);
  const isModalOpen = computed(() => localUserLoginModal.open);
  const toggleModal = () => {
    localUserLoginModal.open = !localUserLoginModal.open;
  };
  return {
    isModalOpen,
    toggleModal,
  };
};

/**
 * @alpha
 */
const useImageProps = (content) => {
  const getImgUrl = computed(() => {
    var _a, _b, _c;
    const imgUrl =
      (_c =
        (_b = (_a = content) === null || _a === void 0 ? void 0 : _a.data) ===
          null || _b === void 0
          ? void 0
          : _b.media) === null || _c === void 0
        ? void 0
        : _c.url;
    return imgUrl || "";
  });
  const getAlt = computed(() => {
    var _a, _b, _c;
    const alt =
      (_c =
        (_b = (_a = content) === null || _a === void 0 ? void 0 : _a.data) ===
          null || _b === void 0
          ? void 0
          : _b.media) === null || _c === void 0
        ? void 0
        : _c.alt;
    return alt || "";
  });
  const getTitle = computed(() => {
    var _a, _b, _c;
    const title =
      (_c =
        (_b = (_a = content) === null || _a === void 0 ? void 0 : _a.data) ===
          null || _b === void 0
          ? void 0
          : _b.media) === null || _c === void 0
        ? void 0
        : _c.title;
    return title || "";
  });
  return {
    getImgUrl,
    getAlt,
    getTitle,
  };
};

/**
 * @alpha
 */
var PositionType;
(function (PositionType) {
  PositionType["LEFT"] = "left";
  PositionType["RIGHT"] = "right";
  PositionType["CENTER"] = "center";
  PositionType["CENTER_LEFT"] = "center-left";
  PositionType["CENTER_RIGHT"] = "center-right";
  PositionType["LEFT_TOP"] = "left-top";
  PositionType["LEFT_BOTTOM"] = "left-bottom";
})(PositionType || (PositionType = {}));
/**
 * @alpha
 */
const useSlotsPositions = (slots) => {
  const findSlot = (positionType) =>
    slots.find(({ slot }) => slot === positionType);
  const leftSlot = computed(() => findSlot(PositionType.LEFT));
  const rightSlot = computed(() => findSlot(PositionType.RIGHT));
  const centerSlot = computed(() => findSlot(PositionType.CENTER));
  const centerLeftSlot = computed(() => findSlot(PositionType.CENTER_LEFT));
  const centerRightSlot = computed(() => findSlot(PositionType.CENTER_RIGHT));
  const leftTopSlot = computed(() => findSlot(PositionType.LEFT_TOP));
  const leftBottomSlot = computed(() => findSlot(PositionType.LEFT_BOTTOM));
  return {
    leftSlot,
    rightSlot,
    centerSlot,
    centerLeftSlot,
    centerRightSlot,
    leftBottomSlot,
    leftTopSlot,
  };
};

/**
 * @alpha
 */
function createCheckoutStep({ stepNumber, stepFields, stepDataUpdated }) {
  const cookies = cookieUniversal();
  const stepData = reactive({
    ...stepFields,
    isValid: null,
  });
  const sharedCache = reactive({
    $v: null,
  });
  return () => {
    const stepDataCache = ref(null);
    const validations = computed(() => sharedCache.$v);
    const isValid = computed(() => {
      var _a;
      return validations.value
        ? !validations.value.$invalid
        : !!((_a = stepDataCache.value) === null || _a === void 0
            ? void 0
            : _a.isValid);
    });
    const setValidations = ($v) => {
      sharedCache.$v = $v;
    };
    const objectToSave = computed(() => {
      return {
        ...stepData,
        isValid: isValid.value,
      };
    });
    watch(objectToSave, (value) => {
      if (validations.value) {
        cookies.set("sw-checkout-" + stepNumber, value, {
          maxAge: 60 * 15,
        });
        if (stepDataUpdated) stepDataUpdated(value);
      } else {
        if (!stepDataCache.value) {
          stepDataCache.value = cookies.get("sw-checkout-" + stepNumber) || {};
          Object.assign(stepData, stepDataCache.value);
        }
        if (stepDataUpdated) stepDataUpdated(value);
      }
    });
    const validate = () => {
      validations.value && validations.value.$touch();
    };
    return {
      validations,
      setValidations,
      validate,
      ...toRefs(stepData),
      isValid,
    };
  };
}

/**
 * Workaround for current reactivity problems with SSR for Nuxt.
 * This section will be removed after Vuex is no longer in use.
 */
let storeRef;
/**
 * @alpha
 */
function setStore(ref) {
  storeRef = ref;
}
/**
 * @alpha
 */
function getStore() {
  return storeRef;
}

export {
  PositionType,
  createCheckoutStep,
  getStore,
  setStore,
  useAddToCart,
  useCart,
  useCartSidebar,
  useCategoryFilters,
  useCheckout,
  useCms,
  useCountries,
  useImageProps,
  useNavigation,
  useProduct,
  useProductListing,
  useProductSearch,
  useSalutations,
  useSessionContext,
  useSlotsPositions,
  useUser,
  useUserLoginModal,
};
