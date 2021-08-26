import { ref, Ref, computed, onMounted } from "vue-demi";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import {
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
  getApplicationContext,
  useSharedState,
  ApplicationVueContext,
} from "@shopware-pwa/composables";

/**
 * interface for {@link useWishlist} composable
 * @beta
 */

export interface IUseWishlist {
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  addToWishlist: () => void;
  onAddToWishlist: (fn: (params: { product: Product }) => void) => void;
  isInWishlist: Ref<boolean>;
  items: Ref<string[]>;
  count: Ref<number>;
}

/**
 *
 * @beta
 */
export function useWishlist(
  rootContext: ApplicationVueContext,
  product?: Product
): IUseWishlist {
  const COMPOSABLE_NAME = "useWishlist";
  const contextName = COMPOSABLE_NAME;

  const { broadcast, intercept } = useIntercept(rootContext);
  getApplicationContext({ contextName });
  const { sharedRef } = useSharedState(rootContext);
  const _wishlistItems: Ref<string[] | null> = sharedRef(
    `sw-${contextName}-items`
  );

  const productId: Ref<string | undefined> = ref(product?.id);
  const onAddToWishlist = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, fn);

  // update wishlist in localstorage
  const updateStorage = (): void => {
    localStorage.setItem(
      "sw-wishlist-items",
      JSON.stringify(_wishlistItems.value)
    );
  };
  /* istanbul ignore next */
  const getFromStorage = () => {
    if (typeof window != "undefined" && localStorage) {
      return JSON.parse(localStorage.getItem("sw-wishlist-items") ?? "[]");
    }
  };
  /* istanbul ignore next */
  onMounted(() => {
    if (!_wishlistItems.value?.length) {
      try {
        const currentWishlist = getFromStorage();
        if (Array.isArray(currentWishlist) && currentWishlist.length) {
          _wishlistItems.value = currentWishlist || [];
        }
      } catch (error) {
        console.error("useWishlist:getFromStorage", error);
      }
    }
  });

  // removes item from the list
  const removeFromWishlist = (itemId: string): void => {
    const id = productId.value || itemId;
    if (!id) {
      return;
    }

    _wishlistItems.value =
      _wishlistItems.value?.filter((itemId: string) => itemId != id) || [];

    updateStorage();
  };

  // add product id to wishlist array and trigger to update localstorage
  const addToWishlist = (): void => {
    if (!productId.value) {
      return;
    }
    _wishlistItems.value = _wishlistItems.value || [];

    if (!_wishlistItems.value.includes(productId.value)) {
      _wishlistItems.value.push(productId.value);
      updateStorage();
      broadcast(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, {
        product,
      });
    }
  };

  // return true or false if product id is in wishlist array
  const isInWishlist = computed(() => {
    return !!(
      productId.value && _wishlistItems.value?.includes(productId.value)
    );
  });

  // remove all items from wishlist
  const clearWishlist = () => {
    _wishlistItems.value = [];
    updateStorage();
  };

  const items = computed(() => _wishlistItems.value || []);
  const count = computed(() => items.value.length);

  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    items,
    count,
    onAddToWishlist,
  };
}
