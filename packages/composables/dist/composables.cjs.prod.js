'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compositionApi = require('@vue/composition-api');
var shopware6Client = require('@shopware-pwa/shopware-6-client');

const useCms = () => {
    const loading = compositionApi.ref(false);
    const page = compositionApi.ref(null);
    const error = compositionApi.ref(null);
    const search = async (path) => {
        loading.value = true;
        try {
            const result = await shopware6Client.getPage(path);
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
            const result = await shopware6Client.getCart();
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
        const result = await shopware6Client.addProductToCart(id, quantity);
        vuexStore.commit("SET_CART", result);
    }
    async function removeProduct({ id }) {
        const result = await shopware6Client.removeCartItem(id);
        vuexStore.commit("SET_CART", result);
    }
    async function changeProductQuantity({ id, quantity }) {
        const result = await shopware6Client.changeCartItemQuantity(id, quantity);
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
