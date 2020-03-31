import { ref, Ref, computed } from "@vue/composition-api";
import {
  getCart,
  addProductToCart,
  removeCartItem,
  changeCartItemQuantity,
  createOrder,
} from "@shopware-pwa/shopware-6-client";
import { getStore } from "../..";
import { useUser } from "../useUser";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

/**
 * @alpha
 */
export const useCart = (): any => {
  let vuexStore = getStore();
  const { isLoggedIn } = useUser();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart();
      vuexStore.commit("SET_CART", result);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
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
  async function placeOrder(): Promise<Order | undefined> {
    if (isLoggedIn.value) {
      return createOrder();
    }

    // TODO: related https://github.com/DivanteLtd/shopware-pwa/issues/375
    // return createGuestOrder(guestUserEmail);

    error.value = {
      message: "Order cannot be placed",
    };
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
    placeOrder,
  };
};
