import Vue from "vue";
import { ref, Ref, reactive, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ApplicationVueContext, getApplicationContext } from "../appContext";

/**
 * interface for {@link useWishlist} composable
 * @beta
 */

export interface IUseWishlist {
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  addToWishlist: () => void;
  isInWishlist: Ref<boolean>;
  items: Ref<string[]>;
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
  getApplicationContext(rootContext, "useNotifications");
  const localWishlist = reactive(sharedWishlist);
  const productId: Ref<string | undefined> = ref(product?.id);

  // update wishlist in localstorage
  const updateStorage = (): void => {
    localStorage.setItem(
      "sw-wishlist-items",
      JSON.stringify(sharedWishlist.items)
    );
  };

  const getFromStorage = () => {
    if (typeof window != "undefined" && localStorage) {
      return JSON.parse(localStorage.getItem("sw-wishlist-items") ?? "");
    }
  };

  if (!sharedWishlist.items.length) {
    try {
      const currentWishlist = getFromStorage();
      if (currentWishlist) {
        sharedWishlist.items = currentWishlist;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // removes item from the list
  const removeFromWishlist = (itemId: string): void => {
    const id = productId.value || itemId;
    if (!id) {
      return;
    }

    sharedWishlist.items = sharedWishlist.items.filter(
      (itemId: string) => itemId != id
    );
    console.warn("current", sharedWishlist.items);

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

  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    items,
  };
};
