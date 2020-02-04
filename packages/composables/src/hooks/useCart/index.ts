import { ref, Ref, computed } from "@vue/composition-api";
import {
  getCart,
  addProductToCart,
  removeCartItem,
  changeCartItemQuantity,
  createOrder,
  createGuestOrder
} from "@shopware-pwa/shopware-6-client";
import { getStore } from "../..";
import { useUser } from "../useUser";
import { Order } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/order/Order";

/**
 * @alpha
 */
export const useCart = (): any => {
  let vuexStore = getStore();
  const { isLoggedIn, user } = useUser();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart();
      vuexStore.commit("SET_CART", result);
    } catch (e) {
      error.value = e;
      console.error("Problem with fetching CART data", e.message);
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function addProduct({ id, quantity }: any) {
    const result = await addProductToCart(id, quantity);
    vuexStore.commit("SET_CART", result);
  }

  async function removeProduct({ id }: any) {
    const result = await removeCartItem(id);
    vuexStore.commit("SET_CART", result);
  }

  async function changeProductQuantity({ id, quantity }: any) {
    const result = await changeCartItemQuantity(id, quantity);
    vuexStore.commit("SET_CART", result);
  }

  /**
   * todo: move this method to the separated composable after the implementation of dummy checkout.
   */
  async function placeOrder(): Promise<Order> {
    if (isLoggedIn.value) {
      return createOrder();
    }

    if (user.value?.email) { // use hardcoded email until personal data form is handled
      return createGuestOrder(user.value?.email);
    }

    throw new Error("Order cannot be placed")
  }

  const cart = computed(() => {
    return vuexStore.getters.getCart;
  });

  const cartItems = computed(() => {
    return cart.value ? cart.value.lineItems || [] : [];
  });

  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator: number, lineItem: any) => lineItem.quantity + accumulator,
      0
    );
  });

  const totalPrice = computed(() => {
    const cartPrice =
      cart.value && cart.value.price && cart.value.price.totalPrice;
    return cartPrice || 0;
  });

  const subtotal = computed(() => {
    const cartPrice = cart.value?.price?.positionPrice;
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
    placeOrder
  };
};
