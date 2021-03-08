import Vue from "vue";
import { ref, Ref, reactive, computed, onMounted } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import {
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
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

const sharedWishlist = Vue.observable({
  items: [],
} as any);

/**
 *
 * @beta
 */
export const useWishlist = (
  rootContext: ApplicationVueContext,
  product?: Product
): IUseWishlist => {
  const { broadcast, intercept } = useIntercept(rootContext);
  getApplicationContext(rootContext, "useNotifications");
  const localWishlist = reactive(sharedWishlist);
  const productId: Ref<string | undefined> = ref(product?.id);
  const onAddToWishlist = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, fn);

  // update wishlist in localstorage
  const updateStorage = (): void => {
    localStorage.setItem(
      "sw-wishlist-items",
      JSON.stringify(sharedWishlist.items)
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
    if (!sharedWishlist.items.length) {
      try {
        const currentWishlist = getFromStorage();
        if (Array.isArray(currentWishlist) && currentWishlist.length) {
          sharedWishlist.items = currentWishlist;
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

    sharedWishlist.items = sharedWishlist.items.filter(
      (itemId: string) => itemId != id
    );

    updateStorage();
  };

  // add product id to wishlist array and trigger to update localstorage
  const addToWishlist = (): void => {
    if (!productId.value) {
      return;
    }

    if (!sharedWishlist.items.includes(productId.value)) {
      sharedWishlist.items.push(productId.value);
      updateStorage();
      broadcast(INTERCEPTOR_KEYS.ADD_TO_WISHLIST, {
        product,
      });
    }
  };

  // return true or false if product id is in wishlist array
  const isInWishlist = computed(() => {
    return localWishlist.items.includes(productId.value);
  });

  // remove all items from wishlist
  const clearWishlist = () => {
    sharedWishlist.items = [];
  };

  const items = computed(() => localWishlist.items);
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
};
