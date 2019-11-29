var composables = (function (exports, compositionApi, axios) {
  'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  const defaultConfig = {
      endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
      accessToken: "SWSCMUDKAKHSRXPJEHNOSNHYAG",
      contextToken: "",
      defaultPaginationLimit: 10
  };
  let clientConfig = {};
  const setupConfig = function (config = {}) {
      clientConfig = Object.assign(clientConfig, defaultConfig, config);
  };
  setupConfig();
  const updateConfig = function (config) {
      clientConfig = Object.assign(clientConfig, config);
  };
  const config = clientConfig;

  function responseInterceptor(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const contextToken = response.headers["sw-context-token"];
      update({ contextToken });
      return response;
  }
  async function errorInterceptor(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      throw error;
  }

  const apiService = axios.create({});
  function reloadConfiguration() {
      apiService.defaults.baseURL = config.endpoint;
      apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
      if (config.contextToken) {
          apiService.defaults.headers.common["sw-context-token"] =
              config.contextToken;
      }
      else {
          delete apiService.defaults.headers.common["sw-context-token"];
      }
  }
  reloadConfiguration();
  apiService.interceptors.response.use(responseInterceptor, errorInterceptor);

  // category
  // checkout
  const getCheckoutCartEndpoint = () => `/checkout/cart`;
  const getCheckoutCartProductEndpoint = (productId) => `/checkout/cart/product/${productId}`;
  const getCheckoutCartLineItemEndpoint = (lineItemId) => `/checkout/cart/line-item/${lineItemId}`;
  const getPageResolverEndpoint = () => `/vsf/page`;

  var PaginationLimit;
  (function (PaginationLimit) {
      PaginationLimit[PaginationLimit["ONE"] = 1] = "ONE";
      PaginationLimit[PaginationLimit["FIVE"] = 5] = "FIVE";
      PaginationLimit[PaginationLimit["TEN"] = 10] = "TEN";
      PaginationLimit[PaginationLimit["TWENTY_FIVE"] = 25] = "TWENTY_FIVE";
      PaginationLimit[PaginationLimit["FIFTY"] = 50] = "FIFTY";
      PaginationLimit[PaginationLimit["SEVENTY_FIVE"] = 75] = "SEVENTY_FIVE";
      PaginationLimit[PaginationLimit["HUNDRED"] = 100] = "HUNDRED";
      PaginationLimit[PaginationLimit["FIVE_HUNDRED"] = 500] = "FIVE_HUNDRED";
  })(PaginationLimit || (PaginationLimit = {}));

  var CartItemType;
  (function (CartItemType) {
      CartItemType["PRODUCT"] = "product";
      CartItemType["CREDIT"] = "credit";
      CartItemType["CUSTOM"] = "custom";
      CartItemType["PROMOTION"] = "promotion";
  })(CartItemType || (CartItemType = {}));

  /**
   * Gets the current cart for the sw-context-token.
   */
  async function getCart() {
      const resp = await apiService.get(getCheckoutCartEndpoint());
      return resp.data.data;
  }
  /**
   * Adds specific quantity of the product to the cart by productId. It creates a new cart line item.
   *
   * Warning: This method does not change the state of the cart in any way if productId already exists in a cart. For changing the quantity use addQuantityToCartLineItem() or changeCartLineItemQuantity() methods.
   */
  async function addProductToCart(productId, quantity) {
      const resp = await apiService.post(getCheckoutCartProductEndpoint(productId), { quantity: quantity });
      return resp.data.data;
  }
  /**
   * Changes the current quantity in specific cart line item to given quantity.
   *
   * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 2.
   */
  async function changeCartItemQuantity(itemId, newQuantity = 1) {
      let params = { quantity: parseInt(newQuantity.toString()) };
      const resp = await apiService.patch(getCheckoutCartLineItemEndpoint(itemId), params);
      return resp.data.data;
  }
  /**
   * Deletes the cart line item by id.
   *
   * This method may be used for deleting "product" type item lines as well as "promotion" type item lines.
   */
  async function removeCartItem(itemId) {
      const resp = await apiService.delete(getCheckoutCartLineItemEndpoint(itemId));
      return resp.data.data;
  }

  async function getPage(path, searchCriteria) {
      const resp = await apiService.post(getPageResolverEndpoint(), {
          path: path
      });
      return resp.data;
  }

  /**
   * Update current configuration. This will change only provided values.
   */
  function update(config = {}) {
      updateConfig(config);
      reloadConfiguration();
      configChanged();
  }
  const callbackMethods = [];
  function configChanged() {
      callbackMethods.forEach(fn => fn({ config }));
  }

  const useCms = () => {
      const loading = compositionApi.ref(false);
      const page = compositionApi.ref(null);
      const error = compositionApi.ref(null);
      const search = async (path) => {
          loading.value = true;
          try {
              const result = await getPage(path);
              page.value = result;
              return result;
          }
          catch (e) {
              error.value = e;
              console.error("Problem with fetching data", e.message);
          }
          finally {
              loading.value = false;
          }
      };
      return {
          page,
          loading,
          search,
          error
      };
  };

  const useCart = () => {
      let vuexStore = getStore();
      const loading = compositionApi.ref(false);
      const error = compositionApi.ref(null);
      async function refreshCart() {
          loading.value = true;
          try {
              const result = await getCart();
              vuexStore.commit("SET_CART", result);
          }
          catch (e) {
              error.value = e;
              console.error("Problem with fetching data", e.message);
          }
          finally {
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
      const cart = compositionApi.computed(() => {
          return vuexStore.getters.getCart;
      });
      const cartItems = compositionApi.computed(() => {
          return cart.value ? cart.value.lineItems || [] : [];
      });
      const count = compositionApi.computed(() => {
          return cartItems.value.reduce((accumulator, lineItem) => lineItem.quantity + accumulator, 0);
      });
      const totalPrice = compositionApi.computed(() => {
          const cartPrice = cart.value && cart.value.price && cart.value.price.totalPrice;
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
          totalPrice
      };
  };

  /**
   * Workaround for current reactivity problems with SSR for Nuxt.
   * This section will be removed after Vuex is no longer in use.
   */
  let storeRef;
  function setStore(ref) {
      storeRef = ref;
  }
  function getStore() {
      return storeRef;
  }

  exports.getStore = getStore;
  exports.setStore = setStore;
  exports.useCart = useCart;
  exports.useCms = useCms;

  return exports;

}({}, compositionApi, axios));
