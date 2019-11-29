import { ref, computed } from '@vue/composition-api';
import { getPage, getProduct, getCart, addProductToCart, removeCartItem, changeCartItemQuantity } from '@shopware-pwa/shopware-6-client';

const useCms = () => {
    const loading = ref(false);
    const page = ref(null);
    const error = ref(null);
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

const NO_PRODUCT_REFERENCE_ERROR = "Associations cannot be loaded for undefined product";
const useProduct = (loadedProduct) => {
    const loading = ref(false);
    const product = ref(loadedProduct);
    const error = ref(null);
    const loadAssociations = async (associations) => {
        if (!product || !product.value || !product.value.id) {
            throw NO_PRODUCT_REFERENCE_ERROR;
        }
        const result = await getProduct(product.value.id, associations);
        product.value = result;
    };
    const search = async (path) => {
        loading.value = true;
        try {
            const result = await getProduct(path);
            product.value = result;
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
        product,
        loading,
        search,
        error,
        loadAssociations
    };
};

const useCart = () => {
    let vuexStore = getStore();
    const loading = ref(false);
    const error = ref(null);
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
    const cart = computed(() => {
        return vuexStore.getters.getCart;
    });
    const cartItems = computed(() => {
        return cart.value ? cart.value.lineItems || [] : [];
    });
    const count = computed(() => {
        return cartItems.value.reduce((accumulator, lineItem) => lineItem.quantity + accumulator, 0);
    });
    const totalPrice = computed(() => {
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

export { getStore, setStore, useCart, useCms, useProduct };
