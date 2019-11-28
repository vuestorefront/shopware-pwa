import { ref, Ref, computed } from "@vue/composition-api";
import { getCart, addProductToCart } from "@shopware-pwa/shopware-6-client";
import { getStore } from "../..";

export const useCart = (): any => {
  let vuexStore = getStore();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart();
      vuexStore.commit("SET_CART", result);
    } catch (e) {
      error.value = e;
      console.error("Problem with fetching data", e.message);
    } finally {
      loading.value = false;
    }
  }

  async function addProduct({ id, quantity }: any) {
    const result = await addProductToCart(id, quantity);
    vuexStore.commit("SET_CART", result);
  }

  const cart = computed(() => {
    return vuexStore.getters.getCart;
  });

  const cartItems = computed(() => {
    const val = cart.value ? cart.value.lineItems || [] : [];
    return val.map(({ id, label, quantity }: any) => ({ id, label, quantity }));
  });

  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator: number, lineItem: any) => lineItem.quantity + accumulator,
      0
    );
  });

  return {
    count,
    cart,
    cartItems,
    addProduct,
    loading,
    refreshCart,
    error
  };
};
